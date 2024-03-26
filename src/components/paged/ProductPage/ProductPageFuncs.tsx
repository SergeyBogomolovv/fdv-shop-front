import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { IProduct } from '@/models/IProduct'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addToBasket } from '@/store/reducers/basketSlice'

interface Props {
  currentProduct: IProduct
}
export default function ProductPageFuncs({ currentProduct }: Props) {
  const { basket } = useAppSelector((state) => state.basket)
  const { isAuth } = useAppSelector((state) => state.auth)

  const { user } = useAppSelector((state) => state.profile)
  const { isLoading } = useAppSelector((state) => state.product)
  const dispatch = useAppDispatch()

  return (
    <>
      {isLoading ? (
        <Skeleton className='w-[300px] h-[35px] dark' />
      ) : (
        <h1 className='sm:text-5xl text-4xl font-extrabold leading-tight'>
          {currentProduct.title}
        </h1>
      )}

      <Separator className='dark' />
      {isLoading ? (
        <Skeleton className='w-[170px] h-[30px] dark' />
      ) : (
        <h2 className='text-2xl font-bold'>Цена: {currentProduct.price}$</h2>
      )}

      <Button
        disabled={
          !!basket.find((p) => p._id === currentProduct._id) ||
          isLoading ||
          !isAuth
        }
        onClick={() => {
          dispatch(
            addToBasket({
              productId: currentProduct._id,
              userId: user.id,
            })
          )
        }}
        className='dark lg:w-96 sm:w-72 w-64'
      >
        {!basket.find((p) => p._id === currentProduct._id)
          ? 'В корзину'
          : 'В корзине'}
      </Button>
    </>
  )
}
