import { UserRoles } from '@/types/userRoles';
import { knex } from '@/db/knex';

export const userRepository = {
  findByEmail: (email: string) => {
    return knex('users').where({ email }).first();
  },

  createUser: async (email: string, passwordHash: string) => {
    const [user] = await knex('users')
      .insert({
        email,
        password_hash: passwordHash,
        role: UserRoles.USER,
        created_at: new Date(),
      })
      .returning(['id', 'email', 'role']);

    return user;
  },

  updateRefreshToken: (userId: string, refreshToken: string) => {
    return knex('users')
      .where({ id: userId })
      .update({ refresh_token: refreshToken });
  },

  findById: (id: string) => {
    return knex('users').where({ id }).first();
  },
};
