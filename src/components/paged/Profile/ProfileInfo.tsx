import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../../ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updateLogo, updateUser } from '@/store/reducers/profileSlice'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '../../ui/input'
import { Label } from '@radix-ui/react-label'
import React, { useRef, useState } from 'react'
import Checked from '@/assets/Icons/Checked'
import Warn from '@/assets/Icons/Warn'
import { Textarea } from '../../ui/textarea'
import { logout } from '@/store/reducers/authSlice'
import { IMAGE_URL } from '@/http'

export default function ProfileInfo() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.profile)
  const [addres, setAddres] = useState(user.addres)
  const [about, setAbout] = useState(user.about)
  const [INN, setINN] = useState<string | undefined>(user.INN)
  const inputRef: React.Ref<HTMLInputElement> = useRef(null)
  const [companyName, setCompanyName] = useState<string | undefined>(
    user.companyName
  )

  return (
    <div className='flex flex-col gap-2 items-center'>
      <Card className='md:w-[500px] w-11/12 mx-auto'>
        <CardHeader className='flex flex-col gap-3'>
          <CardTitle className='flex gap-2 items-center'>
            <div className='text-2xl'>Профиль</div>
            {user.isActivated ? <Checked /> : <Warn />}
          </CardTitle>
        </CardHeader>
        <hr className='py-2' />

        <CardContent className='flex flex-col gap-2'>
          <Avatar>
            <AvatarImage
              className='rounded-xl'
              src={`${IMAGE_URL}${user.logo}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <input
            ref={inputRef}
            hidden
            onChange={(e) => {
              const formData = new FormData()
              if (e.target.files) formData.append('logo', e.target.files[0])
              dispatch(updateLogo({ id: user.id, logo: formData }))
            }}
            type='file'
          />
          <Button
            variant='outline'
            onClick={() => {
              if (inputRef.current) inputRef.current.click()
            }}
          >
            Изменить
          </Button>
          <Label htmlFor='addres'>Адрес</Label>
          <Input
            id='addres'
            placeholder='Адрес'
            value={addres}
            onChange={(e) => setAddres(e.target.value)}
          />
          {user.roles.includes('SELLER') && (
            <>
              <Label htmlFor='inn'>ИНН</Label>
              <Input
                id='inn'
                placeholder='00000000'
                value={INN}
                onChange={(e) => setINN(e.target.value)}
              />
              <Label htmlFor='companyName'>Название магазина</Label>
              <Input
                id='companyName'
                placeholder='iflight'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Label htmlFor='about'>О себе</Label>
              <Textarea
                id='about'
                className='min-h-[150px]'
                placeholder='Расскажите о себе'
                value={about}
                onChange={(e) => {
                  setAbout(e.target.value)
                }}
              />
            </>
          )}
        </CardContent>
        <CardFooter className='flex flex-col gap-2 items-center'>
          <Button
            onClick={() => {
              dispatch(
                updateUser({
                  id: user.id,
                  body: { addres, INN, companyName, about },
                })
              )
            }}
            className='dark w-full'
            variant='outline'
          >
            Сохранить изменения
          </Button>
          <Button
            onClick={() => dispatch(logout())}
            className='dark w-full'
            variant='destructive'
          >
            Выход
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
