export class ForbiddenActionError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Not allowed';
    super(finalMessage);
    this.name = 'ForbiddenActionError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, ForbiddenActionError.prototype);
  }
}
