import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import { useRef } from 'react'
interface Props {
  image: File | string
  images: File[]
  setImages: React.Dispatch<React.SetStateAction<File[]>>
  setImage: React.Dispatch<React.SetStateAction<File | string>>
}
export default function AddPoductImages({
  image,
  images,
  setImages,
  setImage,
}: Props) {
  const inputRef: React.Ref<HTMLInputElement> = useRef(null)
  const multipleInputRef: React.Ref<HTMLInputElement> = useRef(null)
  return (
    <>
      <Label htmlFor='image'>Изображение</Label>
      <input
        ref={inputRef}
        onChange={(e) => {
          if (e.target.files) setImage(e.target.files[0])
        }}
        placeholder='Название'
        type='file'
        hidden
      />
      <Button
        id='image'
        onClick={() => {
          if (inputRef.current) inputRef.current.click()
        }}
        variant='outline'
      >
        {image ? 'Поменять' : 'Выбрать'}
      </Button>
      <Label htmlFor='images'>Дополнительные изображения</Label>
      <input
        ref={multipleInputRef}
        onChange={(e) => {
          if (e.target.files) {
            for (let i = 0; i < e.target.files.length; i++) {
              setImages((prev) => [...prev, e.target.files[i]])
            }
          }
        }}
        type='file'
        multiple
        hidden
      />
      <Button
        id='images'
        onClick={() => {
          if (multipleInputRef.current) multipleInputRef.current.click()
        }}
        variant='outline'
      >
        Выбрано {images.length}
      </Button>
    </>
  )
}
