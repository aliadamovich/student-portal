export type RegistrationsResonse = {
	registrations: Registration[]
}

export type Registration = {
	id: string
	course: {
		id: string
		name: string
	}
	term: string
}

export type RegistrationRequest = {
	courseId: string
	termId: string
	studentId: string
}
