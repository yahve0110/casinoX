import { userRepository } from '@/repository/userRepository';
import { authService } from '../authService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { knex } from '@/db/knex';

jest.mock('@/repository/userRepository', () => ({
  userRepository: {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
    updateRefreshToken: jest.fn(),
    findById: jest.fn(),
  },
}));



jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const mockUser = {
  id: 'user-id',
  email: 'test@example.com',
  password_hash: 'hashed-password',
  role: 'user',
  refresh_token: 'old-refresh-token',
};

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should throw error if user already exists', async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        authService.register('test@example.com', 'secret'),
      ).rejects.toThrow('User already exists');
    });

    it('should create user if not exists', async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      (userRepository.createUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.register('test@example.com', 'secret');

      expect(result).toEqual(mockUser);
      expect(bcrypt.hash).toHaveBeenCalledWith('secret', 10);
      expect(userRepository.createUser).toHaveBeenCalledWith(
        'test@example.com',
        'hashed-password',
      );
    });
  });

  describe('login', () => {
    it('should throw if user not found', async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.login('test@example.com', 'secret'),
      ).rejects.toThrow('Invalid email or password');
    });

    it('should throw if password is incorrect', async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login('test@example.com', 'wrong'),
      ).rejects.toThrow('Invalid email or password');
    });

    it('should return tokens and user on success', async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValueOnce('access-token').mockReturnValueOnce('refresh-token');

      const result = await authService.login('test@example.com', 'secret');

      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        user: {
          id: mockUser.id,
          email: mockUser.email,
          role: mockUser.role,
        },
      });
    });
  });

  describe('refresh', () => {
    it('should throw if refresh token is invalid', async () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('invalid');
      });

      await expect(authService.refresh('bad-token')).rejects.toThrow(
        'invalid',
      );
    });

    it('should throw if user not found or token mismatch', async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ sub: 'user-id' });
      (userRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(authService.refresh('any-token')).rejects.toThrow(
        'Invalid refresh token',
      );
    });

    it('should return new tokens if refresh token is valid', async () => {
      (jwt.verify as jest.Mock).mockReturnValue({ sub: 'user-id' });
      (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock)
        .mockReturnValueOnce('new-access')
        .mockReturnValueOnce('new-refresh');

      const result = await authService.refresh('old-refresh-token');

      expect(result).toEqual({
        accessToken: 'new-access',
        refreshToken: 'new-refresh',
      });

      expect(userRepository.updateRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
        'new-refresh',
      );
    });
  });
});
