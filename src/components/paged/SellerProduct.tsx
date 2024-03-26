import { IProduct } from '@/models/IProduct'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '../ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { addToBasket } from '@/store/reducers/basketSlice'
import { IMAGE_URL } from '@/http'
interface Props {
  product: IProduct
}
export default function SellerProduct({ product }: Props) {
  const { user } = useAppSelector((state) => state.profile)
  const { basket } = useAppSelector((state) => state.basket)
  const dispatch = useAppDispatch()

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
          <img
            className='rounded-lg'
            src={`${IMAGE_URL}${product.image}`}
            alt=''
          />
        </Link>
      </CardContent>
      <CardFooter className='flex flex-col gap-4 items-start'>
        <Button
          disabled={!!basket.find((p) => p._id === product._id)}
          onClick={() => {
            dispatch(addToBasket({ productId: product._id, userId: user.id }))
            toast(`Товар ${product.title} добавлен в корзину`)
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
}
