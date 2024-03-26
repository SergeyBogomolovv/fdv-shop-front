export interface IProduct {
  price: number
  _id: string
  title: string
  description: string
  image: string
  sellerId: string
  categories: string[]
  images: string[]
}

export interface IProductBody {
  title?: string
  price?: string | number
  description?: string
  image?: FormData
  images?: FormData
  sellerId?: string
  categories?: string[]
}
