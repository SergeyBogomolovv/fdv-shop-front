import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useAppSelector } from '@/store/hooks'
interface Props {
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  price: number | string
  setPrice: React.Dispatch<React.SetStateAction<number | string>>
  productCategories: string[]
  setCategories: React.Dispatch<React.SetStateAction<string[]>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
}
export default function MyProductInfo({
  description,
  setDescription,
  price,
  setPrice,
  productCategories,
  setCategories,
  title,
  setTitle,
}: Props) {
  const { categories } = useAppSelector((state) => state.categories)

  return (
    <>
      <div className='grid gap-1 '>
        <Label htmlFor='title'>Название</Label>
        <Input
          id='title'
          placeholder='Название'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <Separator />
      <div className='grid gap-1'>
        <Label htmlFor='description'>Описание</Label>
        <Textarea
          className='min-h-[150px]'
          id='description'
          placeholder='Описание'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Separator />
      <div className='grid gap-1'>
        <Label htmlFor='price'>Цена</Label>
        <Input
          id='price'
          type='number'
          placeholder='Цена'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <Separator />
      <div className='grid gap-1'>
        <Select
          onValueChange={(value) =>
            setCategories((prev) => {
              if (prev.find((c) => c === value)) return prev
              return [...prev, value]
            })
          }
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Добавить' />
          </SelectTrigger>
          <SelectContent className='dark'>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          {productCategories.map((category) => (
            <Badge
              className='cursor-pointer'
              onClick={() =>
                setCategories((prev) => {
                  return prev.filter((c) => c != category)
                })
              }
              key={category}
              variant='outline'
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </>
  )
}
