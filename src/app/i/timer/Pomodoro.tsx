'use client'

import { Pause, Play, RefreshCcw } from 'lucide-react'
import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { formatTime } from './format-time'
import { useCreateSession } from './hooks/useCreateSession'
import { useDeleteSession } from './hooks/useDeleteSession'
import { useTimer } from './hooks/useTimer'
import { useTimerActions } from './hooks/useTimerActions'
import { useTodaySession } from './hooks/useTodaySession'
import { PomodoroRounds } from './rounds/PomodoroRounds'

export function Pomodoro() {
	const timerState = useTimer()
	const { mutate, isPending } = useCreateSession()
	const { isLoading, sessionResponse, workInterval } =
		useTodaySession(timerState)
	const { deleteSession, isDeletePending } = useDeleteSession(() => {
		timerState.setSecondsLeft(workInterval * 60)
	})
	const rounds = sessionResponse?.data.rounds || []
	const actions = useTimerActions({ ...timerState, rounds })

	return (
		<div className='relative w-80 text-center'>
			{!isLoading && (
				<div className='text-7xl font-semibold'>
					{formatTime(timerState.secondsLeft)}
				</div>
			)}
			{isLoading ? (
				<Loader />
			) : sessionResponse?.data ? (
				<>
					<PomodoroRounds
						rounds={rounds}
						activeRound={timerState.activeRound}
						nextRoundHandler={actions.nextRoundHandler}
						prevRoundHandler={actions.prevRoundHandler}
					/>
					<button
						onClick={() => {
							timerState.isRunning
								? actions.pauseHandler()
								: actions.playHandler()
						}}
						disabled={actions.isUpdateRoundPending}
						className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
					>
						{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button>

					<button
						onClick={() => {
							timerState.setIsRunning(false)
							deleteSession(sessionResponse.data.id)
						}}
						className='absolute top-0 right-0 opacity-50 hover:opacity-100 transition-opacity'
					>
						<RefreshCcw size={20} />
					</button>
				</>
			) : (
				<Button
					onClick={() => mutate()}
					className='mt-1'
					disabled={isPending}
				>
					Start Session
				</Button>
			)}
		</div>
	)
}
