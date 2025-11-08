import { Outlet } from 'react-router-dom'
import { Header } from 'widgets/header'

export const ProtectedLayout = () => {
	return (
		<div className="h-full flex flex-col">
			<Header />
			<main className="flex-1 px-2.5 py-5 bg-slate-50">
				<Outlet />
			</main>
		</div>
	)
}
