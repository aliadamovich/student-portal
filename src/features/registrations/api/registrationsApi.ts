import { baseApi } from 'app/baseApi'
import type { RegistrationRequest, RegistrationsResonse } from 'features/registrations/api/registrationsApi.types'

export const registrationsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getStudentRegistrations: builder.query<RegistrationsResonse, string>({
			query: (studentId) => `/students/${studentId}/registrations`,
			// providesTags: (result, error, studentId) =>
			// 	result
			// 		? [
			// 				...result.registrations.map(({ id }) => ({ type: 'Registrations' as const, id })),
			// 				{ type: 'Registrations', id: `STUDENT-${studentId}` },
			// 		  ]
			// 		: [{ type: 'Registrations', id: `STUDENT-${studentId}` }],
		}),

		registerForCourse: builder.mutation<void, RegistrationRequest>({
			query: ({ studentId, courseId, termId }) => ({
				url: `/students/${studentId}/registrations`,
				method: 'POST',
				body: { courseId, termId },
			}),
			// Optimistic update
			// async onQueryStarted({ studentId, courseId, termId }, { dispatch, queryFulfilled, getState }) {
			// 	// Get the course data for optimistic update
			// 	const coursesState = registrationsApi.endpoints.getTermCourses.select(termId)(getState() as any)
			// 	const course = coursesState.data?.courses.find((c) => c.id === courseId)

			// 	if (!course) return

			// 	// Optimistically add the registration
			// 	const patchResult = dispatch(
			// 		registrationsApi.util.updateQueryData('getStudentRegistrations', studentId, (draft) => {
			// 			draft.registrations.push({
			// 				id: `temp-${Date.now()}`,
			// 				course,
			// 				term: { id: termId, name: 'Current Term', startDate: '', endDate: '' },
			// 				status: 'enrolled',
			// 			})
			// 		})
			// 	)

			// 	try {
			// 		await queryFulfilled
			// 	} catch {
			// 		// Rollback on error
			// 		patchResult.undo()
			// 	}
			// },
			// Invalidate cache after mutation
			// invalidatesTags: (result, error, { studentId }) => [{ type: 'Registrations', id: `STUDENT-${studentId}` }],
		}),

		dropCourse: builder.mutation<void, { studentId: string; registrationId: string }>({
			query: ({ studentId, registrationId }) => ({
				url: `/students/${studentId}/registrations/${registrationId}`,
				method: 'DELETE',
			}),
			// invalidatesTags: (result, error, { studentId }) => [{ type: 'Registrations', id: `STUDENT-${studentId}` }],
		}),
	}),
})

export const { useGetStudentRegistrationsQuery, useRegisterForCourseMutation, useDropCourseMutation } = registrationsApi
