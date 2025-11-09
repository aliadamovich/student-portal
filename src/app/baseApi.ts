import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authManager } from 'features/auth/lib/authManager'

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL,
		prepareHeaders: (headers, { endpoint }) => {
			if (endpoint === 'login') {
				return headers
			}
			const token = authManager.getToken()

			if (token) headers.set('Authorization', `Bearer ${token}`)

			return headers
		},
	}),
	endpoints: () => ({}),
})
