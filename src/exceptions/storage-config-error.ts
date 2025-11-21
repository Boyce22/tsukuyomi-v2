export class StorageConfigError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Missing or invalid storage configuration.';
    super(finalMessage);
    this.name = 'StorageConfigError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, StorageConfigError.prototype);
  }
}
