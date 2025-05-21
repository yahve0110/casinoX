import { UserRoles } from '@/types/userRoles';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRoles;
  [key: string]: any;
}
