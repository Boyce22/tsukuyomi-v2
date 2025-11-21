export class ImageCompressionError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Failed to compress image.';
    super(finalMessage);
    this.name = 'ImageCompressionError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, ImageCompressionError.prototype);
  }
}
