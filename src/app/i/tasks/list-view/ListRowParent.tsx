import { Draggable, Droppable } from '@hello-pangea/dnd'
import { Dispatch, SetStateAction } from 'react'
import { ITaskResponse } from '@/types/task.tipes'
import { FILTERS } from '../columns.data'
import { filterTasks } from '../filter-tasks'
import { ListAddRowInput } from './ListAddRowInput'
import { ListRow } from './ListRow'
import styles from './ListView.module.scss'

interface IListRowParent {
	items: ITaskResponse[] | undefined
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
	value: string
	label: string
}

export function ListRowParent({
	items,
	setItems,
	value,
	label
}: IListRowParent) {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.colHeading}>
						<div className='w-full'>{label}</div>
					</div>
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
									<ListRow
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
						<ListAddRowInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
				</div>
			)}
		</Droppable>
	)
}
