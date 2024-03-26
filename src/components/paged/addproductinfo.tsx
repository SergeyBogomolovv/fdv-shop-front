import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'
import { useAppSelector } from '@/store/hooks'
interface Props {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  price: string
  setPrice: React.Dispatch<React.SetStateAction<string>>
  productCategories: string[]
  setCategories: React.Dispatch<React.SetStateAction<string[]>>
}
export default function AddProductInfo({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  productCategories,
  setCategories,
}: Props) {
  const { categories } = useAppSelector((state) => state.categories)

  return (
    <>
      <Label htmlFor='title'>Название</Label>
      <Input
        id='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Название'
      />
      <Label htmlFor='description'>Описание</Label>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id='description'
        placeholder='Описание'
      />
      <Label htmlFor='description'>Цена</Label>
      <Input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        id='description'
        type='number'
        placeholder='Цена'
      />
      <Label htmlFor='category'>Категории</Label>
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
    </>
  )
}
