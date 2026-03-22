'use client'

import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Loader from '@/components/ui/Loader'
import { TimeBlock } from './TimeBlock'
import styles from './TimeBlocking.module.scss'
import { calcLeftTime } from './calc-left-time'
import { useTimeBlockDnd } from './hooks/useTimeBlockDnd'
import { useTimeBlocks } from './hooks/useTimeBlocks'

export function TimeBlockingList() {
	const { items, setItems, isLoading } = useTimeBlocks()
	const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems)
	const { hoursLeft } = calcLeftTime(items)

	if (isLoading) return <Loader />

	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div>
					<SortableContext
						items={items?.map(item => item.id) || []}
						strategy={verticalListSortingStrategy}
					>
						{items?.length ? (
							items.map(item => (
								<TimeBlock
									key={item.id}
									item={item}
								/>
							))
						) : (
							<div>No time blocks available</div>
						)}
					</SortableContext>
				</div>
			</DndContext>
			<div className={styles.hoursLeft}>
				<span>Hours left: </span>
				<span>{hoursLeft}</span>
			</div>
		</div>
	)
}
