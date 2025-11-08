import { createHashRouter, Navigate } from 'react-router-dom'
import { LoginPage } from 'pages/loginPage'
import App from './App'
import { DashboardPage } from 'pages/dashboardPage'

export const PATH = {
	ROOT: '/',
	DASHBOARD: '/dashboard',
	LOGIN: '/login',
	ERROR: '404',
}

export const router = createHashRouter([
	{
		path: PATH.LOGIN,
		element: <LoginPage />,
	},

	{
		path: PATH.ROOT,
		element: <App />,
		errorElement: <Navigate to={PATH.ERROR} />,

		children: [
			{
				index: true,
				element: <Navigate to={PATH.DASHBOARD} replace />,
			},
			{
				path: PATH.DASHBOARD,
				element: <DashboardPage />,
			},

			// {
			//   path: "courses/:id",
			//   element: <CoursePage />,
			// },
		],
	},

	{
		path: PATH.ERROR,
		element: <div>404 — Page not found</div>,
	},
])
