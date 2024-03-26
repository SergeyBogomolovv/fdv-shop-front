import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import SellerService from '@/service/Seller-Service'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ISeller } from '@/models/ISeller'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Link } from 'react-router-dom'
import { IOrder } from '@/models/IOrder'
import { IMAGE_URL } from '@/http'

interface Props {
  product: IOrder
}

export default function Order({ product }: Props) {
  const [seller, setSeller] = useState<ISeller>({} as ISeller)
  const date = new Date(product.date).toLocaleDateString()
  useEffect(() => {
    getSeller()
  }, [])

  return (
    <Card
      className={
        'dark sm:w-[450px] w-[300px] md:w-[350px] lg:w-[450px] flex flex-col'
      }
    >
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription className='text-white font-semibold'>
          Цена: {product.price}$
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'>
        <Link to={`/product/${product._id}`}>
          <img
            className='rounded-lg'
            src={`${IMAGE_URL}${product.image}`}
            alt=''
          />
        </Link>
      </CardContent>
      <CardFooter className='flex flex-col gap-4 items-start'>
        <CardDescription className='text-white font-semibold'>
          Сообщение: {product.message}
        </CardDescription>
        <CardDescription className='text-white font-semibold'>
          Дата: {date}
        </CardDescription>
        <Link to={`/seller/${seller.id}`}>
          <Badge variant='secondary' className='flex items-center gap-2 p-1'>
            <Avatar className='w-6 h-6 '>
              <AvatarImage
                src={`${IMAGE_URL}${seller.logo}`}
                alt='@shadcn'
                className='rounded-full'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            Продавец {seller.companyName}
          </Badge>
        </Link>
      </CardFooter>
    </Card>
  )
  async function getSeller() {
    try {
      const response = await SellerService.getOneSeller(product.sellerId)
      setSeller(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) console.error(error.response.data.message)
      }
    }
  }
}
