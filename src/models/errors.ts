class ResponseError extends Error {
  code: number;
  constructor(code: number, message?: string) {
    super(message);
    this.code = code;
  }
}

export class InternalServerError extends ResponseError {
  constructor(message?: string, code = 500) {
    super(code, (message = "Internal Server Error"));
  }
}

export class NotFoundError extends ResponseError {
  constructor(message?: string, code = 404) {
    super(code, message);
  }
}

export class BadRequestError extends ResponseError {
  constructor(message?: string, code = 400) {
    super(code, message);
  }
}
