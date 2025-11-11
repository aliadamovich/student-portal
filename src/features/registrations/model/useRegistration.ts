import { useAppSelector } from 'app/store'
import { selectStudent } from 'features/auth/model/authSlice'
import { useGetCurrentTermQuery } from 'features/coursesDashboard/api/coursesApi'
import type { Course } from 'features/coursesDashboard/api/coursesApi.types'
import { canRegisterForCourse } from 'features/coursesDashboard/utils/canRegisterForCourse'
import {
	useGetStudentRegistrationsQuery,
	useRegisterForCourseMutation,
} from 'features/registrations/api/registrationsApi'
import { useCallback, useMemo } from 'react'
import { mockRegistrations } from 'test/mocks/mockData'

export const useRegistration = (course: Course) => {
	const student = useAppSelector(selectStudent)
	const studentId = student?.id ?? ''

	const { data: term } = useGetCurrentTermQuery()
	const { data, isLoading: isRegsLoading } = useGetStudentRegistrationsQuery(studentId, {
		skip: !studentId,
	})
	const registrations = data?.registrations || mockRegistrations.registrations

	const [registerForCourse, { isLoading: isRegistering }] = useRegisterForCourseMutation()

	const { canRegister, missingPrereqs } = useMemo(
		() => canRegisterForCourse(course, registrations),
		[course, registrations]
	)

	const isRegistered = useMemo(() => {
		return registrations.some((reg) => reg.course.id === course.id)
	}, [registrations, course.id])

	const handleRegister = useCallback(async () => {
		if (!student || !term || !canRegister) return

		try {
			await registerForCourse({
				studentId: student.id,
				courseId: course.id,
				termId: term.id,
			}).unwrap()
		} catch (err) {
			console.error('Registration failed', err)
			alert('Registration failed.')
		}
	}, [student, term, course, canRegister, registerForCourse])

	return {
		isRegistered,
		canRegister,
		missingPrereqs,
		isLoading: isRegsLoading || isRegistering,
		handleRegister,
	}
}
