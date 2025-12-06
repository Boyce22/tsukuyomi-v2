import { Repository } from 'typeorm';

import { UUID } from '@utils';
import AppDataSource from '@database';
import { Commentary, User } from '@models';
import { ICommentaryRepository } from '@types';

export class CommentaryRepository implements ICommentaryRepository {
  private readonly repository: Repository<Commentary>;

  constructor() {
    this.repository = AppDataSource.getRepository(Commentary);
  }

  findByIdWithUser(id: string): Promise<Commentary | null> {
    return this.repository
      .createQueryBuilder('commentary')
      .innerJoinAndSelect('commentary.user', 'user')
      .where('commentary.id = :id', { id })
      .getOne();
  }

  async register(data: Partial<Commentary>) {
    const commentary = this.repository.create({
      id: UUID.generate(),
      manga: data.manga,
      user: data.user,
      value: data.value,
      chapter: data.chapter,
    });

    await this.repository.save(commentary);
  }

  async update(id: string, value: string) {
    const commentary = await this.repository.findOneBy({ id });

    if (!commentary) {
      throw new Error('Commentary not found');
    }

    this.repository.merge(commentary, { value });

    await this.repository.save(commentary);
  }
}
