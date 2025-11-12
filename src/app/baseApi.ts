import {
	createApi,
	fetchBaseQuery,
	type BaseQueryFn,
	type FetchArgs,
	type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { authManager } from 'features/auth/lib/authManager'
import { handleError } from 'shared/utils/handleErrors'

const publicEndpoints = ['login'] // I would add 'register', 'forgotPassword' api requests

const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: '/api',
		prepareHeaders: (headers, { endpoint }) => {
			if (endpoint && publicEndpoints.includes(endpoint)) {
				return headers
			}

			const token = authManager.getToken()
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}

			return headers
		},
	})

	const result = await baseQuery(args, api, extraOptions)

	// errors
	handleError(result)

	return result
}

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: baseQueryWithErrorHandling,
	endpoints: () => ({}),
})
