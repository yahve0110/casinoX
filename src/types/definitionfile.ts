import { Request } from 'express';

export interface IJwtPayload {
  sub: string;
  email: string;
  role: string;
}
export interface IGetUserAuthInfoRequest extends Request {
  user?: IJwtPayload;
}
