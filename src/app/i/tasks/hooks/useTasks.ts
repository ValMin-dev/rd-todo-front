import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ITaskResponse } from '@/types/task.tipes'
import { taskService } from '@/services/task.service'

export function useTasks() {
	const { data } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks()
	})

	const [items, setItems] = useState<ITaskResponse[] | undefined>(data)

	useEffect(() => {
		if (data) {
			setItems(data)
		}
	}, [data])

	return { items, setItems }
}
