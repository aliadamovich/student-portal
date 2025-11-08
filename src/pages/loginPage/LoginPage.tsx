import { LoginForm } from 'features/auth/ui/loginForm'
import { Logo } from 'shared/components/logo'

export const LoginPage = () => {
	return (
		<div className="flex justify-center items-center flex-col gap-4 h-full">
			<Logo size="md" />
			<LoginForm />
		</div>
	)
}
