import debounce from 'lodash.debounce'
import { useCallback, useEffect } from 'react'
import { UseFormWatch } from 'react-hook-form'
import { TypeTaskState } from '@/types/task.tipes'
import { useCreateTask } from './useCreateTask'
import { useUpdateTask } from './useUpdateTask'

interface IUseTaskDebounce {
	watch: UseFormWatch<TypeTaskState>
	itemId: string
}

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {
	const { createTask } = useCreateTask()
	const { updateTask } = useUpdateTask()

	const debounceCreateTask = useCallback(
		debounce((formData: TypeTaskState) => {
			createTask(formData)
		}, 500),
		[]
	)

	const debounceUpdateTask = useCallback(
		debounce((formData: TypeTaskState) => {
			updateTask({ id: itemId, data: formData })
		}, 500),
		[]
	)

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority || undefined
				})
			} else {
				debounceCreateTask(formData)
			}
		})

		return () => {
			unsubscribe()
		}
	}, [watch, debounceUpdateTask, debounceCreateTask])

	return {}
}
