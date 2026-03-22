'use client'

import { FormProvider, useForm } from 'react-hook-form'
import type { TypeTimeBlockState } from '@/types/time-block.types'
import { TimeBlockingList } from './TimeBlockingList'
import { TimeBlockingForm } from './form/TimeBlockingFrom'
import { COLORS } from './form/colors.data'

export function TimeBlocking() {
	const methods = useForm<TypeTimeBlockState>({
		defaultValues: {
			name: '',
			duration: 0,
			order: 1,
			color: COLORS[COLORS.length - 1]
		}
	})

	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
				<TimeBlockingList />
				<TimeBlockingForm />
			</div>
		</FormProvider>
	)
}
