import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getOneSeller, getSellersProducts } from '@/store/reducers/sellerSlice'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useParams } from 'react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import RePagination from '@/components/re-usable/RePagination'
import SellerProduct from '@/components/paged/SellerProduct'
import SkeletonProduct from '@/components/re-usable/SkeletonProduct'
import { Skeleton } from '@/components/ui/skeleton'
import { IMAGE_URL } from '@/http'
export default function SellerProfile() {
  const dispatch = useAppDispatch()
  const params = useParams()
  const { currentSeller, products, isLoading, count } = useAppSelector(
    (state) => state.sellers
  )
  const [page, setPage] = useState(1)
  const pagesCount = Math.ceil(count / 3)
  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  useEffect(() => {
    if (params.id) {
      dispatch(getOneSeller(params.id))
      dispatch(getSellersProducts({ sellerId: params.id, limit: 3, page }))
    }
  }, [page])

  return (
    <div className='flex flex-col gap-10 px-40 py-10'>
      <Card className='dark'>
        <CardHeader>
          <CardTitle className='flex gap-3 items-center text-2xl'>
            <Avatar>
              <AvatarImage src={`${IMAGE_URL}${currentSeller.logo}`} />
              <AvatarFallback>
                <Skeleton className='dark rounded-full' />
              </AvatarFallback>
            </Avatar>
            {isLoading ? (
              <Skeleton className='dark w-[130px] h-[27px]' />
            ) : (
              currentSeller.companyName
            )}
          </CardTitle>
          {isLoading ? (
            <>
              <Skeleton className='w-full h-[10px]' />
              <Skeleton className='w-full h-[10px]' />
              <Skeleton className='w-full h-[10px]' />
              <Skeleton className='w-full h-[10px]' />
              <Skeleton className='w-full h-[10px]' />
            </>
          ) : (
            <CardDescription>{currentSeller.about}</CardDescription>
          )}
        </CardHeader>
        <Separator className='dark mb-4' />
        <CardContent>
          {isLoading ? (
            <Skeleton className='w-[100px] h-[23px]' />
          ) : (
            <CardTitle>Товары: {count}</CardTitle>
          )}
        </CardContent>
        <Separator className='dark mb-4' />
        <CardFooter>
          {isLoading ? (
            <Skeleton className='w-[130px] h-[20px]' />
          ) : (
            <CardDescription>ИНН: {currentSeller.INN}</CardDescription>
          )}
        </CardFooter>
      </Card>
      <Separator className='dark' />
      <div className='flex flex-col gap-10 items-center'>
        <div className='grid grid-cols-3 gap-10'>
          {isLoading ? (
            <>
              <SkeletonProduct />
              <SkeletonProduct />
              <SkeletonProduct />
            </>
          ) : (
            <>
              {products.map((product) => (
                <SellerProduct key={product._id} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
      <RePagination page={page} setPage={setPage} pagesCount={pagesCount} />
    </div>
  )
}
