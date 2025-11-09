import { PATH } from 'app/routes/router'
import { useLoginMutation } from 'features/auth/api/authApi'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from 'shared/components/button'
import { TextField } from 'shared/components/textField'
import { Toast } from 'shared/components/toast/Toast'

type FormValues = {
	username: string
	password: string
}

export const LoginForm = () => {
	const navigate = useNavigate()
	const [error, setError] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>()

	const [login, { isLoading }] = useLoginMutation()

	const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
		try {
			await login({
				username: data.username,
				password: data.password,
			}).unwrap()

			reset()
			navigate(PATH.ROOT)
		} catch (error) {
			const message = error?.data?.message || error?.error || 'Something went wrong'
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
				/>

				<TextField
					label="password"
					{...register('password', { required: 'Password is required' })}
					type="password"
					placeholder="Enter your password"
					errorMessage={errors.password?.message}
					aria-invalid={errors.password ? 'true' : 'false'}
					aria-describedby={errors.password ? 'password-error' : undefined}
				/>
				<Button disabled={isLoading} type="submit">
					{isLoading ? 'Signing in' : 'Sign in'}
				</Button>
			</form>
			{error && <Toast message={error} onClose={() => setError(null)} />}
		</>
	)
}
