import { PATH } from 'app/routes/router'
import { selectIsAuthenticated } from 'features/auth/model/authSlice'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
	// const isAuth = useSelector(selectIsAuthenticated)

	// if (!isAuth) {
	// 	return <Navigate to={PATH.LOGIN} replace />
	// }

	return <Outlet />
}
