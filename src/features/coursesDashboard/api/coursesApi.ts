import { baseApi } from 'app/baseApi'
import type { Course, Term } from 'features/coursesDashboard/api/coursesApi.types'

export const coursesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCurrentTerm: builder.query<Term, void>({
			query: () => '/current_term',
		}),

		getTermCourses: builder.query<{ courses: Course[] }, string>({
			query: (termId) => `/terms/${termId}/courses`,
		}),
	}),
})

export const { useGetCurrentTermQuery, useGetTermCoursesQuery } = coursesApi
