import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../../ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import SellerService from '@/service/Seller-Service'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ISeller } from '@/models/ISeller'
import { Badge } from '../../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import OrderDialog from '../orderDialog'
import { IOrder } from '@/models/IOrder'
import { removeFromBasket } from '@/store/reducers/basketSlice'
import { IMAGE_URL } from '@/http'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface Props {
  product: IOrder
}

export default function ProductInBasket({ product }: Props) {
  const { user } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  const [seller, setSeller] = useState<ISeller>({} as ISeller)
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
          <AspectRatio ratio={16 / 10}>
            <img
              className='rounded-lg object-cover h-full w-full'
              src={`${IMAGE_URL}${product.image}`}
              alt=''
            />
          </AspectRatio>
        </Link>
      </CardContent>
      <CardFooter className='flex flex-col gap-4 items-start'>
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
        <OrderDialog product={product} userId={user.id} />
        <Button
          onClick={() => {
            dispatch(
              removeFromBasket({ productId: product._id, userId: user.id })
            )
            toast(`Товар ${product.title} удален из корзины`)
          }}
          variant='destructive'
        >
          Удалить
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
