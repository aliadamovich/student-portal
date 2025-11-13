import { useGetCurrentTermQuery, useGetTermCoursesQuery } from 'features/courses/api/coursesApi'
import { CourseCard } from 'features/courses/ui/CourseCard'
import { mockCoursesResponse } from 'test/mocks/mockData'

export const CoursesList = () => {
	const { data: term } = useGetCurrentTermQuery()
	const termId = term?.id ?? ''
	const { data } = useGetTermCoursesQuery(termId, { skip: !termId })
	const courses = data?.courses || mockCoursesResponse.courses

	if (courses?.length === 0) {
		return <div className="text-gray-600">No courses available for this term.</div>
	}

	return (
		<div className="grid gap-4">
			{courses?.map((course) => (
				<CourseCard key={course.id} course={course} />
			))}
		</div>
	)
}
