export interface Response<T> {
    status: string; // "success" o "error"
    message: string;
    data?: T;
  }
  