import cn from 'clsx'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { X } from 'lucide-react'
import { useState } from 'react'
import { DayPicker, type SelectSingleEventHandler } from 'react-day-picker'
import { useOutside } from '@/hooks/useOutside'

// import { formatCaption } from './DatePickerCaption'

dayjs.extend(LocalizedFormat)

interface IDatePicker {
	value: string
	onChange: (date: string) => void
	position?: 'left' | 'right'
}

export function DatePicker({
	onChange,
	value,
	position = 'left'
}: IDatePicker) {
	const [selected, setSelected] = useState<Date | null>(null)
	const { isShow, setIsShow, ref } = useOutside(false)

	const handleDaySelect: SelectSingleEventHandler = date => {
		const ISOdate = date?.toISOString() || ''
		setSelected(date ?? null)
		if (ISOdate) {
			onChange(ISOdate)
			setIsShow(false)
		} else {
			onChange('')
		}
	}

	return (
		<div
			ref={ref}
			className={cn('date-picker relative', position)}
		>
			<button onClick={() => setIsShow(!isShow)}>
				{value ? dayjs(value).format('L') : 'Select date'}
			</button>

			{isShow && (
				<div
					className={cn(
						'absolute p-2.5 slide bg-sidebar z-10 shadow rounded-lg',
						position === 'left' ? '-left-4' : '-right-4'
					)}
					style={{
						top: 'calc(100% + .7rem)'
					}}
				>
					<DayPicker
						mode='single'
						fromYear={2025}
						toYear={2056}
						initialFocus={isShow}
						defaultMonth={selected || undefined}
						onSelect={handleDaySelect}
						selected={selected || undefined}
						weekStartsOn={1}
						// formatters={{ formatCaption }}
					/>
				</div>
			)}

			{value && (
				<button
					onClick={() => onChange('')}
					className='absolute -top-2 -right-4 opacity-30 hover:opacity-100 transition-opacity'
				>
					<X size={16} />
				</button>
			)}
		</div>
	)
}
