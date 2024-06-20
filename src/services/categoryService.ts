import instance, { instanceTest } from '@/api/axios'
import { ICategory } from '@/common/types/category.interface'

export const getListCategory = () => {
  return instance.get(`categories`)
}

export const getCategory = (id: string) => {
  return instance.get(`categories/${id}`)
}

export const createCategory = (payload) => {
  return instanceTest.post(`category/create`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
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

export const searchCategory = (q: string) => {
  return instance.get('categories', {
    params: {
      name: q
    }
  })
}
