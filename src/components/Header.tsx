import Logo from '@/assets/Icons/Logo'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Gerax from '@/assets/Icons/Gerax'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { useEffect, useState } from 'react'
import { getCategories } from '@/store/reducers/categorySlice'
import { Separator } from '@/components/ui/separator'
import ProductService from '@/service/Product-Service'
import { IProduct } from '@/models/IProduct'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { IMAGE_URL } from '@/http'

export default function Header() {
  const { isAuth } = useAppSelector((state) => state.auth)
  const { user } = useAppSelector((state) => state.profile)
  const { categories } = useAppSelector((state) => state.categories)
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([])
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className='w-full py-3 flex justify-between px-32 bg-[#0A0A0A] items-center'>
      <div className='flex items-center gap-8'>
        <Link
          to='/'
          className='lg:text-3xl text-xl font-ProtestRiot font-light flex items-center gap-2'
        >
          <Gerax />
          Gerax Fpv
        </Link>
        <NavigationMenu className='dark'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Категории</NavigationMenuTrigger>
              <NavigationMenuContent className='flex flex-col'>
                {categories.map((category) => (
                  <>
                    <Link
                      to={`/${category.value}`}
                      className='dark w-full text-sm p-3 hover:bg-zinc-900'
                    >
                      {category.value}
                    </Link>
                    <Separator className='dark text-white' />
                  </>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Поиск</NavigationMenuTrigger>
              <NavigationMenuContent>
                <Command className='dark w-[200px]'>
                  <CommandInput
                    onValueChange={async (val) => {
                      const response = await ProductService.findProduct(val)
                      setSearchedProducts(response.data)
                    }}
                    placeholder='Поиск'
                    className='dark h-9'
                    onKeyDown={async () => {}}
                  />
                  <CommandEmpty className='dark p-1'>Не найдено.</CommandEmpty>
                  {!!searchedProducts.length && (
                    <CommandGroup className='dark'>
                      {searchedProducts.map((product) => (
                        <CommandItem key={product._id} value={product.title}>
                          <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                          >
                            {product.title}
                          </Link>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </Command>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to={isAuth ? '/profile/basket' : '/profile'}
                className='dark w-full text-sm p-3 hover:bg-zinc-900'
              >
                Корзина
              </Link>
            </NavigationMenuItem>
            {user.roles && user.roles.includes('SELLER') && (
              <NavigationMenuItem>
                <Link
                  to={isAuth ? '/profile/tovars' : '/profile'}
                  className='dark w-full text-sm p-3 hover:bg-zinc-900'
                >
                  Мои товары
                </Link>
              </NavigationMenuItem>
            )}
            {user.roles && user.roles.includes('ADMIN') && (
              <NavigationMenuItem>
                <Link
                  to='/admin'
                  className='dark w-full text-sm p-3 hover:bg-zinc-900'
                >
                  Администратор
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isAuth ? (
        <Link to='profile' className='stroke-white flex gap-3 items-center'>
          <Avatar className='dark'>
            <AvatarImage src={`${IMAGE_URL}${user.logo}`} />
            <AvatarFallback>FPV</AvatarFallback>
          </Avatar>
          <div className='font-semibold text-xl'>Профиль</div>
        </Link>
      ) : (
        <Link to='profile' className='stroke-white flex gap-2 items-center'>
          <Logo /> <div className='font-semibold text-xl'>Вход</div>
        </Link>
      )}
    </div>
  )
}
