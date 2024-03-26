import { AxiosResponse } from 'axios'
import $api from '../http'
import { ISeller } from '@/models/ISeller'
import { ManyProductsResponse } from '@/models/response/ManyProductsResponse'

export default class SellerService {
  static async getOneSeller(id: string): Promise<AxiosResponse<ISeller>> {
    return $api.get<ISeller>(`/seller/${id}`)
  }
  static async getAllSellers(): Promise<AxiosResponse<ISeller[]>> {
    return $api.get<ISeller[]>('/seller')
  }
  static async deleteSeller(id: string): Promise<AxiosResponse<ISeller>> {
    return $api.delete<ISeller>(`/seller/${id}`)
  }
  static async getSellerProducts(
    sellerId: string,
    limit?: number,
    page?: number
  ): Promise<AxiosResponse<ManyProductsResponse>> {
    return $api.get<ManyProductsResponse>(`/seller/${sellerId}/products`, {
      params: { page, limit },
    })
  }
}
