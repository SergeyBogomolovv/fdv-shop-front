import { IOrder } from './IOrder'

export interface IUser {
  email: string
  id: string
  isActivated: boolean
  addres: string
  orders: IOrder[]
  logo: string
  roles: string[]
  INN?: string
  companyName?: string
  about?: string
  date: Date
}

export interface IUserBody {
  id?: string
  companyName?: string
  INN?: string
  addres: string
  logo: File
}
export interface IUpdateUser {
  id: string
  body: { addres?: string; INN?: string; companyName?: string; about?: string }
}
export interface IUpdateLogo {
  id: string
  logo: FormData
}
