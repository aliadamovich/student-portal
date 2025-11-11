import { describe, it, expect } from 'vitest'
import { canRegisterForCourse } from './canRegisterForCourse'
import type { Course } from 'features/coursesDashboard/api/coursesApi.types'

describe('canRegisterForCourse', () => {
	const cs101: Course = {
		id: 'cs101',
		name: 'Intro to CS',
		prereqs: [],
	}

	const cs201: Course = {
		id: 'cs201',
		name: 'Data Structures',
		prereqs: [{ id: 'cs101', name: 'Intro to CS' }],
	}

	const cs301: Course = {
		id: 'cs301',
		name: 'Algorithms',
		prereqs: [
			{ id: 'cs101', name: 'Intro to CS' },
			{ id: 'cs201', name: 'Algorithms' },
		],
	}

	it('should allow registration when no prerequisites exist', () => {
		const result = canRegisterForCourse(cs101, [])

		expect(result.canRegister).toBe(true)
		expect(result.missingPrereqs).toHaveLength(0)
	})

	it('should allow registration when all prerequisites are met', () => {
		const result = canRegisterForCourse(cs201, [
			{ id: 'cs101', course: { id: 'cs101', name: 'intro to CS' }, term: '' },
		])

		expect(result.canRegister).toBe(true)
		expect(result.missingPrereqs).toHaveLength(0)
	})

	it('should prevent registration when prerequisites are missing', () => {
		const result = canRegisterForCourse(cs201, [])

		expect(result.canRegister).toBe(false)
		expect(result.missingPrereqs).toEqual([{ id: 'cs101', name: 'Intro to CS' }])
	})

	it('should handle multiple prerequisites correctly', () => {
		const result = canRegisterForCourse(cs301, [
			{ id: 'cs101', course: { id: 'cs101', name: 'intro to CS' }, term: '' },
		])

		expect(result.canRegister).toBe(false)
		expect(result.missingPrereqs).toEqual([{ id: 'cs201', name: 'Algorithms' }])
	})

	it('should allow registration when all multiple prerequisites are met', () => {
		const result = canRegisterForCourse(cs301, [
			{ id: 'cs101', course: { id: 'cs101', name: 'intro to CS' }, term: '' },
			{ id: 'cs201', course: { id: 'cs201', name: 'Data structure' }, term: '' },
		])

		expect(result.canRegister).toBe(true)
		expect(result.missingPrereqs).toHaveLength(0)
	})
})
