import { Skeleton } from '@/components/ui/skeleton'
import { useAppSelector } from '@/store/hooks'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { IProduct } from '@/models/IProduct'
import { IMAGE_URL } from '@/http'
import Autoplay from 'embla-carousel-autoplay'

interface Props {
  currentProduct: IProduct
}
export default function ProductPageCarousel({ currentProduct }: Props) {
  const { isLoading } = useAppSelector((state) => state.product)
  return (
    <div className='flex h-full w-full px-10 sm:px-16 md:px-20 lg:px-0 justify-center items-center pt-6'>
      {isLoading ? (
        <Skeleton className='w-full h-[400px] dark' />
      ) : (
        <>
          {currentProduct.images && (
            <Carousel
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className='dark h-full w-full'
            >
              <CarouselContent>
                {currentProduct.images.map((image) => (
                  <CarouselItem key={image} className='rouded-lg'>
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={`${IMAGE_URL}${image}`}
                        alt=''
                        className='rounded-lg object-cover w-full h-full'
                      />
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </>
      )}
    </div>
  )
}
