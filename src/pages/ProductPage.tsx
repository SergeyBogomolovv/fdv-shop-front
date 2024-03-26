import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  getCurrentProduct,
  getRandom3Products,
} from '@/store/reducers/productSlice'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { ISeller } from '@/models/ISeller'
import SellerService from '@/service/Seller-Service'
import axios from 'axios'
import Product from '@/components/re-usable/Product'
import SkeletonProduct from '@/components/re-usable/SkeletonProduct'
import ProductPageDescription from '@/components/paged/ProductPage/ProductPageDescription'
import ProductPageCarousel from '@/components/paged/ProductPage/ProductPageCarousel'
import ProductPageFuncs from '@/components/paged/ProductPage/ProductPageFuncs'
import ProductPageInfo from '@/components/paged/ProductPage/ProductPageSeller'

export default function ProductPage() {
  const dispatch = useAppDispatch()
  const params = useParams()
  const [seller, setSeller] = useState<ISeller>({} as ISeller)
  const { products, isLoading, currentProduct } = useAppSelector(
    (state) => state.product
  )
  useEffect(() => {
    if (params.id) dispatch(getCurrentProduct(params.id))
  }, [params])
  useEffect(() => {
    console.log('get 3')
    dispatch(getRandom3Products())
  }, [params.id])
  useEffect(() => {
    getSeller()
  }, [currentProduct])

  return (
    <>
      {currentProduct && (
        <div className='grid container mx-auto py-10 lg:grid-cols-[2fr_3fr] gap-10'>
          <ProductPageCarousel currentProduct={currentProduct} />
          <div className='flex flex-col gap-6 items-center p-4'>
            <ProductPageFuncs currentProduct={currentProduct} />
            <ProductPageDescription currentProduct={currentProduct} />
            <ProductPageInfo currentProduct={currentProduct} seller={seller} />
          </div>
        </div>
      )}
      <Separator className='dark my-10' />
      <h1 className='text-4xl font-extrabold text-center'>Смотрите так же:</h1>
      {isLoading ? (
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-10 container mx-auto m-10'>
          <SkeletonProduct />
          <SkeletonProduct />
          <SkeletonProduct />
        </div>
      ) : (
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-10 container mx-auto m-10'>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
      <div className='flex justify-center'>
        <Button
          onClick={() => dispatch(getRandom3Products())}
          className='dark mx-auto mb-10 lg:w-96 sm:w-72 w-64'
          variant='outline'
        >
          Обновить
        </Button>
      </div>
    </>
  )
  async function getSeller() {
    try {
      if (currentProduct.sellerId) {
        const response = await SellerService.getOneSeller(
          currentProduct.sellerId
        )
        setSeller(response.data)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) console.error(error.response.data.message)
      }
    }
  }
}
