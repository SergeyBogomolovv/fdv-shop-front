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
interface Props {
  email: string
  setEmail: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  loginhandler: () => void
}
export default function Login({
  email,
  setEmail,
  password,
  setPassword,
  loginhandler,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-bold'>Вход</CardTitle>
        <CardDescription>Войдите в аккаунт вашу почту и пароль</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            placeholder='Введите почту'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='Password'>Пароль</Label>
          <Input
            id='Password'
            type='password'
            placeholder='Введите пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={loginhandler} className='w-full'>
          Вход
        </Button>
      </CardFooter>
    </Card>
  )
}
