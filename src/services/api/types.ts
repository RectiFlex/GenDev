export interface APIResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

export interface APIError {
  message: string;
  code: string;
  status: number;
}

export class APIException extends Error {
  constructor(public error: APIError) {
    super(error.message);
    this.name = 'APIException';
  }
}