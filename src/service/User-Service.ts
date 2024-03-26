import { AxiosResponse } from 'axios'
import $api from '../http'
import { IUser } from '@/models/IUser'

export default class UserService {
  static async getOneUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>(`/user/${id}`)
  }
  static async getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/user')
  }
  static async beAdmin(
    id: string,
    message: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>(`/user/${id}/beAdmin`, { message })
  }
  static async beASeller(
    id: string,
    INN: string,
    companyName: string,
    about: string
  ): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>(`/user/${id}/beAseller`, { INN, companyName, about })
  }
  static async updateUser(
    id: string,
    body: {
      addres?: string
      INN?: string
      companyName?: string
      about?: string
    }
  ): Promise<AxiosResponse<IUser>> {
    console.log(body.about)
    return $api.put<IUser>(`/user/${id}`, body)
  }
  static async updateLogo(
    id: string,
    body: FormData
  ): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>(`/user/${id}/updateLogo`, body)
  }
  static async deleteUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.delete<IUser>(`/user/${id}`)
  }
}
