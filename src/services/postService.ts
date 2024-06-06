import instance from '@/api/axios'
import { IPost } from '@/common/types/post.interface'

export const getListPost = () => {
  return instance.get(`posts`)
}

export const getPost = (id: string) => {
  return instance.get(`posts/${id}`)
}

export const createPost = (payload: IPost) => {
  return instance.post(`posts`, payload)
}

export const updatePost = (payload: IPost) => {
  const { id, ...data } = payload
  return instance.put(`posts/${id}`, data)
}

export const deletePost = (id: string) => {
  return instance.delete(`posts/${id}`)
}

export const searchPost = (q: string) => {
  return instance.get('posts', {
    params: {
      title: q
    }
  })
}
