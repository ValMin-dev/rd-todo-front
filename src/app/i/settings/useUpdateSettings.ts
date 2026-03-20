import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TypeUserForm } from '@/types/auth.types'
import { userService } from '@/services/user.service'

export function useUpdateSettings() {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['updateSettings'],
		mutationFn: (data: TypeUserForm) => userService.update(data),
		onSuccess() {
			toast.success('Settings updated successfully')
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		}
	})
	return { mutate, isPending }
}
