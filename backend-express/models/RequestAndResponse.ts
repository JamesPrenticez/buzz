import { type Request as ExpressRequest, type Response as ExpressResponse } from 'express';

export interface Request<T = any> extends ExpressRequest {
  user_id?: string;
  body: T; 
}

export interface Response extends ExpressResponse {
  error?: string;
  message?: string;
}