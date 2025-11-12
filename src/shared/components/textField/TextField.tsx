import { useId, type ComponentProps } from 'react'

type Props = ComponentProps<'input'> & {
	label?: string
	disabled?: boolean
	errorMessage?: string
}

export const TextField = ({ disabled, label, errorMessage, ...restProps }: Props) => {
	const inputId = useId()

	return (
		<div className="space-1 relative py-1">
			{label && (
				<label htmlFor={inputId} className=" capitalize text-sm">
					{label}
				</label>
			)}

			<input
				id={inputId}
				disabled={disabled}
				{...restProps}
				className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			/>
			{errorMessage && (
				<p role="alert" className="text-red-700 text-sm absolute -bottom-2.5 right-0">
					{errorMessage}
				</p>
			)}
		</div>
	)
}
