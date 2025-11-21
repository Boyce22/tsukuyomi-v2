export class MissingFieldsError extends Error {
  statusCode: number;

  constructor(message?: string) {
    const finalMessage = message ?? "Required fields are missing.";
    super(finalMessage);
    this.name = "MissingFieldsError";
    this.statusCode = 400;

    Object.setPrototypeOf(this, MissingFieldsError.prototype);
  }
}

