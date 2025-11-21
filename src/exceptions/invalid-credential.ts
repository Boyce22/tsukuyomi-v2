export class InvalidCredential extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Invalid credentials provided. Please check your authentication details.';
    super(finalMessage);

    this.name = 'InvalidCredential';
    this.statusCode = 401;

    Object.setPrototypeOf(this, InvalidCredential.prototype);
  }
}
