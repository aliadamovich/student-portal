import type { ComponentProps } from 'react'

type Props = ComponentProps<'input'> & {}

export const TextField = ({ value, onChange, placeholder, type = 'text' }: Props) => {
	return (
		<input
			type={type}
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
		/>
	)
}
