export type LoginResponse = {
	student: {
		id: string
		username: string
	}
	token: string
}

export type RequestBody = {
	username: string
	password: string
}

export type ApiError = {
	data: {
		message: string
	}
	status: number
}
