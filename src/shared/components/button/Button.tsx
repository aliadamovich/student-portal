import type { ComponentProps } from 'react'

type Props = ComponentProps<'button'> & {}

export const Button = ({ children, ...restProps }: Props) => {
	return (
		<button
			className="px-20 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
			{...restProps}
		>
			{children}
		</button>
	)
}
