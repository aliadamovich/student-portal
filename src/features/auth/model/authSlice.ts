import { createSlice } from '@reduxjs/toolkit'
import { authApi } from 'features/auth/api/authApi'

const initialState: AuthState = {
	token: localStorage.getItem('auth_token'),
	student: null,
	isAuthenticated: !!localStorage.getItem('auth_token'),
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.token = null
			state.student = null
			state.isAuthenticated = false
			localStorage.removeItem('auth_token')
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
			state.token = payload.token
			state.student = payload.student
			state.isAuthenticated = true

			localStorage.setItem('auth_token', payload.token)
		})
	},
	selectors: {
		selectIsAuthenticated: (state) => state.isAuthenticated,
		selectStudent: (state) => state.student,
	},
})

export const { logout } = authSlice.actions
export const { selectIsAuthenticated, selectStudent } = authSlice.selectors
export const authReducer = authSlice.reducer

type AuthState = {
	token: string | null
	student: Student | null
	isAuthenticated: boolean
}

type Student = {
	id: string
	username: string
}
