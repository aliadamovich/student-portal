import type { RequestBody } from 'features/auth/api/authApi.types'
import { http, HttpResponse } from 'msw'
import { mockCoursesResponse, mockLoginResponse, mockRegistrations, mockTermResponse } from 'test/mocks/mockData'

const API_URL = import.meta.env.VITE_API_BASE_URL

export const handlers = [
	http.post(`${API_URL}/login`, async ({ request }) => {
		const body = (await request.json()) as RequestBody

		//login
		if (body.username === 'student123' && body.password === '123') {
			return HttpResponse.json(mockLoginResponse)
		}
		return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
	}),

	//get current term
	http.get(`${API_URL}/current_term`, () => {
		return HttpResponse.json(mockTermResponse)
	}),

	//get term cources
	http.get(`${API_URL}/terms/:termId/courses`, () => {
		return HttpResponse.json(mockCoursesResponse)
	}),

	//get stuudents registraations
	http.get(`${API_URL}/students/:studentId/registrations`, () => {
		return HttpResponse.json(mockRegistrations)
	}),
]
