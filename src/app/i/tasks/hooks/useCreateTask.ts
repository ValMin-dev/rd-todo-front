import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeTaskState } from '@/types/task.tipes'
import { taskService } from '@/services/task.service'

export function useCreateTask() {
	const queryClient = useQueryClient()

	const { mutate: createTask } = useMutation({
		mutationKey: ['createTask'],
		mutationFn: (data: TypeTaskState) => taskService.createTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			})
		}
	})

	return { createTask }
}
