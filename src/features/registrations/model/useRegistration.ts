import { useAppSelector } from 'app/store'
import { selectStudent } from 'features/auth/model/authSlice'
import { useGetCurrentTermQuery } from 'features/courses/api/coursesApi'
import type { Course } from 'features/courses/api/coursesApi.types'
import { canRegisterForCourse } from 'features/courses/utils/canRegisterForCourse'
import {
	useGetStudentRegistrationsQuery,
	useRegisterForCourseMutation,
} from 'features/registrations/api/registrationsApi'
import { useCallback, useMemo } from 'react'
import { mockRegistrations } from 'test/mocks/mockData'

export const useRegistration = (course: Course) => {
	const student = useAppSelector(selectStudent)
	const studentId = student?.id ?? ''

	const { data: term } = useGetCurrentTermQuery() //we get all terms
	const { data, isLoading: isRegsLoading } = useGetStudentRegistrationsQuery(studentId, {
		skip: !studentId,
	}) //we get student's registrations
	const registrations = data?.registrations || mockRegistrations.registrations

	const [registerForCourse, { isLoading: isRegistering }] = useRegisterForCourseMutation()

	const { canRegister, missingPrereqs } = useMemo(
		() => canRegisterForCourse(course, registrations),
		[course, registrations]
	)

	const isRegistered = useMemo(() => {
		return registrations.some((reg) => reg.course.id === course.id)
	}, [registrations, course.id])

	//how i would see implementation of registration
	const handleRegister = useCallback(async () => {
		if (!student || !term || !canRegister) return

		try {
			await registerForCourse({
				studentId: student.id,
				courseId: course.id,
				termId: term.id,
			}).unwrap()
		} catch (err) {
			//as we handle all errors on the high level cathcing errors here can be redundant
			console.error('Registration failed', err)
		}
	}, [student, term, course, canRegister, registerForCourse])

	//also cancelling the registration should be added here
	//const cancelRegistration = () => {}

	return {
		isRegistered,
		canRegister,
		missingPrereqs,
		isLoading: isRegsLoading || isRegistering,
		handleRegister,
	}
}
