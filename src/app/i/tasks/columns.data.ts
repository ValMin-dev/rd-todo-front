import dayjs, { type Dayjs } from 'dayjs'
import 'dayjs/locale/ru'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

export const FILTERS: Record<string, Dayjs> = {
	today: dayjs().startOf('day'),
	tomorrow: dayjs().add(1, 'day').startOf('day'),
	this_week: dayjs().startOf('isoWeek'),
	next_week: dayjs().add(1, 'week').startOf('day'),
	later: dayjs().add(2, 'week').startOf('day'),

	completed: dayjs()
}

export const COLUMNS = [
	{
		label: 'Today',
		value: 'today'
	},
	{
		label: 'Tomorrow',
		value: 'tomorrow'
	},
	{
		label: 'This week',
		value: 'this_week'
	},
	,
	{
		label: 'Completed',
		value: 'completed'
	},
	{
		label: 'Next week',
		value: 'next_week'
	},
	{
		label: 'Later',
		value: 'later'
	}
]
