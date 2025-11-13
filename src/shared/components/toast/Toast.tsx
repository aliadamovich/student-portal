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
			className="fixed bottom-5 right-5 bg-red-400 text-white px-4 py-2 rounded-lg shadow-md"
		>
			{message}
		</div>
	)
}
