import instance from '@/api/axios'
import { IPostCategory } from '@/common/types/category.interface'

export const getListPostCategory = () => {
  return instance.get(`post_category`)
}

export const getPostCategory = (id: string) => {
  return instance.get(`post_category/${id}`)
}

export const createPostCategory = (payload: IPostCategory) => {
  return instance.post(`post_category`, payload)
}

export const updatePostCategory = (payload: IPostCategory) => {
  const { id, ...data } = payload
  return instance.put(`post_category/${id}`, data)
}

export const deletePostCategory = (id: string) => {
  return instance.delete(`post_category/${id}`)
}

export const searchPostCategory = (q: string) => {
  return instance.get('post_category', {
    params: {
      name: q
    }
  })
}
