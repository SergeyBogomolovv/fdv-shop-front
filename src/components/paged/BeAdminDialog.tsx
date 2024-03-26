import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Button } from '../ui/button'
import { beAdmin } from '@/store/reducers/profileSlice'
import { useState } from 'react'
import { Textarea } from '../ui/textarea'

export default function BeAdminDialog() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.profile)
  const [message, setMessage] = useState('')
  return (
    <Dialog>
      <DialogTrigger className='dark'>
        <div className='text-sm text-neutral-500 hover:text-white'>
          Стать администратором
        </div>
      </DialogTrigger>
      <DialogContent className='dark'>
        <DialogHeader>
          <DialogTitle>Заявка на администратора</DialogTitle>
          <DialogDescription>
            Заполните форму и нажмите отправить
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder='Почему вы хотите стать администратором?'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <DialogFooter>
          <DialogClose>
            <Button onClick={() => dispatch(beAdmin({ id: user.id, message }))}>
              Отправить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
