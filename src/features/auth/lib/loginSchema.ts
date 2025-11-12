import { z } from 'zod'

export const loginSchema = z.object({
	username: z
		.string()
		.min(1, 'Username is required')
		.min(3, 'Username must be at least 3 characters')
		.max(50, 'Username must be less than 50 characters')
		.regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens')
		.trim(),
	password: z.string().min(1, 'Password is required').min(3, 'Password must be at least 3 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
