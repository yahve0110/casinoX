export const authConfig = {
  jwtSecret: process.env.JWT_SECRET!,
  accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
};
