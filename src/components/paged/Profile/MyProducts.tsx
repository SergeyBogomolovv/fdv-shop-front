import { useAppDispatch, useAppSelector } from '@/store/hooks'
import AddProduct from './AddProduct'
import { useEffect } from 'react'
import { getMyProducts } from '@/store/reducers/productSlice'
import MyProduct from './MyProduct'
import SkeletonProduct from '@/components/re-usable/SkeletonProduct'

export function MyProducts() {
  const { myProducts, isLoading } = useAppSelector((state) => state.product)
  const { user } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMyProducts(user.id))
  }, [])

  return (
    <div className='flex flex-col gap-6 items-center'>
      {isLoading ? (
        <div className='grid lg:grid-cols-2 gap-6 container mx-auto'>
          <SkeletonProduct />
          <SkeletonProduct />
        </div>
      ) : (
        <>
          {myProducts.length === 0 ? (
            <div className='flex flex-col gap-5 items-center'>
              <div className='text-2xl font-semibold'>
                Вы пока ничего не продаете
              </div>
              <AddProduct />
            </div>
          ) : (
            <>
              <h1 className='text-5xl font-extrabold leading-tight text-center'>
                Ваши товары
              </h1>
              <div className='grid lg:grid-cols-2 gap-6 container mx-auto'>
                {myProducts.map((product) => (
                  <MyProduct key={product._id} product={product} />
                ))}
                {myProducts.length > 0 && <AddProduct />}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
