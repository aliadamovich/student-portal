import { renderHook, act } from '@testing-library/react'
import { useRegistration } from './useRegistration'
import { describe, it, vi } from 'vitest'
import { coursesApi } from 'features/coursesDashboard/api/coursesApi'
import { registrationsApi } from 'features/registrations/api/registrationsApi'
import { store } from 'app/store'
import type { Provider } from 'react'

// mock data
const mockCourse = { id: 'cs102', name: 'CS 102', prereqs: ['cs101'] }
const mockTerm = { id: 'term-2025-fall', name: 'Fall 2025', startDate: '2025-09-01', endDate: '2025-12-15' }
const mockRegs = { registrations: [{ id: 'cs101' }] }

vi.spyOn(coursesApi, 'useGetCurrentTermQuery').mockReturnValue({ data: mockTerm })
vi.spyOn(registrationsApi, 'useGetStudentRegistrationsQuery').mockReturnValue({ data: mockRegs })
vi.spyOn(registrationsApi, 'useRegisterForCourseMutation').mockReturnValue([
	vi.fn(() => Promise.resolve({})),
	{ isLoading: false },
])

vi.mock('@/features/auth/model/authSlice', () => ({
	selectStudent: vi.fn(() => ({ id: 'abc-123', username: 'student123' })),
}))

describe('useRegistration', () => {
	it('computes registration eligibility correctly', () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={setupStore()}>{children}</Provider>
		)

		const { result } = renderHook(() => useRegistration(mockCourse), { wrapper })
		expect(result.current.canRegister).toBe(true)
		expect(result.current.missingPrereqs).toEqual([])
	})

	it('calls registerForCourse when handleRegister is invoked', async () => {
		const registerMock = vi.fn(() => ({ unwrap: vi.fn() }))
		vi.spyOn(registrationsApi, 'useRegisterForCourseMutation').mockReturnValue([registerMock, { isLoading: false }])

		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<Provider store={setupStore()}>{children}</Provider>
		)

		const { result } = renderHook(() => useRegistration(mockCourse), { wrapper })

		await act(async () => {
			await result.current.handleRegister()
		})

		expect(registerMock).toHaveBeenCalled()
	})
})
