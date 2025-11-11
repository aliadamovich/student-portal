import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from 'app/baseApi'
import type { AppStore } from 'app/store'
import { authReducer } from 'features/auth/model/authSlice'
import { coursesApi } from 'features/coursesDashboard/api/coursesApi'
import { beforeEach, describe, expect, it } from 'vitest'

describe('coursesApi', () => {
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

	it('should fetch current term', async () => {
		const result = await store.dispatch(coursesApi.endpoints.getCurrentTerm.initiate())

		expect(result.data).toEqual({
			id: 'term-2025-fall',
			name: 'Fall 2025',
			startDate: '2025-09-01',
			endDate: '2025-12-15',
		})
	})

	it('should fetch courses for current term', async () => {
		const result = await store.dispatch(coursesApi.endpoints.getTermCourses.initiate('term-2025-fall'))

		expect(result.data?.courses).toHaveLength(3)
		expect(result.data?.courses[0].id).toBe('cs101')
	})

	it('should cache courses data', async () => {
		await store.dispatch(coursesApi.endpoints.getTermCourses.initiate('term-2025-fall'))

		const result = await store.dispatch(coursesApi.endpoints.getTermCourses.initiate('term-2025-fall'))

		expect(result.isSuccess).toBe(true)
	})
})
