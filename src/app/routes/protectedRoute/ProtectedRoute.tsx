import { Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
	// const isAuth = useSelector(selectIsAuthenticated);

	// if (!isAuth) {
	//   return <Navigate to="/login" replace />;
	// }

	return <Outlet />
}
