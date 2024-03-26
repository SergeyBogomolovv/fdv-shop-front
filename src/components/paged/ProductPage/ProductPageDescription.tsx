import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { IProduct } from '@/models/IProduct'
import { useAppSelector } from '@/store/hooks'
import { Skeleton } from '../../ui/skeleton'
interface Props {
  currentProduct: IProduct
}
export default function ProductPageDescription({ currentProduct }: Props) {
  const { isLoading } = useAppSelector((state) => state.product)
  return (
    <Accordion type='single' collapsible className='w-full dark'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Описание</AccordionTrigger>
        <AccordionContent>
          {isLoading ? (
            <div className='flex flex-col gap-2'>
              <Skeleton className='w-full h-[10px] dark' />
              <Skeleton className='w-full h-[10px] dark' />
              <Skeleton className='w-full h-[10px] dark' />
            </div>
          ) : (
            currentProduct.description
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
