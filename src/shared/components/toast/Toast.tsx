import { useEffect } from 'react'

type ToastProps = {
	message: string
	onClose: () => void
	duration?: number
}

export const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
	useEffect(() => {
		const timer = setTimeout(onClose, duration)
		return () => clearTimeout(timer)
	}, [onClose, duration])

	return (
		<div
			role="alert"
			aria-live="polite"
			style={{
				position: 'fixed',
				bottom: '20px',
				right: '20px',
				background: '#f87171',
				color: 'white',
				padding: '10px 16px',
				borderRadius: '8px',
				boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
			}}
		>
			{message}
		</div>
	)
}
