import { IPomodoroRoundResponse } from '@/types/pomodoro.types'
import type { ITimerState } from '../timer.types'
import { useLoadSettings } from './useLoadSettings'
import { useUpdateRounds } from './useUpdateRounds'

type TypeUseTimerActions = ITimerState & {
	rounds?: IPomodoroRoundResponse[]
}
export function useTimerActions({
	secondsLeft,
	activeRound,
	setIsRunning,
	setActiveRound,
	rounds
}: TypeUseTimerActions) {
	const { workInterval } = useLoadSettings()
	const { updateRounds, isUpdateRoundPending } = useUpdateRounds()
	const pauseHandler = () => {
		const totalSeconds = workInterval * 60 - secondsLeft
		setIsRunning(false)

		if (activeRound?.id)
			updateRounds({
				id: activeRound?.id,
				data: {
					totalSeconds,
					isCompleted: totalSeconds >= workInterval * 60
				}
			})
	}

	const nextRoundHandler = () => {
		if (!activeRound?.id) return

		updateRounds({
			id: activeRound.id,
			data: {
				totalSeconds: workInterval * 60,
				isCompleted: true
			}
		})
	}
	const playHandler = () => {
		setIsRunning(true)
	}

	const prevRoundHandler = () => {
		const lastCompetedRound = rounds
			?.filter(round => round.isCompleted)
			.slice(-1)[0]
		if (!lastCompetedRound?.id) return

		updateRounds({
			id: lastCompetedRound.id,
			data: {
				totalSeconds: 0,
				isCompleted: false
			}
		})
		setActiveRound(lastCompetedRound)
	}
	return {
		isUpdateRoundPending,
		pauseHandler,
		nextRoundHandler,
		prevRoundHandler,
		playHandler
	}
}
