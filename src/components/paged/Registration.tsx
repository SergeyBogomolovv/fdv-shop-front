import { Button } from '@/components/ui/button'
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
import { useRef } from 'react'

interface Props {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  registrationhandler: () => void
  logo: File | null
  setLogo: React.Dispatch<React.SetStateAction<File | null>>
  addres: string
  setAddres: React.Dispatch<React.SetStateAction<string>>
}
export default function Registration({
  email,
  setEmail,
  password,
  setPassword,
  registrationhandler,
  logo,
  setLogo,
  addres,
  setAddres,
}: Props) {
  const inputRef: React.Ref<HTMLInputElement> = useRef(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-bold'>Регистрация</CardTitle>
        <CardDescription>
          Зарегистрируйтесь используя почту, после регистрации на нее вам придет
          письмо с подтверждением
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='email'>Почта</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id='email'
            placeholder='example@gmail.com'
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='password'>Пароль</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id='password'
            placeholder='Пароль'
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='addres'>Адрес</Label>
          <Input
            value={addres}
            onChange={(e) => setAddres(e.target.value)}
            id='addres'
            placeholder='Адрес'
          />
        </div>

        <div className='space-y-1'>
          <Label htmlFor='logo'>Аватарка</Label>
          <Button
            id='logo'
            className='w-full'
            onClick={() => {
              if (inputRef.current) inputRef.current.click()
            }}
            variant='outline'
          >
            {logo ? 'Поменять' : 'Выбрать'}
          </Button>
          <input
            ref={inputRef}
            hidden
            onChange={(e) => {
              if (e.target.files) setLogo(e.target.files[0])
            }}
            id='logo'
            type='file'
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={registrationhandler} className='w-full'>
          Зарегистрироваться
        </Button>
      </CardFooter>
    </Card>
  )
}
