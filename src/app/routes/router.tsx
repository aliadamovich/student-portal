import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from 'pages/loginPage'
import App from '../App'
import { CoursesPage } from 'pages/coursesPage'
import { ProtectedRoute } from './protectedRoute'
import { ProtectedLayout } from 'widgets/protectedLayout'

export const PATH = {
	ROOT: '/',
	LOGIN: '/login',
	ERROR: '404',
}

export const router = createBrowserRouter([
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
				element: <ProtectedRoute />,
				children: [
					{
						element: <ProtectedLayout />,
						children: [
							{
								index: true,
								element: <CoursesPage />,
							},
						],
					},
				],
			},
		],
	},

	{
		path: PATH.ERROR,
		element: <div>404 — Page not found</div>,
	},
])
