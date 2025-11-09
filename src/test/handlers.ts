import { http, HttpResponse } from 'msw'

const API_URL = import.meta.env.VITE_API_BASE_URL

export const handlers = [
	http.post(`${API_URL}/login`, async ({ request }) => {
		const body = await request.json()

		//login
		if (body.username === 'student123' && body.password === '123') {
			return HttpResponse.json({
				student: {
					id: 'abc-123',
					username: 'student123',
				},
				token: 'mock-jwt-token',
			})
		}
		return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
	}),

	//get current term
	http.get(`${API_URL}/current_term`, () => {
		return HttpResponse.json({
			id: 'term-2024-fall',
			name: 'Fall 2024',
			startDate: '2025-09-01',
			endDate: '2025-12-15',
		})
	}),

	//get term cources
	http.get(`${API_URL}/terms/:termId/courses`, () => {
		return HttpResponse.json({
			courses: [
				{ id: 'cs101', name: 'Computer Science', prereqs: [] },
				{ id: 'cs102', name: 'Philosophy', prereqs: [] },
				{ id: 'cs103', name: 'Mathematics', prereqs: [] },
			],
		})
	}),

	//get stuudents registraations
	http.get(`${API_URL}/students/:studentId/registrations`, () => {
		return HttpResponse.json({
			registrations: [
				{
					id: 'cs101',

					course: {
						id: 'cs101',
						name: 'Intro to Computer Science',
						prereqs: [],
					},
					term: {
						id: 'term-2024-spring',
						name: 'Spring 2024',
						startDate: '2024-01-15',
						endDate: '2024-05-15',
					},
				},
			],
		})
	}),
]
