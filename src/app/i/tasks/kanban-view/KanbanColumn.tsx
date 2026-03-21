import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Dispatch, SetStateAction } from 'react'
import { ITaskResponse } from '@/types/task.tipes'
import { FILTERS } from '../columns.data'
import { filterTasks } from '../filter-tasks'
import { KanbanAddCardInput } from './KanbanAddCardInput'
import { KanbanCard } from './KanbanCard'
import styles from './KanbanView.module.scss'

interface IKanbanColumn {
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
	value: string
	label: string
}

export function KanbanColumn({ items, setItems, value, label }: IKanbanColumn) {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.column}>
						<div className={styles.columnHeader}>{label}</div>
						{filterTasks(items, value)?.map((item, index) => (
							<Draggable
								key={item.id}
								draggableId={item.id}
								index={index}
							>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className='relative'
									>
										<KanbanCard
											item={item}
											setItems={setItems}
											key={item.id}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
						{value !== 'completed' && !items?.some(item => !item.id) && (
							<KanbanAddCardInput
								setItems={setItems}
								filterDate={
									FILTERS[value] ? FILTERS[value].format() : undefined
								}
							/>
						)}
					</div>
				</div>
			)}
		</Droppable>
	)
}
