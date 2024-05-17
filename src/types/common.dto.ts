export type PayloadName = 'payload';

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface ErrorData {
  error: string;
  errorCode: string;
  message: string;
}

export interface ErrorResponse {
  status: number;
  data: ErrorData;
}

export type ErrorAction = Record<PayloadName, ErrorResponse>;
