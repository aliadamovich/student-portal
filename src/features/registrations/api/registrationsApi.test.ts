import { mockLoginResponse } from './../../../test/mocks/mockData'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from 'app/baseApi'
import type { AppStore } from 'app/store'
import { authReducer } from 'features/auth/model/authSlice'
import { registrationsApi } from 'features/registrations/api/registrationsApi'
import { beforeEach, describe, expect, it } from 'vitest'

describe('registrationsApi', () => {
	let store: AppStore

	beforeEach(() => {
		store = configureStore({
			reducer: {
				[baseApi.reducerPath]: baseApi.reducer,
				auth: authReducer,
			},
			preloadedState: {
				auth: {
					...mockLoginResponse,
					isAuthenticated: true,
				},
			},
			middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
		})
	})

	it("should fetch student's registrations", async () => {
		const studentId = store.getState().auth.student!.id
		const result = await store.dispatch(registrationsApi.endpoints.getStudentRegistrations.initiate(studentId))
		expect(result.data?.registrations).toHaveLength(1)
	})
})
