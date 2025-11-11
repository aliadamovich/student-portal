import { baseApi } from 'app/baseApi'
import type { Course, Term } from 'features/coursesDashboard/api/coursesApi.types'

export const coursesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getCurrentTerm: builder.query<Term, void>({
			query: () => '/current_term',
			// providesTags: ['CurrentTerm'],
		}),

		getTermCourses: builder.query<{ courses: Course[] }, string>({
			query: (termId) => `/terms/${termId}/courses`,
			// providesTags: (result, error, termId) =>
			// 	result
			// 		? [
			// 				...result.courses.map(({ id }) => ({ type: 'Courses' as const, id })),
			// 				{ type: 'Courses', id: `TERM-${termId}` },
			// 		  ]
			// 		: [{ type: 'Courses', id: `TERM-${termId}` }],
		}),
	}),
})

export const { useGetCurrentTermQuery, useGetTermCoursesQuery } = coursesApi
