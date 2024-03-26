import { AxiosResponse } from 'axios'
import $api from '../http'
import { IProduct, IProductBody } from '@/models/IProduct'
import { IOrder } from '@/models/IOrder'
import { ManyProductsResponse } from '@/models/response/ManyProductsResponse'

export default class ProductService {
  static async getBasket(userId: string): Promise<AxiosResponse<IOrder[]>> {
    return $api.get<IOrder[]>(`/products/${userId}/basket`)
  }
  static async getByCategory(
    category: string
  ): Promise<AxiosResponse<IProduct[]>> {
    return $api.get<IProduct[]>(`/products/getbycategory/${category}`)
  }
  static async getOneProduct(id: string): Promise<AxiosResponse<IProduct>> {
    return $api.get<IProduct>(`/products/${id}`)
  }
  static async getManyProducts(
    page: number,
    limit: number
  ): Promise<AxiosResponse<ManyProductsResponse>> {
    return $api.get<ManyProductsResponse>('/products', {
      params: { page, limit },
    })
  }
  static async findProduct(title: string): Promise<AxiosResponse<IProduct[]>> {
    return $api.get<IProduct[]>(`/products/search/${title}`)
  }
  static async addProduct(body: FormData): Promise<AxiosResponse<IProduct>> {
    return $api.post('/products/addProduct', body)
  }
  static async addToBasket(
    productId: string,
    userId: string
  ): Promise<AxiosResponse<IOrder>> {
    return $api.post<IOrder>('/products/addtobasket', { productId, userId })
  }
  static async deleteFromBasket(
    productId: string,
    userId: string
  ): Promise<AxiosResponse<IProduct>> {
    return $api.post<IProduct>('/products/removefrombasket', {
      productId,
      userId,
    })
  }
  static async deleteProduct(id: string): Promise<AxiosResponse<IProduct>> {
    return $api.delete<IProduct>(`/products/${id}`)
  }
  static async updateProduct(
    id: string,
    body: IProductBody
  ): Promise<AxiosResponse<IProduct>> {
    return $api.put<IProduct>(`/products/${id}`, body)
  }
  static async updateProductImage(
    id: string,
    image: FormData
  ): Promise<AxiosResponse<IProduct>> {
    return $api.put<IProduct>(`/products/${id}/updateimage`, image)
  }
  static async addSecondImage(
    id: string,
    image: FormData
  ): Promise<AxiosResponse<IProduct>> {
    return $api.put<IProduct>(`/products/${id}/addimage`, image)
  }
  static async deleteSecondImage(
    id: string,
    image: string
  ): Promise<AxiosResponse<IProduct>> {
    return $api.put<IProduct>(`/products/${id}/deleteimage`, { image })
  }
}
