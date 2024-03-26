import { IHistory } from '@/models/IHistory'
import { TableCell, TableRow } from '../ui/table'
import { useEffect, useState } from 'react'
import { ISeller } from '@/models/ISeller'
import { IUser } from '@/models/IUser'
import SellerService from '@/service/Seller-Service'
import axios from 'axios'
import { toast } from 'sonner'
import UserService from '@/service/User-Service'
import { Link } from 'react-router-dom'

interface Props {
  order: IHistory
}

export default function OrderRow({ order }: Props) {
  const [seller, setSeller] = useState<ISeller>({} as ISeller)
  const [buyer, setBuyer] = useState<IUser>({} as IUser)
  const date = new Date(order.date).toLocaleDateString()
  const time = new Date(order.date).toLocaleTimeString()

  useEffect(() => {
    getBuyer()
    getSeller()
  }, [])

  return (
    <TableRow>
      <TableCell className='font-medium'>
        <Link to={`/product/${order.productId}`}>{order.title}</Link>
      </TableCell>
      <TableCell className='font-medium'>{buyer.email}</TableCell>
      <TableCell>
        <Link to={`/seller/${order.seller}`}>{seller.companyName}</Link>
      </TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>{time}</TableCell>
      <TableCell className='text-right'>{order.price}$</TableCell>
    </TableRow>
  )
  async function getSeller() {
    try {
      const response = await SellerService.getOneSeller(order.seller)
      setSeller(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data.message)
      }
    }
  }
  async function getBuyer() {
    try {
      const response = await UserService.getOneUser(order.buyer)
      setBuyer(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data.message)
      }
    }
  }
}
