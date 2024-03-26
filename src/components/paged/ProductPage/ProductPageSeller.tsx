import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { IMAGE_URL } from '@/http'
import { IProduct } from '@/models/IProduct'
import { ISeller } from '@/models/ISeller'
import { useAppSelector } from '@/store/hooks'
import { Link } from 'react-router-dom'
interface Props {
  currentProduct: IProduct
  seller: ISeller
}
export default function ProductPageInfo({ currentProduct, seller }: Props) {
  const { isLoading } = useAppSelector((state) => state.product)

  return (
    <>
      {isLoading ? (
        <Skeleton className='w-[150px] h-[35px] dark self-start' />
      ) : (
        <Link className='self-start' to={`/seller/${seller.id}`}>
          <Badge
            variant='secondary'
            className='dark flex items-center gap-2 p-1'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage src={`${IMAGE_URL}${seller.logo}`} alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            Продавец {seller.companyName}
          </Badge>
        </Link>
      )}
      {isLoading ? (
        <div className='self-start flex gap-2 items-center'>
          <Skeleton className='w-[80px] h-[27px] dark self-start' />
          <Skeleton className='w-[70px] h-[20px] dark ' />
          <Skeleton className='w-[70px] h-[20px] dark ' />
          <Skeleton className='w-[70px] h-[20px] dark ' />
        </div>
      ) : (
        <div className='font-bold text-xl self-start flex gap-3 items-center'>
          Теги:
          <div className='flex gap-2'>
            {currentProduct.categories ? (
              currentProduct.categories.map((category) => (
                <Link key={category} to={`/${category}`}>
                  <Badge className='dark' variant='outline'>
                    {category}
                  </Badge>
                </Link>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  )
}
