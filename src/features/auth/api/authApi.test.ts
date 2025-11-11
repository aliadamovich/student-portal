import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from 'app/baseApi'
import type { AppStore } from 'app/store'
import { authApi } from 'features/auth/api/authApi'
import type { ApiError } from 'features/auth/api/authApi.types'
import { authReducer } from 'features/auth/model/authSlice'
import { describe, it, expect, beforeEach } from 'vitest'

describe('authApi', () => {
	let store: AppStore

	beforeEach(() => {
		store = configureStore({
			reducer: {
				[baseApi.reducerPath]: baseApi.reducer,
				auth: authReducer,
			},
			middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
		})
	})

	it('should successfully login with valid credentials', async () => {
		const result = await store.dispatch(
			authApi.endpoints.login.initiate({
				username: 'student123',
				password: '123',
			})
		)

		expect(result.data).toEqual({
			student: {
				id: 'abc-123',
				username: 'student123',
			},
			token: 'mock-jwt-token',
		})

		const state = store.getState()
		expect(state.auth.token).toBe('mock-jwt-token')
		expect(state.auth.student?.username).toBe('student123')
	})

	it('should fail login with invalid credentials', async () => {
		const result = await store.dispatch(
			authApi.endpoints.login.initiate({
				username: 'invalid',
				password: 'wrong',
			})
		)

		expect(result.error as ApiError).toBeDefined()
		expect((result.error as ApiError).data?.message).toEqual('Invalid credentials')
		expect((result.error as ApiError).status).toBe(401)
	})
})
