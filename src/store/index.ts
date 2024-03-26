import { combineReducers, configureStore } from '@reduxjs/toolkit'
import profileSlice from './reducers/profileSlice'
import productSlice from './reducers/productSlice'
import sellerSlice from './reducers/sellerSlice'
import userSlice from './reducers/userSlice'
import categorySlice from './reducers/categorySlice'
import orderSlice from './reducers/orderSlice'
import authSlice from './reducers/authSlice'
import basketSlice from './reducers/basketSlice'

const rootReducer = combineReducers({
  profile: profileSlice,
  product: productSlice,
  sellers: sellerSlice,
  users: userSlice,
  categories: categorySlice,
  orders: orderSlice,
  auth: authSlice,
  basket: basketSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
