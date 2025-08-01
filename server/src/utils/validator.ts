import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must include an uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must include a lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must include a number' })
    .regex(/[^A-Za-z0-9]/, {
      message: 'Password must include a special character',
    }),
  name: z
    .string()
    .min(2, { message: 'Name is too short' })
    .max(30, { message: 'Name is too long' }),
})

export type UserInput = z.infer<typeof userSchema>

export function validateUser(data: unknown) {
  const result = userSchema.safeParse(data)
  if (!result.success) {
    console.error('Validation error:', result.error)
  }
  return result
}
