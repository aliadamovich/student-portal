import { describe, it, expect, beforeEach, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { useLogout } from './useLogout'
import { authManager } from 'features/auth/lib/authManager'
import { baseApi } from 'app/baseApi'
import { authReducer } from 'features/auth/model/authSlice'
import { renderHookWithProviders } from 'test/utils'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom')
	return {
		...actual,
		useNavigate: () => mockNavigate,
	}
})

describe('useLogout', () => {
	beforeEach(() => {
		mockNavigate.mockClear()
		localStorage.clear()

		authManager.setAuth('test-token', {
			id: 'student123',
			username: 'John Doe',
		})
	})

	it('should clear localStorage, Redux state, and navigate', async () => {
		const store = configureStore({
			reducer: {
				[baseApi.reducerPath]: baseApi.reducer,
				auth: authReducer,
			},
			middleware: (gDM) => gDM().concat(baseApi.middleware),
			preloadedState: {
				auth: {
					token: 'test-token',
					student: { id: 'student123', username: 'John Doe' },
					isAuthenticated: true,
				},
			},
		})

		const { result } = renderHookWithProviders(() => useLogout(), { store })

		expect(localStorage.getItem('auth_token')).toBe('test-token')
		expect(store.getState().auth.token).toBeTruthy()

		result.current.logoutHandler()

		await waitFor(() => {
			expect(localStorage.getItem('auth_token')).toBeNull()
			expect(localStorage.getItem('student')).toBeNull()

			expect(store.getState().auth.token).toBeNull()
			expect(store.getState().auth.student).toBeNull()

			expect(mockNavigate).toHaveBeenCalledWith('/login')
		})
	})
})
