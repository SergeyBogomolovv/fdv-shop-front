import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { createProduct } from '@/store/reducers/productSlice'
import { DialogClose } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { getCategories } from '@/store/reducers/categorySlice'
import { toast } from 'sonner'
import AddPoductImages from '../addproductimages'
import AddProductInfo from '../addproductinfo'

export default function AddProduct() {
  const { user } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [productCategories, setCategories] = useState<string[]>([])
  const [image, setImage] = useState<File | string>('')
  const [images, setImages] = useState<File[]>([])

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='flex min-h-[150px] lg:min-w-[550px] h-full items-center justify-center rounded-md border border-dashed text-lg'
          variant='outline'
        >
          Добавить товар
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] dark'>
        <DialogHeader>
          <DialogTitle>Новый товар</DialogTitle>
          <DialogDescription>
            Заполните информацию и нажмите готово.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <AddPoductImages
            image={image}
            images={images}
            setImage={setImage}
            setImages={setImages}
          />
          <AddProductInfo
            title={title}
            setTitle={setTitle}
            setPrice={setPrice}
            price={price}
            description={description}
            setDescription={setDescription}
            productCategories={productCategories}
            setCategories={setCategories}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={addhandler} type='submit' className='w-full'>
              Готово
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
  function addhandler() {
    const formData = new FormData()
    if (productCategories.length === 0) {
      toast('Укажите категории')
      return
    }
    if (!image || !title || !price || !description) {
      toast('Введите все данные')
      return
    }
    formData.append('sellerId', user.id)
    formData.append('image', image)
    images.forEach((img) => {
      formData.append('images', img)
    })
    formData.append('title', title)
    formData.append('price', price)
    formData.append('description', description)
    productCategories.forEach((category) => {
      formData.append('categories', category)
    })
    dispatch(createProduct(formData))
    setTitle('')
    setDescription('')
    setPrice('')
    setImage('')
    setCategories([])
  }
}
