import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TypePomodoroRoundState } from '@/types/pomodoro.types'
import { pomodoroService } from '@/services/pomodoro.service'

interface IUseUpdateRounds {
	id: string
	data: TypePomodoroRoundState
}

export function useUpdateRounds() {
	const queryClient = useQueryClient()

	const { mutate: updateRounds, isPending: isUpdateRoundPending } = useMutation(
		{
			mutationKey: ['update round'],
			mutationFn: ({ id, data }: IUseUpdateRounds) =>
				pomodoroService.updateRound(id, data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['get today session'] })
			}
		}
	)
	return { updateRounds, isUpdateRoundPending }
}
