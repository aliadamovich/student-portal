type Props = {
	size?: 'sm' | 'md'
}

const sizeMap = {
	sm: 'text-base',
	md: 'text-3xl',
} as const

export const Logo = ({ size = 'sm' }: Props) => {
	return <div className={`font-bold text-slate-800 ${sizeMap[size]}`}>LOGO</div>
}
