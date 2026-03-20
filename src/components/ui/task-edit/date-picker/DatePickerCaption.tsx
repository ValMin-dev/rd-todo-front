import dayjs from 'dayjs'
import type { ReactNode } from 'react'

const seasonEmoji: Record<string, string> = {
	spring: '🌸',
	summer: '☀️',
	autumn: '🍂',
	winter: '❄️'
}

const getSeason = (month: Date): keyof typeof seasonEmoji => {
	const monthNumber = month.getMonth() + 1

	if (monthNumber >= 3 && monthNumber <= 5) return 'spring'
	if (monthNumber >= 6 && monthNumber <= 8) return 'summer'
	if (monthNumber >= 9 && monthNumber <= 11) return 'autumn'
	else return 'winter'
}
export const formatCaption = (month: Date): ReactNode => {
	const season = getSeason(month)

	return (
		<>
			<span
				role='img'
				className='mr-2'
				aria-label={season}
			>
				{seasonEmoji[season]}
			</span>
			{dayjs(month).format('MMMM')}
		</>
	)
}
