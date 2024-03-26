import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { IMAGE_URL } from '@/http'
import { IProduct } from '@/models/IProduct'
import { useAppDispatch } from '@/store/hooks'
import {
  addSecondImage,
  deleteSecondImage,
  updateProductImage,
} from '@/store/reducers/productSlice'
import { useRef } from 'react'
interface Props {
  product: IProduct
}
export default function MyProductImages({ product }: Props) {
  const dispatch = useAppDispatch()
  const inputRef: React.Ref<HTMLInputElement> = useRef(null)
  const secondInputRef: React.Ref<HTMLInputElement> = useRef(null)
  return (
    <>
      <Label>Превью</Label>
      <AspectRatio ratio={16 / 10}>
        <img
          className='rounded-lg object-cover'
          src={`${IMAGE_URL}${product.image}`}
          alt=''
        />
      </AspectRatio>

      <input
        ref={inputRef}
        hidden
        onChange={(e) => {
          const formData = new FormData()
          if (e.target.files) formData.append('image', e.target.files[0])
          dispatch(updateProductImage({ id: product._id, image: formData }))
        }}
        type='file'
      />
      <Button
        variant='outline'
        onClick={() => {
          if (inputRef.current) inputRef.current.click()
        }}
      >
        Изменить превью
      </Button>
      <Label>Фотографии</Label>
      <div className='grid grid-cols-4 gap-4 p-2'>
        {product.images.map((img) => (
          <div key={img} className='flex flex-col rounded-lg'>
            <img
              key={img}
              src={`${IMAGE_URL}${img}`}
              alt=''
              className='rouded-t-lg cursor-pointer'
              onClick={() =>
                dispatch(deleteSecondImage({ id: product._id, image: img }))
              }
            />
          </div>
        ))}
      </div>
      <input
        hidden
        ref={secondInputRef}
        type='file'
        onChange={(e) => {
          const formData = new FormData()
          if (e.target.files) {
            formData.append('image', e.target.files[0])
            dispatch(addSecondImage({ id: product._id, image: formData }))
          }
        }}
      />
      <Button
        variant='outline'
        onClick={() => {
          if (secondInputRef.current) secondInputRef.current.click()
        }}
      >
        Добавить фото
      </Button>
    </>
  )
}
