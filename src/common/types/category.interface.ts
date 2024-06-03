export interface ICategory {
  id?: string
  name: string
  parent_id?: string
  description: string
  is_delete: boolean
}
export interface IPostCategory {
  id?: string
  name: string
  slug?: string
}
