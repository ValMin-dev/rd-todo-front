'use client'

import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import type { TypeTimeBlockState } from '@/types/time-block.types'
import { COLORS } from './colors.data'
import { useCreateTimeBlock } from './useCreateTimeBlock'
import { useUpdateTimeBlock } from './useUpdateTimeBlock'

export function TimeBlockingForm() {
	const { register, handleSubmit, control, watch, reset } =
		useFormContext<TypeTimeBlockState>()

	const existsId = watch('id')

	const { updateTimeBlock, isPending: isUpdatePending } = useUpdateTimeBlock()
	const { isPending: isCreatePending, createTimeBlock } = useCreateTimeBlock()

	const onSubmit: SubmitHandler<TypeTimeBlockState> = data => {
		const { color, id, ...rest } = data
		const dto: TypeTimeBlockState = {
			...rest,
			color: color || COLORS[COLORS.length - 1],
			duration: Number(rest.duration) || 0,
			order: rest.order || 1
		}

		if (id) {
			updateTimeBlock({ id, data: dto })
		} else {
			createTimeBlock(dto)
		}

		reset({
			color: COLORS[COLORS.length - 1],
			name: '',
			order: 1,
			duration: 0,
			id: undefined
		})
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-3/5'
		>
			<Field
				id='name'
				label='Name'
				placeholder='Enter Name'
				extra='mb-4'
				{...register('name', { required: true })}
			/>
			<Field
				id='duration'
				label='Duration'
				placeholder='Enter Duration'
				isNumber
				extra='mb-4'
				{...register('duration', { required: true, valueAsNumber: true })}
			/>

			<div>
				<span className='inline-block mb-1.5'>Color:</span>
				<Controller
					name='color'
					control={control}
					render={({ field: { onChange, value } }) => (
						<SingleSelect
							value={value || COLORS[COLORS.length - 1]}
							onChange={onChange}
							data={COLORS.map(item => ({ label: item, value: item }))}
						/>
					)}
				/>
			</div>
			<Button
				type='submit'
				className='mt-6'
				disabled={isCreatePending || isUpdatePending}
			>
				{existsId ? 'Update Time Block' : 'Create Time Block'}
			</Button>
		</form>
	)
}
