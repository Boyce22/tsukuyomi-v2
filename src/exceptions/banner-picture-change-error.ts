export class BannerPictureChangeError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Failed to change profile picture.';
    super(finalMessage);
    this.name = 'BannerPictureChangeError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, BannerPictureChangeError.prototype);
  }
}
