import { IProduct } from '@/models/IProduct'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Button } from '../ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect, useState } from 'react'
import SellerService from '@/service/Seller-Service'
import axios from 'axios'
import { ISeller } from '@/models/ISeller'
import { Badge } from '../ui/badge'
import { Link } from 'react-router-dom'
import { addToBasket } from '@/store/reducers/basketSlice'
import { AspectRatio } from '../ui/aspect-ratio'
interface Props {
  product: IProduct
}
export default function Product({ product }: Props) {
  const { isAuth } = useAppSelector((state) => state.auth)
  const { user } = useAppSelector((state) => state.profile)
  const { basket } = useAppSelector((state) => state.basket)
  const dispatch = useAppDispatch()
  const [seller, setSeller] = useState<ISeller>({} as ISeller)
  useEffect(() => {
    getSeller()
  }, [])

  return (
    <Card className='dark flex flex-col'>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription className='text-white font-semibold'>
          Цена: {product.price}$
        </CardDescription>
      </CardHeader>
      <CardContent className='flex-grow'>
        <Link to={`/product/${product._id}`}>
          <AspectRatio ratio={16 / 10}>
            <img
              className='rounded-lg object-cover h-full w-full'
              src={`http://localhost:5174/${product.image}`}
              alt=''
            />
          </AspectRatio>
        </Link>
      </CardContent>
      <CardFooter className='flex flex-col gap-4 items-start'>
        <Link to={`/seller/${seller.id}`}>
          <Badge variant='secondary' className='flex items-center gap-2 p-1'>
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src={`http://localhost:5174/${seller.logo}`}
                alt='@shadcn'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            Продавец {seller.companyName}
          </Badge>
        </Link>

        <Button
          disabled={!!basket.find((p) => p._id === product._id) || !isAuth}
          onClick={() => {
            dispatch(addToBasket({ productId: product._id, userId: user.id }))
          }}
          variant='outline'
        >
          {!basket.find((p) => p._id === product._id)
            ? 'В корзину'
            : 'В корзине'}
        </Button>
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
