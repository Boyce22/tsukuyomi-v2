export class LimitExceeded extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Limit exceeded';
    super(finalMessage);

    this.name = 'LimitExceeded';
    this.statusCode = 401;

    Object.setPrototypeOf(this, LimitExceeded.prototype);
  }
}
