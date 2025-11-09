type Props = {
	title: string
	description: string
	status: string
}

export const CourseCard = ({ title, description, status }: Props) => {
	return (
		<div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-2">
			<h3 className="text-lg font-semibold text-slate-800">{title}</h3>
			<p className="text-slate-600 text-sm flex-1">{description}</p>
			<div className="text-slate-500 text-sm mt-auto">👨‍🏫 {status}</div>
		</div>
	)
}
