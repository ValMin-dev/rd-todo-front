'use client'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import type { ITimerState } from '../timer.types'
import { useLoadSettings } from './useLoadSettings'
import { pomodoroService } from '@/services/pomodoro.service'

export function useTodaySession({
	setActiveRound,
	setSecondsLeft
}: ITimerState) {
	const { workInterval } = useLoadSettings()
	const {
		data: sessionResponse,
		isLoading,
		isSuccess
	} = useQuery({
		queryKey: ['get today session'],
		queryFn: () => pomodoroService.getTodaySession()
	})

	const rounds = sessionResponse?.data.rounds

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted)
			setActiveRound(activeRound)
			if (activeRound && activeRound?.totalSeconds !== 0) {
				setSecondsLeft(workInterval * 60 - activeRound.totalSeconds)
			}
		}
	}, [isSuccess, rounds])

	return { sessionResponse, isLoading, workInterval }
}
