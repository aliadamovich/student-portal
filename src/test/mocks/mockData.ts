export const mockLoginResponse = {
	student: {
		id: 'abc-123',
		username: 'student123',
	},
	token: 'mock-jwt-token',
}

export const mockTermResponse = {
	id: 'term-2025-fall',
	name: 'Fall 2025',
	startDate: '2025-09-01',
	endDate: '2025-12-15',
}

export const mockCoursesResponse = {
	courses: [
		{ id: 'cs101', name: 'filosophy', prereqs: [] },
		{ id: 'cs102', name: 'mathematics', prereqs: [{ id: 'cs101', name: 'filosophy' }] },
		{
			id: 'cs103',
			name: 'computer science',
			prereqs: [
				{ id: 'cs101', name: 'filosophy' },
				{ id: 'cs102', name: 'mathematics' },
			],
		},
	],
}

export const mockRegistrations = {
	registrations: [
		{
			id: 'cs101',

			course: {
				id: 'cs101',
				name: 'filosophy',
			},
			term: 'term-2025-fall',
			//status: 'enrolled' | 'completed' | 'in progress' | 'cancelled'
		},
	],
}
