import {z} from 'zod'

export const registerSchema = z.object({
    email:z.string().email({message:'Invalid email format'}),
    password:z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(64, { message: 'Password too long' }),
})

export const loginSchema = z.object({
    email:z.string().email({message:'Invalid email format'}),
    password:z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(64, { message: 'Password too long' }),
})