import { IUser } from '../IUser'

export interface AuthResponse {
  accesToken: string
  refreshToken: string
  user: IUser
}
