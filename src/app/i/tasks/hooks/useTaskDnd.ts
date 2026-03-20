import { DropResult } from '@hello-pangea/dnd'
import { FILTERS } from '../columns.data'
import { useUpdateTask } from './useUpdateTask'

export function useTaskDnd() {
	const { updateTask } = useUpdateTask()

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return

		const { source, destination, draggableId } = result
		if (source.droppableId === destination.droppableId) return

		if (destination.droppableId === 'completed') {
			updateTask({ id: draggableId, data: { isCompleted: true } })
			return
		}
		const newCreatedAt = FILTERS[destination.droppableId].format()

		updateTask({
			id: result.draggableId,
			data: {
				isCompleted: false,
				createdAt: newCreatedAt
			}
		})
	}
	return { onDragEnd }
}
