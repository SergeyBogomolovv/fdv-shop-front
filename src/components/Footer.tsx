import { useAppSelector } from '@/store/hooks'
import BeAdminDialog from './paged/BeAdminDialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import tg from '/Telegram_logo.svg.png'

export default function Footer() {
  const { user } = useAppSelector((state) => state.profile)

  return (
    <>
      <div className='w-full py-4 flex justify-between px-10 bg-black items-center'>
        <div className='flex items-center gap-10'>
          <a href='https://t.me/grekassoq' className='flex items-center gap-2'>
            <Avatar className='w-6 h-6'>
              <AvatarImage src={tg} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='text-sm text-neutral-500 hover:text-white'>
              Телеграмм
            </div>
          </a>
          {user.isActivated && !user.roles.includes('ADMIN') && (
            <BeAdminDialog />
          )}
        </div>

        <div className='text-sm text-neutral-500'>© Gerax 2024</div>
      </div>
    </>
  )
}
