import type { FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query/react'

export const handleError = (result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>) => {
	let error = 'Some error occurred'

	if (result.error) {
		switch (result.error.status) {
			case 'FETCH_ERROR':
			case 'PARSING_ERROR':
			case 'CUSTOM_ERROR':
				error = result.error.error
				break

			case 403:
				error = 'No access rights'
				break

			case 401:
				error = (result.error.data as { message: string }).message || 'Unauthorized. Please sign in again'
				break

			case 400:
				error = (result.error.data as { message: string }).message
				break

			default:
				error = JSON.stringify(result.error)
				break
		}
	}

	// we could eather dispatch eror to RTK state (in App slice) or setting error straight to toastify library
	// api.dispatch(setAppError(error))
	// toat.error(error)
	console.log(error)
}
