import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getAllOrders, getOrderCount } from '@/store/reducers/orderSlice'
import { getUsers } from '@/store/reducers/userSlice'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import OrderRow from '@/components/paged/OrderRow'
import RePagination from '@/components/re-usable/RePagination'
import UserRow from '@/components/paged/UserRow'

export default function AdminBoard() {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const { users } = useAppSelector((state) => state.users)
  const { orders, count } = useAppSelector((state) => state.orders)
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getOrderCount())
  }, [])
  useEffect(() => {
    dispatch(getAllOrders(page))
  }, [page])

  return (
    <div className='container mx-auto py-10 flex flex-col gap-10'>
      <h1 className='text-5xl font-extrabold leading-tight text-center'>
        Панель администратора
      </h1>
      <div className='flex flex-col gap-4'>
        <Table className='dark'>
          <TableCaption>Данные о заказах.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Товар</TableHead>
              <TableHead>Покупатель</TableHead>
              <TableHead>Продавец</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Время</TableHead>
              <TableHead className='text-right'>Сумма</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <OrderRow key={order._id} order={order} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Общее количество</TableCell>
              <TableCell className='text-right'>{count}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        {count > 10 && (
          <RePagination
            setPage={setPage}
            page={page}
            pagesCount={Math.ceil(count / 10)}
          />
        )}
      </div>

      <Table className='dark'>
        <TableCaption>Пользователи.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Почта</TableHead>
            <TableHead className='text-center'>Подтвержден</TableHead>
            <TableHead className='text-center'>Продавец</TableHead>
            <TableHead className='text-center'>Заказы</TableHead>
            <TableHead className='text-center'>Зарегистрирован</TableHead>
            <TableHead className='text-right'>Забанить</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserRow key={user.id} usr={user} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Общее количетво</TableCell>
            <TableCell className='text-right'>{users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
