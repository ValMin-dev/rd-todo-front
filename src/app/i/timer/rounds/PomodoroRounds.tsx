'use client'

import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IPomodoroRoundResponse } from '@/types/pomodoro.types'
import styles from './PomodoroRounds.module.scss'

interface IPomodoroRounds {
	rounds: IPomodoroRoundResponse[] | undefined
	nextRoundHandler: () => void
	prevRoundHandler: () => void
	activeRound: IPomodoroRoundResponse | undefined
}

export function PomodoroRounds({
	rounds,
	nextRoundHandler,
	prevRoundHandler,
	activeRound
}: IPomodoroRounds) {
	const isCanPrevRound = rounds
		? rounds.some(round => round.isCompleted)
		: false
	const isCanNextRound = rounds ? !rounds[rounds.length - 1].isCompleted : false

	return (
		<div className={styles.container}>
			<button
				disabled={!isCanPrevRound}
				onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
				className={cn(styles.button, !isCanPrevRound && styles.disabled)}
			>
				<ChevronLeft size={20} />
			</button>
			<div className={styles.roundsContainer}>
				{rounds?.map((round, index) => (
					<div
						key={index}
						className={cn(
							styles.round,
							round.isCompleted && styles.completed,
							activeRound?.id === round.id && styles.active
						)}
					/>
				))}
			</div>
			<button
				disabled={!isCanNextRound}
				onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
				className={cn(styles.button, !isCanNextRound && styles.disabled)}
			>
				<ChevronRight size={20} />
			</button>
		</div>
	)
}
