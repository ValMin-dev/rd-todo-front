import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import type { ITaskResponse } from '@/types/task.tipes'
import { FILTERS } from './columns.data'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const filterTasks = (
	tasks: ITaskResponse[] | undefined,
	value: string
) => {
	switch (value) {
		case 'today':
			return tasks?.filter(
				task =>
					dayjs(task.createdAt).isSame(FILTERS.today, 'day') &&
					!task.isCompleted
			)
		case 'tomorrow':
			return tasks?.filter(
				task =>
					dayjs(task.createdAt).isSame(FILTERS.tomorrow, 'day') &&
					!task.isCompleted
			)
				case 'this_week':
			return tasks?.filter(
				task =>
							dayjs(task.createdAt).isSameOrAfter(FILTERS.this_week, 'day') &&
							dayjs(task.createdAt).isBefore(FILTERS.next_week, 'day') &&
					!task.isCompleted
			)
		case 'next_week':
			return tasks?.filter(
				task =>
					dayjs(task.createdAt).isSameOrAfter(FILTERS.next_week, 'day') &&
							dayjs(task.createdAt).isBefore(FILTERS.later, 'day') &&
					!task.isCompleted
			)
		case 'later':
			return tasks?.filter(
				task =>
							dayjs(task.createdAt).isSameOrAfter(FILTERS.later, 'day') &&
					!task.isCompleted
			)

		case 'completed':
			return tasks?.filter(task => task.isCompleted)
		default:
			return []
	}
}
