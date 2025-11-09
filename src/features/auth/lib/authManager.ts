export const authManager = {
	getToken: (): string | null => {
		const token = localStorage.getItem('auth_token')
		return token && token.trim() ? token.trim() : null
	},

	setToken: (token: string) => {
		localStorage.setItem('auth_token', token)
	},
	clearAuth: () => {
		localStorage.removeItem('student')
	},
}
