export class UserNotFoundError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'User not found.';
    super(finalMessage);
    this.name = 'UserNotFoundError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
