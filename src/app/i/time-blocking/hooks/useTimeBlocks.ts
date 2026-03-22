import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import type { ITimeBlockResponse } from '@/types/time-block.types'
import { timeBlockService } from '@/services/time-block.service'

function sortByOrder(items: ITimeBlockResponse[] | undefined) {
	if (!items) return undefined

	return [...items].sort((a, b) => a.order - b.order)
}

export const useTimeBlocks = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['time-blocks'],
		queryFn: () => timeBlockService.getTimeBlocks()
	})

	const [items, setItems] = useState<ITimeBlockResponse[] | undefined>(
		sortByOrder(data?.data)
	)

	useEffect(() => {
		setItems(sortByOrder(data?.data))
	}, [data?.data])

	return { items, setItems, isLoading }
}
