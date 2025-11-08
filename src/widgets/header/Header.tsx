import { Logo } from 'shared/components/logo'

export const Header = () => {
	return (
		<header className="w-full bg-slate-200 h-16 flex justify-between items-center p-2.5">
			<Logo size="sm" />
			<p>Current Term</p>
			<p>Username</p>
		</header>
	)
}
