export class ProfilePictureChangeError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Failed to change profile picture.';
    super(finalMessage);
    this.name = 'ProfilePictureChangeError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, ProfilePictureChangeError.prototype);
  }
}
