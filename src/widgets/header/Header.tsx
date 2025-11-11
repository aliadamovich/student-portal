import { Logo } from 'shared/components/logo'

export const Header = () => {
	return (
		<header className="w-full bg-white shadow-sm border-b border-slate-200 h-16 px-6 flex items-center justify-between">
			<Logo size="sm" />

			<p className="text-slate-600 font-medium">
				Current Term: <span className="text-slate-800">Fall 2024</span>
			</p>

			<div className="flex items-center gap-2 text-slate-700">
				<div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-sm font-semibold">
					U
				</div>
				<p className="font-medium">Username</p>
			</div>
		</header>
	)
}
