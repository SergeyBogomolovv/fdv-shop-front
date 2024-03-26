import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import { getMyProducts } from '@/store/reducers/productSlice'
import Order from '../Order'
import { Button } from '../../ui/button'
import { clearOrders } from '@/store/reducers/orderSlice'

export function Orders() {
  const { user } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMyProducts(user.id))
  }, [])

  return (
    <div className='flex flex-col gap-6 items-center'>
      {user.orders.length ? (
        <div className='flex flex-col gap-6'>
          <h1 className='text-5xl font-extrabold leading-tight text-center'>
            Ваши заказы
          </h1>
          <div className='grid md:grid-cols-2 container mx-auto gap-6'>
            {user.orders.map((product) => (
              <Order key={product._id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <h1 className='mt-10 font-extrabold leading-tight text-5xl'>
            Вы пока что ничего не заказывали
          </h1>
        </>
      )}

      {user.orders.length ? (
        <Button
          onClick={() => {
            dispatch(clearOrders(user.id))
          }}
          variant='destructive'
        >
          Очистить историю
        </Button>
      ) : (
        <></>
      )}
    </div>
  )
}
