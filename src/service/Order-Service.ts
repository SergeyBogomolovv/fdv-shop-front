import { AxiosResponse } from 'axios'
import $api from '../http'
import { IUser } from '@/models/IUser'
import { IHistory } from '@/models/IHistory'

export default class OrderService {
  static async getCount(): Promise<AxiosResponse<number>> {
    return $api.get<number>('/orders/count')
  }
  static async getAllOrders(page: number): Promise<AxiosResponse<IHistory[]>> {
    return $api.get<IHistory[]>('/orders/all', { params: { page } })
  }
  static async clearOrders(userId: string): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>(`/orders/${userId}/clear`)
  }
  static async orderProduct(
    productId: string,
    userId: string,
    message: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>(`/orders/${productId}`, {
      productId,
      userId,
      message,
    })
  }
}
