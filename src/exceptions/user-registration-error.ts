export class UserRegistrationError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Failed to register user.';
    super(finalMessage);
    this.name = 'UserRegistrationError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, UserRegistrationError.prototype);
  }
}
