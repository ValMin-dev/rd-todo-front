import cn from 'clsx'
import { GripVertical, Trash } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'
import type { ITaskResponse, TypeTaskState } from '@/types/task.tipes'
import Loader from '../../../../components/ui/Loader'
import { useDeleteTask } from '../hooks/useDeleteTask'
import { useTaskDebounce } from '../hooks/useTaskDebounce'
import styles from './KanbanView.module.scss'

interface IKanbanCard {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanCard({ item, setItems }: IKanbanCard) {
	const { register, control, watch } = useForm<TypeTaskState>({
		defaultValues: {
			name: item.name,
			priority: item.priority,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt
		}
	})

	const { deleteTask, isDeletePending } = useDeleteTask()

	useTaskDebounce({ watch, itemId: item.id })

	return (
		<div
			className={cn(
				styles.card,
				watch('isCompleted') ? styles.completed : '',
				'animation-opacity'
			)}
		>
			<div className={styles.cardHeader}>
				<button aria-bescribedby='todo-item'>
					<GripVertical className={styles.grip} />
				</button>
				<Controller
					control={control}
					name='isCompleted'
					render={({ field: { value, onChange } }) => {
						return (
							<Checkbox
								onChange={onChange}
								checked={value}
							/>
						)
					}}
				/>
				<TransparentField
					{...register('name')}
					placeholder='Task name'
				/>
			</div>
			<div className={styles.cardBody}>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							value={value || ''}
							position='left'
							onChange={onChange}
						/>
					)}
				/>
				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							value={value || ''}
							onChange={onChange}
							data={['low', 'medium', 'high'].map(item => ({
								value: item,
								label: item
							}))}
						/>
					)}
				/>
			</div>

			<div className={styles.cardActions}>
				<button
					onClick={() =>
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
					}
					className='opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}
