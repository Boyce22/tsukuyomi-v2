
export class PasswordNotMatchError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Passwords do not match.';
    super(finalMessage);
    this.name = 'PasswordNotMatchError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, PasswordNotMatchError.prototype);
  }
}
