import type { Course } from 'features/courses/api/coursesApi.types'
import { useRegistration } from 'features/registrations/model/useRegistration'
import { Button } from 'shared/components/button'

type Props = {
	course: Course
}

export const CourseCard = ({ course }: Props) => {
	const { canRegister, handleRegister, isRegistered, missingPrereqs, isLoading } = useRegistration(course)

	const cannotRegisterReason = () => {
		if (isRegistered) return 'Already registered '
		if (!canRegister) return 'Prerequisites not met'
		return null
	}

	const reason = cannotRegisterReason()
	const isButtonVisible = !isRegistered && canRegister

	return (
		<div className=" flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border-slate-500 flex-wrap">
			<div>
				<h3 className="text-xl font-semibold capitalize">{course.name}</h3>

				<div className="mb-3">
					<p className="text-sm font-medium text-gray-700">Prerequisites:</p>
					{course.prereqs.length > 0 ? (
						<ul className="list-disc list-inside text-sm text-gray-600 capitalize">
							{course.prereqs.map((prereqId) => (
								<li key={prereqId.id}>{prereqId.name}</li>
							))}
						</ul>
					) : (
						<span>None</span>
					)}
				</div>

				{missingPrereqs.length > 0 && (
					<div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
						<p className="text-sm text-yellow-800 capitalize">
							Missing prerequisites: {missingPrereqs.map((p) => p.name).join(', ')}
						</p>
					</div>
				)}
			</div>

			{isButtonVisible && <Button onClick={handleRegister}> {isLoading ? 'Registering...' : 'Register'}</Button>}
			{reason && <p className="bg-slate-200 p-1 rounded">{reason}</p>}
		</div>
	)
}
