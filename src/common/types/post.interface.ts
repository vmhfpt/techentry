export interface IPost {
  id?: string
  title: string
  slug?: string
  description: string
  content: string
  thumbnail: string
  postCategoryId: string
  status: number
  isActive?: boolean
}
