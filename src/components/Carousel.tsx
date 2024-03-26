import first from '/images/7.jpg'
import second from '/images/1.webp'
import third from '/images/4.jpg'
import fourth from '/images/6.jpg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Autoplay from 'embla-carousel-autoplay'
import { Link } from 'react-router-dom'

export function CarouselMain() {
  const images = [
    { src: first, category: 'Квадрокоптеры', text: 'Квадрокоптеры' },
    { src: second, category: 'Long-Range', text: 'LongRange' },
    { src: third, category: 'Фристайл', text: 'Freestyle' },
    { src: fourth, category: 'Аккумуляторы', text: 'Аккумуляторы' },
  ]

  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className='2xl:mx-20 xl:mx-16 lg:mx-14 md:mx-12 sm:mx-10 mx-8 dark'
      >
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.src} className='sm:basis-1/2'>
              <Link to={`/${image.category}`}>
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={image.src}
                    alt='Image'
                    className='rounded-md object-cover h-full'
                  />
                </AspectRatio>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
