import { type Dispatch, type SetStateAction } from 'react'
import type { ITaskResponse } from '@/types/task.tipes'

interface IKanbanAddCardInput {
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
	filterDate?: string
}

export function KanbanAddCardInput({
	setItems,
	filterDate
}: IKanbanAddCardInput) {
	const addCard = () => {
		setItems(prev => {
			if (!prev) return

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})
	}
	return (
		<div className='mt-5'>
			<button
				onClick={addCard}
				className='italic opacity-40 text-sm'
			>
				+ Add Task
			</button>
		</div>
	)
}
