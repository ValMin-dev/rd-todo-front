import { ITaskResponse, TypeTaskState } from '@/types/task.tipes'
import { axiosWithAuth } from '@/api/interceprots'

class TaskService {
	private BASE_URL = '/user/tasks'

	async getTasks() {
		const response = await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL)
		return response.data
	}

	async createTask(data: TypeTaskState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)

		return response
	}

	async updateTask(id: string, data: TypeTaskState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteTask(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const taskService = new TaskService()
