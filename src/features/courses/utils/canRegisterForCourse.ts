import type { Course } from 'features/courses/api/coursesApi.types'
import type { Registration } from 'features/registrations/api/registrationsApi.types'

export const canRegisterForCourse = (course: Course, registrations?: Registration[]) => {
	const completedIds = new Set(registrations?.map((c) => c.id))
	const missingPrereqs = course.prereqs.filter((prereqId) => !completedIds.has(prereqId.id))
	return {
		canRegister: missingPrereqs.length === 0,
		missingPrereqs,
	}
}
