import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getManyProducts } from '@/store/reducers/productSlice'
import { useEffect, useState } from 'react'
import { CarouselMain } from '@/components/Carousel'
import Product from '@/components/re-usable/Product'
import RePagination from '@/components/re-usable/RePagination'
import SkeletonProduct from '@/components/re-usable/SkeletonProduct'

export default function Main() {
  const { products, isLoading, totalCount } = useAppSelector(
    (state) => state.product
  )
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const pagesCount = Math.ceil(totalCount / 6)
  useEffect(() => {
    dispatch(getManyProducts({ limit: 6, page }))
  }, [page])

  return (
    <>
      <div className='lg:p-8 md:p-6 xl:p-10 p-4 flex flex-col gap-10'>
        <h1 className='font-extrabold lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-center flex flex-col gap-4 leading-tight'>
          Добро пожаловать в <div className='font-ProtestRiot'>Gerax Fpv</div>
        </h1>
        <CarouselMain />
        <h1 className='font-extrabold lg:text-4xl md:text-3xl sm:text-2xl text-xl text-center leading-tight mt-10'>
          Товары, которые могут вас заинтересовать
        </h1>
        {isLoading ? (
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-10 mx-auto container'>
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
          </div>
        ) : (
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-10 mx-auto container'>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
        <RePagination page={page} setPage={setPage} pagesCount={pagesCount} />
      </div>
    </>
  )
}
