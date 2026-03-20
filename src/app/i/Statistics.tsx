'use client'

import Loader from '@/components/ui/Loader'
import { useProfile } from '@/hooks/useProfile'

export default function Statistics() {
	const { data, isLoading } = useProfile()

	return isLoading ? (
		<Loader />
	) : (
		<div className='grid grid-col-4 gap-12 mt-7'>
			{data?.stats?.length ? (
				data.stats.map(stat => (
					<div
						className='bg-border/5 rounded p-layout text-center hover:translate-y-3 transition-transform duration-500'
						key={stat.label}
					>
						<div className='text-xl'>{stat.label}</div>
						<div className='text-3xl font-semibold'>{stat.value}</div>
					</div>
				))
			) : (
				<div className='text-center text-zinc-500'>No statistics yet</div>
			)}
		</div>
	)
}
