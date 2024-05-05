import { type Request as ExpressRequest, type Response as ExpressResponse } from 'express';

export interface Request extends ExpressRequest {
  user_id?: string;
}

export interface Response extends ExpressResponse {
  error?: string;
  message?: string;
}