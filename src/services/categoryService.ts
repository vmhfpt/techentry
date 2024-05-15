import instance from '@/api/axios'
import { ICategory } from '@/common/types/category.interface'

export const getListCategory = () => {
  return instance.get(`categories`)
}

export const getCategory = (id: string) => {
  return instance.get(`categories/${id}`)
}

export const createCategory = (payload: ICategory) => {
  return instance.post(`categories`, payload)
}

export const updateCategory = (payload: ICategory) => {
  const { id, ...data } = payload
  return instance.put(`categories/${id}`, data)
}

export const changeStatusCategory = (id: string, status: boolean) => {
  return instance.patch(`categories/${id}`, { is_delete: status })
}

export const deleteCategory = (id: string) => {
  return instance.delete(`categories/${id}`)
}
