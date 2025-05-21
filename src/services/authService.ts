import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApiError } from '@/errors/ApiError';
import { userRepository } from '@/repository/userRepository';

const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES = '7d';

export const authService = {
  register: async (email: string, password: string) => {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new ApiError(409, 'User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(email, passwordHash);

    return user;
  },

  login: async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const accessToken = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: ACCESS_EXPIRES },
    );

    const refreshToken = jwt.sign({ sub: user.id }, JWT_SECRET, {
      expiresIn: REFRESH_EXPIRES,
    });

    await userRepository.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  },

  refresh: async (refreshToken: string) => {
    const payload = jwt.verify(refreshToken, JWT_SECRET) as { sub: string };
    const user = await userRepository.findById(payload.sub);

    if (!user || user.refresh_token !== refreshToken) {
      throw new ApiError(403, 'Invalid refresh token');
    }

    const newAccess = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: ACCESS_EXPIRES },
    );

    const newRefresh = jwt.sign({ sub: user.id }, JWT_SECRET, {
      expiresIn: REFRESH_EXPIRES,
    });

    await userRepository.updateRefreshToken(user.id, newRefresh);

    return {
      accessToken: newAccess,
      refreshToken: newRefresh,
    };
  },
};
