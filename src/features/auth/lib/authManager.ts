import type { Student } from 'features/auth/model/authSlice'

export const authManager = {
	getToken: (): string | null => {
		const token = localStorage.getItem('auth_token')
		return token && token.trim() ? token.trim() : null
	},

	getStudent: (): Student | null => {
		const student = localStorage.getItem('student')
		if (!student) return null

		const parsed = JSON.parse(student)

		if (parsed && typeof parsed === 'object' && parsed.id) {
			return parsed as Student
		}
		return null
	},

	setAuth: (token: string, student: Student): void => {
		if (!token || !token.trim()) {
			throw new Error('Token cannot be empty')
		}
		if (!student || !student.id) {
			throw new Error('Student must have an id')
		}

		localStorage.setItem('auth_token', token.trim())
		localStorage.setItem('student', JSON.stringify(student))
	},

	clearAuth: () => {
		localStorage.removeItem('auth_token')
		localStorage.removeItem('student')
	},
}
