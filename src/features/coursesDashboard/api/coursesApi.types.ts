export type Term = {
	id: string
	name: string
	startDate: string
	endDate: string
}

export type Course = {
	id: string
	name: string
	prereqs: Prereqs[]
}

export type Prereqs = Omit<Course, 'prereqs'>
