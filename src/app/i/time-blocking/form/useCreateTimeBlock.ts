import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypeTimeBlockState } from '@/types/time-block.types'
import { timeBlockService } from '@/services/time-block.service'

export function useCreateTimeBlock() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['create time-block'],
		mutationFn: (data: TypeTimeBlockState) =>
			timeBlockService.createTimeBlock(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['time-blocks'] })
		}
	})

	return { createTimeBlock: mutate, isPending }
}
