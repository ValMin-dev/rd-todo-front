import { GanttChartSquare } from 'lucide-react'
import Link from 'next/link'
import { COLORS } from '@/constants/color.constants'
import { SITE_NAME } from '@/constants/seo.constants'
import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'

export function Sidebar() {
	return (
		<aside className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between'>
			<div>
				<Link
					href='/'
					className='flex item-center gap-2.5 p-layout border-b border-b-border'
				>
					<GanttChartSquare
						color={COLORS.primary}
						size={40}
					/>
					<span className='text-2xl font-bold'>єШЕКЕЛЬ</span>
				</Link>

				<div className='p-3 relative'>
					<LogoutButton />
					{MENU.map(item => (
						<MenuItem
							key={item.href}
							item={item}
						/>
					))}
				</div>
			</div>

			<footer className=' opacity-40 font-normal text-center p-layout'>
				2026 @ {SITE_NAME} <br />
				All rights reserved
			</footer>
		</aside>
	)
}
