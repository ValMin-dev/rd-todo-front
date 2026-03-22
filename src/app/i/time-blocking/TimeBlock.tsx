import { Edit, GripVertical, Trash } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import Loader from '@/components/ui/Loader'
import type {
	ITimeBlockResponse,
	TypeTimeBlockState
} from '@/types/time-block.types'
import styles from './TimeBlocking.module.scss'
import { useDeleteTimeBlock } from './hooks/useDeleteTimeBlock'
import { useTimeBlockSortable } from './hooks/useTimeBlockSortable'

export function TimeBlock({ item }: { item: ITimeBlockResponse }) {
	const { reset } = useFormContext<TypeTimeBlockState>()
	const { attributes, listeners, setNodeRef, style } = useTimeBlockSortable(
		item.id
	)
	const { deleteTimeBlock, isDeletePending } = useDeleteTimeBlock(item.id)

	return (
		<div
			ref={setNodeRef}
			style={style}
		>
			<div
				className={styles.block}
				style={{
					backgroundColor: item.color || 'transparent',
					height: `${item.duration / 2}0px`
				}}
			>
				<div className='flex items-center'>
					<button
						{...attributes}
						{...listeners}
						aria-describedby='time-block'
					>
						<GripVertical className={styles.grip} />
					</button>
					<div>
						{item.name}{' '}
						<i className='text-xs opacity-50'>{item.duration} min</i>
					</div>
					<div className={styles.actions}>
						<button
							type='button'
							className='opacity-50 transition-opacity hover:opacity-100 mr-2'
							onClick={() => {
								reset({
									id: item.id,
									color: item.color,
									duration: item.duration,
									name: item.name,
									order: item.order
								})
							}}
						>
							<Edit size={16} />
						</button>
						<button
							type='button'
							onClick={() => deleteTimeBlock()}
							className='opacity-50 transition-opacity hover:opacity-100'
						>
							{isDeletePending ? <Loader /> : <Trash size={16} />}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
