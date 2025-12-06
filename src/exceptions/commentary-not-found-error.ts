export class CommentaryNotFoundError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Commentary not found';
    super(finalMessage);
    this.name = 'CommentaryNotFoundError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, CommentaryNotFoundError.prototype);
  }
}
