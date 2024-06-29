import { ICategory } from './category.interface'

export interface IProduct {
  id?: number | string
  categoryId: number
  thumbnail: string
  name: string
  description: string
  price: number
  discount: number
  total_review?: number
  brandId: number
  avg_stars?: number
  is_active: any
  upload?: [File]
  category?: any;
  products : any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sales_information?: any[]
}
export interface IGallery {
  id?: number | string
  productId: number
  image: string
}
