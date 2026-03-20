'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'
import { TypeUserForm } from '@/types/auth.types'
import { useProfile } from '@/hooks/useProfile'
import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'

export default function Settings() {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})
	const { data, isLoading } = useProfile()
	useInitialData(reset)
	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data
		mutate({
			...rest,
			password: password || undefined
		})
	}

	return isLoading ? (
		<Loader />
	) : (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 gap-10'>
					<div>
						<Field
							extra='mb-4'
							id='email'
							label='Email:'
							placeholder='enter email'
							type='email'
							{...register('email', { required: 'Email is required' })}
						/>
						<Field
							id='name'
							label='Name:'
							placeholder='enter name'
							{...register('name', { required: 'Name is required' })}
							extra='mb-4'
						/>

						<Field
							id='password'
							label='Password:'
							placeholder='enter new password'
							type='password'
							{...register('password')}
							extra='mb-4'
						/>
					</div>
					<div>
						<Field
							id='workInterval'
							label='Work Interval (min):'
							placeholder='enter work interval'
							isNumber
							{...register('workInterval', { valueAsNumber: true })}
							extra='mb-4'
						/>
						<Field
							id='breakInterval'
							label='Break Interval (min):'
							placeholder='enter break interval'
							isNumber
							{...register('breakInterval', { valueAsNumber: true })}
							extra='mb-4'
						/>
						<Field
							id='intervalNumber'
							label='Interval Number (max 10):'
							placeholder='enter interval number'
							isNumber
							{...register('intervalsCount', { valueAsNumber: true })}
							extra='mb-4'
						/>
					</div>
				</div>
				<Button
					type='submit'
					className='bg-primary text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-primary/50'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	)
}
