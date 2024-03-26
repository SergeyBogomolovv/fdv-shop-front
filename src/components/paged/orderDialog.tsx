import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { useAppDispatch } from '@/store/hooks'
import { useState } from 'react'
import { DialogClose } from '@radix-ui/react-dialog'
import { IOrder } from '@/models/IOrder'
import { orderProduct } from '@/store/reducers/orderSlice'

interface Props {
  product: IOrder
  userId: string
}

export default function OrderDialog({ product, userId }: Props) {
  const dispatch = useAppDispatch()
  const [message, setMessage] = useState('')
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Заказать</Button>
      </DialogTrigger>
      <DialogContent className='dark'>
        <DialogHeader>
          <DialogTitle>Заказать {product.title}?</DialogTitle>
        </DialogHeader>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Сообщение продавцу'
        />
        <DialogClose asChild>
          <Button
            onClick={() =>
              dispatch(
                orderProduct({ productId: product._id, userId, message })
              )
            }
          >
            Подтвердить
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
