import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import ProductInBasket from './ProductInBasket'
import { useEffect } from 'react'
import { getBasket } from '@/store/reducers/basketSlice'
import SkeletonProduct from '@/components/re-usable/SkeletonProduct'

export default function Basket() {
  const { user } = useAppSelector((state) => state.profile)
  const { basket, isLoading } = useAppSelector((state) => state.basket)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getBasket(user.id))
  }, [user])

  return (
    <div className='flex justify-center flex-col items-center'>
      {isLoading ? (
        <div className='grid md:grid-cols-2 justify-items-center gap-5'>
          <SkeletonProduct />
          <SkeletonProduct />
        </div>
      ) : (
        <>
          {basket.length === 0 ? (
            <div className='flex flex-col container mx-auto gap-5 items-center'>
              <h1 className='text-5xl font-extrabold leading-tight'>
                Сейчас ваша корзина пуста
              </h1>
              <Link to='/'>
                <Badge variant='outline' className='text-lg p-4 leading-7'>
                  Но у нас есть много товаров, которые вам обязательно
                  понравятся
                </Badge>
              </Link>
            </div>
          ) : (
            <div className='flex flex-col gap-6'>
              <h1 className='text-5xl font-extrabold leading-tight text-center'>
                Ваша корзина
              </h1>
              <div className='grid md:grid-cols-2 container mx-auto justify-items-center gap-5'>
                {basket.map((product) => (
                  <ProductInBasket key={product._id} product={product} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
