import { createSlice } from '@reduxjs/toolkit'
import { authApi } from 'features/auth/api/authApi'
import { authManager } from 'features/auth/lib/authManager'

const initialState: AuthState = {
	token: authManager.getToken(),
	student: authManager.getStudent(),
	isAuthenticated: !!authManager.getToken(),
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.token = null
			state.student = null
			state.isAuthenticated = false

			authManager.clearAuth()
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
			state.token = payload.token
			state.student = payload.student
			state.isAuthenticated = true

			authManager.setAuth(payload.token, payload.student)
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

export type Student = {
	id: string
	username: string
}
