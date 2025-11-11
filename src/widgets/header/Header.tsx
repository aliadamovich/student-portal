import { useAppSelector } from 'app/store'
import { selectStudent } from 'features/auth/model/authSlice'
import { useGetCurrentTermQuery } from 'features/coursesDashboard/api/coursesApi'
import { Button } from 'shared/components/button'
import { Logo } from 'shared/components/logo'
import { mockLoginResponse } from 'test/mocks/mockData'
import { useLogout } from 'widgets/header/hooks'

export const Header = () => {
	const student = useAppSelector(selectStudent)
	const username = student?.username || mockLoginResponse.student.username
	const { data: term } = useGetCurrentTermQuery()

	const { isLoggingOut, logoutHandler } = useLogout()

	return (
		<header className="w-full bg-white shadow-sm border-b border-slate-200 h-16 px-6 flex items-center justify-between">
			<Logo size="sm" />

			<p className="text-slate-800 font-medium">{term?.name || 'Fall 2025'}</p>

			<div className="flex items-center gap-3 text-slate-700">
				<p className="font-medium">{username}</p>
				<Button disabled={isLoggingOut} variant="secondary" onClick={logoutHandler}>
					Log out
				</Button>
			</div>
		</header>
	)
}
