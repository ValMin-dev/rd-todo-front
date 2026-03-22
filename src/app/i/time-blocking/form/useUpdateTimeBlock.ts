import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeTimeBlockState } from '@/types/time-block.types'
import { timeBlockService } from '@/services/time-block.service'

interface IUpdateTimeBlockPayload {
	id: string
	data: TypeTimeBlockState
}

export function useUpdateTimeBlock() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update time-block'],
		mutationFn: ({ id, data }: IUpdateTimeBlockPayload) =>
			timeBlockService.updateTimeBlock(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['time-blocks'] })
		}
	})

	return { updateTimeBlock: mutate, isPending }
}
