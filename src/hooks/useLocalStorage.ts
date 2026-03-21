import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

interface IUseLocalStorage<T> {
	key: string
	defaultValue: T
}

export function useLocalStorage<T>({ key, defaultValue }: IUseLocalStorage<T>) {
	const [isLoading, setIsLoading] = useState(true)
	const isMounted = useRef(false)
	const [value, setValue] = useState<T>(defaultValue)
	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key)
			if (item) {
				setValue(JSON.parse(item))
			}
		} catch (e) {
			console.error('Error loading from localStorage', e)
		} finally {
			setIsLoading(false)
		}
		return () => {
			isMounted.current = false
		}
	}, [key])

	useEffect(() => {
		if (isMounted.current) {
			window.localStorage.setItem(key, JSON.stringify(value))
		}
	}, [key, value])

	return [value, setValue, isLoading]
}
