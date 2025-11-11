import React from 'react'
import { cn } from 'shared/utils/cn'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant
	size?: ButtonSize
}
export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className, ...rest }) => {
	const base =
		'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

	const variants: Record<ButtonVariant, string> = {
		primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
		secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400',
	}

	const sizes: Record<ButtonSize, string> = {
		sm: 'px-3 py-1 text-sm',
		md: 'px-5 py-2 text-base',
		lg: 'px-7 py-3 text-lg',
	}

	return (
		<button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
			{children}
		</button>
	)
}
