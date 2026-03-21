export function formatTime(setSecondsLeft: number) {
	const minutes = Math.floor(setSecondsLeft / 60)
	const seconds = setSecondsLeft % 60

	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
