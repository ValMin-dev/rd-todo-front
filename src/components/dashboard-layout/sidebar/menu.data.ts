import {
	Calendar,
	CheckSquare,
	Clock,
	Home,
	Repeat,
	Settings
} from 'lucide-react'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import type { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		label: 'Home',
		href: DASHBOARD_PAGES.HOME,
		icon: Home
	},
	{
		label: 'Tasks',
		href: DASHBOARD_PAGES.TASKS,
		icon: CheckSquare
	},
	{
		label: 'Habits',
		href: DASHBOARD_PAGES.HABITS,
		icon: Repeat
	},
	{
		label: 'Timer',
		href: DASHBOARD_PAGES.TIMER,
		icon: Clock
	},
	{
		label: 'Time Blocking',
		href: DASHBOARD_PAGES.TIME_BLOCKING,
		icon: Calendar
	},
	{
		label: 'Settings',
		href: DASHBOARD_PAGES.SETTINGS,
		icon: Settings
	}
]
