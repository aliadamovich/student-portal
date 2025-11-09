import { baseApi } from 'app/baseApi'

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation({
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
