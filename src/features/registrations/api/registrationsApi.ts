import { baseApi } from 'app/baseApi'
import type { RegistrationRequest, RegistrationsResonse } from 'features/registrations/api/registrationsApi.types'

export const registrationsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getStudentRegistrations: builder.query<RegistrationsResonse, string>({
			query: (studentId) => `/students/${studentId}/registrations`,
		}),

		registerForCourse: builder.mutation<void, RegistrationRequest>({
			query: ({ studentId, courseId, termId }) => ({
				url: `/students/${studentId}/registrations`,
				method: 'POST',
				body: { courseId, termId },
			}),
		}),

		dropCourse: builder.mutation<void, { studentId: string; registrationId: string }>({
			query: ({ studentId, registrationId }) => ({
				url: `/students/${studentId}/registrations/${registrationId}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const { useGetStudentRegistrationsQuery, useRegisterForCourseMutation, useDropCourseMutation } = registrationsApi
