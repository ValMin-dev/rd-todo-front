import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'
import { TypeUserForm } from '@/types/auth.types'
import { useProfile } from '@/hooks/useProfile'

export const useInitialData = (reset: UseFormReset<TypeUserForm>) => {
	const { data, isSuccess } = useProfile()

	useEffect(() => {
		if (isSuccess && data) {
			reset({
				name: data?.user.name || '',
				email: data?.user.email || '',
				breakInterval: data?.user.breakInterval || 0,
				workInterval: data?.user.workInterval || 0,
				intervalsCount: data?.user.intervalsCount || 0
			})
		}
	}, [isSuccess])
}
