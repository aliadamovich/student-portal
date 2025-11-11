import { baseApi } from 'app/baseApi'
import { PATH } from 'app/routes/router'
import { useAppDispatch } from 'app/store'
import { logout } from 'features/auth/model/authSlice'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [isLoggingOut, setIsLoggingOut] = useState(false)

	const logoutHandler = useCallback(async () => {
		try {
			setIsLoggingOut(true)

			dispatch(logout())

			dispatch(baseApi.util.resetApiState())

			navigate(PATH.LOGIN)
		} catch (error) {
			console.error('Logout failed:', error)
			dispatch(baseApi.util.resetApiState())
			navigate(PATH.LOGIN)
		} finally {
			setIsLoggingOut(false)
		}
	}, [dispatch, navigate])

	return { logoutHandler, isLoggingOut }
}
