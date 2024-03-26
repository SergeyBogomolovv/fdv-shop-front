export interface loginArgs {
  email: string
  password: string
}

export interface registrationArgs {
  email: string
  password: string
  addres: string
  logo: File
}
export interface beASellerArgs {
  id: string
  INN: string
  companyName: string
  about: string
}
export interface beAdminArgs {
  id: string
  message: string
}
export interface orderArgs {
  productId: string
  userId: string
  message: string
}
export interface deleteOrderArgs {
  productId: string
  userId: string
}
