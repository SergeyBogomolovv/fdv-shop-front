import { TableCell, TableRow } from '../ui/table'
import { IUser } from '@/models/IUser'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Button } from '../ui/button'
import { removeUser } from '@/store/reducers/userSlice'
import { toast } from 'sonner'

interface Props {
  usr: IUser
}

export default function UserRow({ usr }: Props) {
  const date = new Date(usr.date).toLocaleDateString()
  const { user } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  return (
    <TableRow>
      <TableCell className='font-medium'>{usr.email}</TableCell>
      <TableCell className='font-medium text-center'>
        {usr.isActivated ? 'Да' : 'Нет'}
      </TableCell>
      <TableCell className='font-medium text-center'>
        {usr.roles.includes('SELLER') ? 'Да' : 'Нет'}
      </TableCell>
      <TableCell className='text-center'>{usr.orders.length}</TableCell>
      <TableCell className='text-center'>{date}</TableCell>
      <TableCell className='text-right'>
        <Button
          onClick={() => {
            if (usr.id != user.id) {
              dispatch(removeUser(usr.id))
            } else {
              toast('Вы пытаетесь забанить самого себя')
            }
          }}
          variant='destructive'
        >
          Забанить
        </Button>
      </TableCell>
    </TableRow>
  )
}
