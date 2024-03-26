import { IProduct } from '@/models/IProduct'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '../../ui/button'
import { useAppDispatch } from '@/store/hooks'
import { removeProduct, updateProduct } from '@/store/reducers/productSlice'
import { useEffect, useState } from 'react'
import { getCategories } from '@/store/reducers/categorySlice'

import MyProductInfo from '../MyProduct/MyProductInfo'
import MyProductImages from '../MyProduct/MyProductImages'

interface Props {
  product: IProduct
}

export default function MyProduct({ product }: Props) {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState(product.title)
  const [productCategories, setCategories] = useState<string[]>([
    ...product.categories,
  ])
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState<string | number>(product.price)
  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <Card className='dark xl:w-[550px] lg:w-[470px] sm:w-[550px] mx-auto w-full flex flex-col'>
      <CardHeader className='flex flex-col gap-2'>
        <MyProductInfo
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          productCategories={productCategories}
          setCategories={setCategories}
          title={title}
          setTitle={setTitle}
        />
        <Separator />
        <Button
          onClick={() => {
            dispatch(
              updateProduct({
                id: product._id,
                body: {
                  title,
                  price,
                  description,
                  categories: productCategories,
                },
              })
            )
          }}
          className='w-full'
        >
          Сохранить изменения
        </Button>
      </CardHeader>
      <CardContent className='flex flex-col gap-3 flex-grow'>
        <MyProductImages product={product} />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => dispatch(removeProduct(product._id))}
          variant='destructive'
        >
          Удалить
        </Button>
      </CardFooter>
    </Card>
  )
}
