import instance from '@/api/axios'
import { IPostCategory } from '@/common/types/category.interface'

export const getListPostCategory = () => {
  return instance.get(`postCategories`)
}

export const getPostCategory = (id: string) => {
  return instance.get(`postCategories/${id}`)
}

export const createPostCategory = (payload: IPostCategory) => {
  return instance.post(`postCategories`, payload)
}

export const updatePostCategory = (payload: IPostCategory) => {
  const { id, ...data } = payload
  return instance.put(`postCategories/${id}`, data)
}

export const deletePostCategory = (id: string) => {
  return instance.delete(`postCategories/${id}`)
}

export const searchPostCategory = (q: string) => {
  return instance.get('postCategories', {
    params: {
      name: q
    }
  })
}
