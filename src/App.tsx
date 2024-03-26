import { Route, Routes } from 'react-router'
import Layout from './assets/Layout'
import Main from './pages/Main'
import Profile from './pages/Profile'
import AdminBoard from './pages/AdminBoard'
import SellerProfile from './pages/SellerProfile'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import SortByCategory from './pages/SortByCategory'
import ProductPage from './pages/ProductPage'
import { checkAuth } from './store/reducers/authSlice'
import { getBasket } from './store/reducers/basketSlice'

function App() {
  const { user } = useAppSelector((state) => state.profile)
  const { isAuth } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (localStorage.getItem('accesToken')) dispatch(checkAuth())
  }, [])
  useEffect(() => {
    if (isAuth) dispatch(getBasket(user.id))
  }, [isAuth])

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path=':category' element={<SortByCategory />} />
          <Route path='product/:id' element={<ProductPage />} />
          <Route path='seller/:id' element={<SellerProfile />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile/:profilePage' element={<Profile />} />
          <Route path='profile/:profilePage' element={<Profile />} />
          <Route path='profile/:profilePage' element={<Profile />} />
          <Route path='admin' element={<AdminBoard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
