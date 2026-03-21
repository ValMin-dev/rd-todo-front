'use client'

import Loader from '@/components/ui/Loader'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { SwitcherView } from './SwitcherView'
import KanbanView from './kanban-view/KanbanView'
import ListView from './list-view/ListView'

export type TypeView = 'list' | 'kanban'

export default function TasksView() {
	const [view, setView, isLoading] = useLocalStorage<TypeView>({
		key: 'tasks-view',
		defaultValue: 'list'
	})

	if (isLoading) return <Loader />

	return (
		<div>
			<SwitcherView
				setType={setView as (type: TypeView) => void}
				type={view as TypeView}
			/>
			{view === 'list' ? <ListView /> : <KanbanView />}
		</div>
	)
}
