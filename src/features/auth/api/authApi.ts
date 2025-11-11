import { baseApi } from 'app/baseApi'
import type { LoginResponse, RequestBody } from 'features/auth/api/authApi.types'

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<LoginResponse, RequestBody>({
			query: (data) => {
				return {
					url: 'login',
					method: 'POST',
					body: data,
				}
			},
		}),
	}),
})

export const { useLoginMutation } = authApi
