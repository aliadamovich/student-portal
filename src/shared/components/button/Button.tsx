import type { ComponentProps } from 'react'

type Props = ComponentProps<'button'> & {}

export const Button = ({ children }: Props) => {
	return (
		<button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer">
			{children}
		</button>
	)
}
