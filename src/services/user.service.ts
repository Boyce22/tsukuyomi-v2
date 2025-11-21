import { Role, User } from '@models';

import { PasswordNotMatchError, ProfilePictureChangeError, StorageConfigError, UserNotFoundError } from '@exceptions';

import {
  CreateUser,
  IHashProvider,
  IImageCompressorService,
  IStorageService,
  IUserRepository,
  IUserRoleRepository,
  IUserService,
  QualityCompress,
  Roles,
} from '@types';

import { logger } from '@utils';

export class UserService implements IUserService {
  private readonly bucket: string;
  private readonly hashProvider: IHashProvider;
  private readonly repository: IUserRepository;
  private readonly userRoleRepository: IUserRoleRepository;
  private readonly storageService: IStorageService;
  private readonly imageCompressor: IImageCompressorService;

  constructor(
    repository: IUserRepository,
    hashProvider: IHashProvider,
    userRoleRepository: IUserRoleRepository,
    storageService: IStorageService,
    imageCompressor: IImageCompressorService
  ) {
    this.hashProvider = hashProvider;
    this.repository = repository;
    this.userRoleRepository = userRoleRepository;
    this.storageService = storageService;
    this.imageCompressor = imageCompressor;
    this.bucket = this._resolveBucket();
  }

  private _resolveBucket(): string {
    const bucket = process.env.STORAGE_PROFILE_BANNER_BUCKET;

    if (!bucket) {
      throw new StorageConfigError('Missing environment variable: STORAGE_PROFILE_BANNER_BUCKET');
    }

    return bucket;
  }

  async register(dto: CreateUser): Promise<User> {
    const hashedPassword = await this.hashProvider.hash(dto.password);

    const user = await this.repository.register({
      ...dto,
      password: hashedPassword,
    });

    await this.userRoleRepository.associate(user.id, Roles.USER);

    return user;
  }

  async changePassword(id: string, password: string, newPassword: string): Promise<string> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    const isValid = user && (await this.hashProvider.compare(password, user.password));

    if (!isValid) {
      throw new PasswordNotMatchError('The password does not match the current password');
    }

    const hashedPassword = await this.hashProvider.hash(newPassword);

    await this.repository.update(id, { password: hashedPassword });

    return 'Password updated successfully';
  }

  async changeProfilePicture(id: string, file: Express.Multer.File): Promise<string> {
    this._processProfilePicture(id, file).catch((err) => logger.error('Async profile picture processing failed:', err));

    return 'Profile picture update scheduled';
  }

  private async _processProfilePicture(id: string, file: Express.Multer.File): Promise<void> {
    const compressed = await this.imageCompressor.compress(file.path, QualityCompress.MEDIUM, file.mimetype);

    const path = `profile-pictures/${id}/${file.filename}`;

    await this.storageService.upload({
      path,
      bucket: this.bucket,
      data: compressed.buffer,
      mime: compressed.mimeType,
    });

    await this.repository.update(id, { profilePictureUrl: path });
  }

  async changeProfileBanner(id: string, file: Express.Multer.File): Promise<string> {
    this._processProfileBanner(id, file).catch((err) => logger.error('Async banner processing failed:', err));

    return 'Profile banner update scheduled';
  }

  private async _processProfileBanner(id: string, file: Express.Multer.File): Promise<void> {
    const compressed = await this.imageCompressor.compress(file.path, QualityCompress.MEDIUM, file.mimetype);

    const path = `profile-banners/${id}/${file.filename}`;

    await this.storageService.upload({
      path,
      bucket: this.bucket,
      data: compressed.buffer,
      mime: compressed.mimeType,
    });

    await this.repository.update(id, { bannerUrl: path });
  }
}
