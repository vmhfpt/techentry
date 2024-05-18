import instance from "@/api/axios"
import { IBanner } from "@/common/types/banner.interface"


export const getListBanner = () => {
  return instance.get(`slide`)
}

export const getBanner = (id: string) => {
  return instance.get(`slide/${id}`)
}

export const createBanner = (payload: IBanner) => {
  return instance.post(`slide`, payload)
}

export const updateBanner = (payload: IBanner) => {
  const { id, ...data } = payload
  return instance.put(`slide/${id}`, data)
}

export const deleteBanner = (id: string) => {
 
  return instance.delete(`slide/${id}`)
}

export const searchBanner = (q: string) => {
  return instance.get('slide', {
    params: {
      title: q
    }
  })
}

