export class MangaNotFoundError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? 'Manga not found';
    super(finalMessage);
    this.name = 'MangaNotFoundError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, MangaNotFoundError.prototype);
  }
}
