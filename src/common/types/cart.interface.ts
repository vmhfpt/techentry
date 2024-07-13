export interface ICart {
  id?: number
  name: string
  variant: string
  quantity: number
  image: string
  price: number
  price_sale: number
  product_item_id?: number
}

export interface IAddCart {
  quantity: number
  product_item_id: string | number
  token?: string | null
}
