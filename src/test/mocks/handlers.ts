import type { RequestBody } from 'features/auth/api/authApi.types'
import { http, HttpResponse } from 'msw'
import { mockCoursesResponse, mockLoginResponse, mockRegistrations, mockTermResponse } from 'test/mocks/mockData'

export const handlers = [
	http.post(`api/login`, async ({ request }) => {
		const body = (await request.json()) as RequestBody

		//login
		if (body.username === 'student123' && body.password === '123') {
			return HttpResponse.json(mockLoginResponse)
		}
		return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
	}),

	//get current term
	http.get(`api/current_term`, () => {
		return HttpResponse.json(mockTermResponse)
	}),

	//get term cources
	http.get(`api/terms/:termId/courses`, () => {
		return HttpResponse.json(mockCoursesResponse)
	}),

	//get stuudents registraations
	http.get(`api/students/:studentId/registrations`, () => {
		return HttpResponse.json(mockRegistrations)
	}),
]
