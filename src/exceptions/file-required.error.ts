export class FileRequiredError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'File is required.';
    super(finalMessage);
    this.name = 'FileRequiredError';
    this.statusCode = 400;

    Object.setPrototypeOf(this, FileRequiredError.prototype);
  }
}
