import cn from 'clsx'
import { X } from 'lucide-react'
import { useOutside } from '@/hooks/useOutside'
import { Badge } from '../Badge'

export interface IOption {
	value: string
	label: string
}

interface ISingleSelect {
	data: IOption[]
	onChange: (value: string) => void
	value: string
	isColorSelect?: boolean
}

export function SingleSelect({
	data,
	onChange,
	value,
	isColorSelect
}: ISingleSelect) {
	const { isShow, setIsShow, ref } = useOutside(false)
	const selectedOption = data.find(item => item.value === value)

	return (
		<div
			className={cn('relative min-w-36', { 'w-max': isColorSelect })}
			ref={ref}
		>
			<button
				onClick={e => {
					e.preventDefault()
					setIsShow(!isShow)
				}}
			>
				{value ? (
					<Badge
						variant={value}
						className='capitalize'
						style={isColorSelect ? { backgroundColor: value } : {}}
					>
						{selectedOption?.label || value}
					</Badge>
				) : (
					'Select'
				)}
			</button>

			{value && (
				<button
					className='absolute top-0 right-9 opacity-30 hover:opacity-100 transition-opacity'
					onClick={e => {
						e.preventDefault()
						onChange('')
					}}
				>
					<X size={16} />
				</button>
			)}
			{isShow && (
				<div className='absolute w-full p-2.5 left-0 bg-sidebar rounded-lg shadow z-10'>
					{data.map(item => (
						<button
							key={item.value}
							className='block mb-4 last:mb-0 capitalize rounded-lg'
							style={isColorSelect ? { backgroundColor: item.value } : {}}
							onClick={() => {
								onChange(item.value)
								setIsShow(false)
							}}
						>
							{item.label}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
