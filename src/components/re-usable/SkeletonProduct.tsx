import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
export default function SkeletonProduct() {
  return (
    <Card className='dark flex flex-col'>
      <CardHeader>
        <Skeleton className='w-[150px] h-[20px]' />
        <Skeleton className='w-[300px] h-[10px]' />
        <Skeleton className='w-[300px] h-[10px]' />
      </CardHeader>
      <CardContent className='flex-grow'>
        <Skeleton className='w-full h-[200px]' />
      </CardContent>
      <CardFooter className='flex flex-col gap-4 items-start'>
        <Skeleton className='w-[200px] h-[30px]' />
        <Skeleton className='w-[100px] h-[30px]' />
      </CardFooter>
    </Card>
  )
}
