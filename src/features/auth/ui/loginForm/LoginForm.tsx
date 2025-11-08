import { Button } from 'shared/components/button'
import { TextField } from 'shared/components/textField'

export const LoginForm = () => {
	return (
		<form className="flex flex-col gap-2 justify-center w-3xs border border-slate-500 rounded p-2.5">
			<TextField placeholder="Username" />
			<TextField type="password" placeholder="Password" />
			<Button type="submit">Sign in</Button>
		</form>
	)
}
