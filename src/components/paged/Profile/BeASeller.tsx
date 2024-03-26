import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { beASeller } from '@/store/reducers/profileSlice'
import { useState } from 'react'
import { Button } from '../../ui/button'
import { Textarea } from '../../ui/textarea'

export function BeASeller() {
  const [INN, setInn] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [about, setAbout] = useState('')
  const { user } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  return (
    <Card className='sm:w-[450px] w-[350px] mx-auto'>
      <CardHeader>
        <CardTitle>Стать продавцом</CardTitle>
        <CardDescription>Заполните анкету и нажмите отправить</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='inn' className='text-right'>
              ИНН
            </Label>
            <Input
              id='inn'
              placeholder='00000000'
              value={INN}
              onChange={(e) => setInn(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Название
            </Label>
            <Input
              id='username'
              placeholder='iflight'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='about' className='text-right'>
              О себе
            </Label>
            <Textarea
              id='about'
              placeholder='Расскажите о себе'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className='col-span-3'
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type='submit'
          className='w-full'
          onClick={() => {
            dispatch(beASeller({ id: user.id, INN, companyName, about }))
            setInn('')
            setAbout('')
            setCompanyName('')
          }}
        >
          Отправить
        </Button>
      </CardFooter>
    </Card>
  )
}
