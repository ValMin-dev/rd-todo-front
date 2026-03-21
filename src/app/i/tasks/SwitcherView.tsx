'use client'

import cn from 'clsx'
import { Kanban, ListTodo } from 'lucide-react'
import { TypeView } from './TasksView'

interface ISwetcherView {
	type: TypeView
	setType: (type: TypeView) => void
}

export function SwitcherView({ type, setType }: ISwetcherView) {
	return (
		<div className='flex items-center gap-4 mb-5'>
			<button
				onClick={() => setType('list')}
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'kanban'
				})}
			>
				<ListTodo />
				List
			</button>
			<button
				onClick={() => setType('kanban')}
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'list'
				})}
			>
				<Kanban />
				Board
			</button>
		</div>
	)
}
