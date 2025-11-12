import { zodResolver } from '@hookform/resolvers/zod'
import { PATH } from 'app/routes/router'
import { useLoginMutation } from 'features/auth/api/authApi'
import type { ApiError } from 'features/auth/api/authApi.types'
import { loginSchema, type LoginFormValues } from 'features/auth/lib/loginSchema'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from 'shared/components/button'
import { TextField } from 'shared/components/textField'
import { Toast } from 'shared/components/toast/Toast'

//i've implemented react-hook-form for error handling, rerender optimization and consistency
// and added zod validation for reliable form validation

export const LoginForm = () => {
	const navigate = useNavigate()
	const [error, setError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		mode: 'onBlur',
	})

	const [login, { isLoading }] = useLoginMutation()

	const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
		try {
			await login({
				username: data.username,
				password: data.password,
			}).unwrap()

			reset()
			navigate(PATH.ROOT)
		} catch (error) {
			const message = (error as ApiError).data?.message || 'Something went wrong'
			setError(message)
		}
	}
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 justify-center w-[300px] border border-slate-500 rounded px-5 py-8 relative"
				aria-label="Login form"
			>
				<TextField
					label="username"
					aria-invalid={errors.username ? 'true' : 'false'}
					aria-describedby={errors.username ? 'username-error' : undefined}
					{...register('username', { required: 'Username is required' })}
					placeholder="Enter your student ID"
					errorMessage={errors.username?.message}
					disabled={isLoading}
				/>

				<TextField
					label="password"
					{...register('password', { required: 'Password is required' })}
					type="password"
					placeholder="Enter your password"
					errorMessage={errors.password?.message}
					aria-invalid={errors.password ? 'true' : 'false'}
					aria-describedby={errors.password ? 'password-error' : undefined}
					disabled={isLoading}
				/>
				<Button disabled={isLoading} type="submit">
					{isLoading ? 'Signing in' : 'Sign in'}
				</Button>
			</form>
			{error && <Toast message={error} onClose={() => setError(null)} />}
		</>
	)
}
