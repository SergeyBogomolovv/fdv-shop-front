import { Auth } from '@/components/paged/Profile/Auth'
import { useAppSelector } from '@/store/hooks'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BeASeller } from '@/components/paged/Profile/BeASeller'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileInfo from '@/components/paged/Profile/ProfileInfo'
import { MyProducts } from '@/components/paged/Profile/MyProducts'
import Basket from '@/components/paged/Profile/Basket'
import { Navigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Orders } from '@/components/paged/Profile/Orders'

export default function Profile() {
  const { user } = useAppSelector((state) => state.profile)
  const { isAuth } = useAppSelector((state) => state.auth)
  const { profilePage } = useParams()

  return (
    <div>
      {isAuth ? (
        <>
          {!user.isActivated && (
            <Alert className='w-10/12 mx-auto mt-5' variant='destructive'>
              <AlertTitle>Внимание!</AlertTitle>
              <AlertDescription>
                Подтвердите учетную запись через письмо которое пришло вам на
                почту
              </AlertDescription>
            </Alert>
          )}
          <Tabs
            defaultValue={'info'}
            value={profilePage}
            className='w-full mx-auto container py-5 dark'
          >
            <TabsList className='mx-auto w-8/12 flex flex-col gap-2 h-full sm:gap-0 sm:flex-row mb-5'>
              <Link className='w-full' to='/profile/info'>
                <TabsTrigger className='w-full' value='info'>
                  Информация
                </TabsTrigger>
              </Link>
              <Link className='w-full' to='/profile/basket'>
                <TabsTrigger className='w-full' value='basket'>
                  Корзина
                </TabsTrigger>
              </Link>
              <Link className='w-full' to='/profile/orders'>
                <TabsTrigger className='w-full' value='orders'>
                  Заказы
                </TabsTrigger>
              </Link>
              {user.roles.includes('SELLER') ? (
                <Link className='w-full' to='/profile/tovars'>
                  <TabsTrigger className='w-full' value='tovars'>
                    Мои товары
                  </TabsTrigger>
                </Link>
              ) : (
                <Link
                  className='w-full'
                  to={user.isActivated ? '/profile/beAseller' : '/profile'}
                >
                  <TabsTrigger
                    className='w-full'
                    disabled={!user.isActivated}
                    value='beAseller'
                  >
                    Стать продавцом
                    {user.roles.includes('SELLER') && (
                      <Navigate to='/profile/tovars' />
                    )}
                  </TabsTrigger>
                </Link>
              )}
            </TabsList>
            <TabsContent value='info'>
              <ProfileInfo />
            </TabsContent>
            <TabsContent value='basket'>
              <Basket />
            </TabsContent>
            <TabsContent value='tovars'>
              <MyProducts />
            </TabsContent>
            <TabsContent value='beAseller'>
              <BeASeller />
            </TabsContent>
            <TabsContent value='orders'>
              <Orders />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Auth />
      )}
    </div>
  )
}
