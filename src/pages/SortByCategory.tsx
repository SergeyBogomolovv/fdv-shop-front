import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getByCategory } from '@/store/reducers/productSlice'
import { useEffect } from 'react'
import Product from '@/components/re-usable/Product'
import { getCategories } from '@/store/reducers/categorySlice'
import { useParams } from 'react-router-dom'
import SkeletonProduct from '@/components/re-usable/SkeletonProduct'

export default function SortByCategory() {
  const { products, isLoading } = useAppSelector((state) => state.product)
  const dispatch = useAppDispatch()
  const { category } = useParams()

  useEffect(() => {
    dispatch(getCategories())
    if (category) dispatch(getByCategory(category))
  }, [category])

  return (
    <>
      <div className='container mx-auto py-10 flex flex-col gap-10'>
        <h1 className='font-extrabold leading-tight lg:text-4xl md:text-3xl text-2xl text-center'>
          Товары категории {category}
        </h1>
        {isLoading ? (
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-10'>
            <SkeletonProduct />
            <SkeletonProduct />
            <SkeletonProduct />
          </div>
        ) : (
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-10'>
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
