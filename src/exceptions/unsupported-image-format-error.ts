export class UnsupportedImageFormatError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Unsupported image format.';
    super(finalMessage);
    this.name = 'UnsupportedImageFormatError';
    this.statusCode = 400;

    Object.setPrototypeOf(this, UnsupportedImageFormatError.prototype);
  }
}
