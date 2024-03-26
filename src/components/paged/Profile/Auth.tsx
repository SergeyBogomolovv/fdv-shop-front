import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppDispatch } from '@/store/hooks'
import { useState } from 'react'
import Login from '../Login'
import Registration from '../Registration'
import { login, registration } from '@/store/reducers/authSlice'
import { toast } from 'sonner'

export function Auth() {
  const dispatch = useAppDispatch()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [addres, setAddres] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  return (
    <div className='p-10 flex justify-center'>
      <Tabs defaultValue='login' className='w-[400px] dark'>
        <TabsList
          className='grid w-full grid-cols-2'
          onClick={() => {
            setEmail('')
            setPassword('')
          }}
        >
          <TabsTrigger value='login'>Вход</TabsTrigger>
          <TabsTrigger value='registration'>Регистрация</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <Login
            email={email}
            setEmail={setEmail}
            setPassword={setPassword}
            password={password}
            loginhandler={loginhandler}
          />
        </TabsContent>
        <TabsContent value='registration'>
          <Registration
            email={email}
            setEmail={setEmail}
            setPassword={setPassword}
            password={password}
            registrationhandler={registrationhandler}
            addres={addres}
            setAddres={setAddres}
            setLogo={setLogo}
            logo={logo}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
  function loginhandler() {
    dispatch(login({ email, password }))
    setEmail('')
    setPassword('')
  }
  function registrationhandler() {
    if (logo) {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      formData.append('logo', logo)
      formData.append('addres', addres)
      dispatch(registration(formData))
      setEmail('')
      setPassword('')
      setAddres('')
      setLogo(null)
    } else {
      toast('Заполните все данные')
    }
  }
}
