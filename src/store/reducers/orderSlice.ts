import { orderArgs } from '@/models/args/profile'
import OrderService from '@/service/Order-Service'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from './profileSlice'
import { IHistory } from '@/models/IHistory'

interface OrderState {
  count: number
  orders: IHistory[]
  isLoading: boolean
}

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  count: 0,
}

export const getOrderCount = createAsyncThunk(
  'order/getCount',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await OrderService.getCount()
      dispatch(setCount(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const getAllOrders = createAsyncThunk(
  'order/getAll',
  async (page: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await OrderService.getAllOrders(page)
      dispatch(setOrders(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const clearOrders = createAsyncThunk(
  'order/clearOrders',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await OrderService.clearOrders(id)
      dispatch(setUser(response.data))
      toast('История заказов очищена')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const orderProduct = createAsyncThunk(
  'order/orderProduct',
  async (body: orderArgs, { rejectWithValue, dispatch }) => {
    try {
      const response = await OrderService.orderProduct(
        body.productId,
        body.userId,
        body.message
      )
      dispatch(setUser(response.data))
      toast('Заказ создан')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IHistory[]>) => {
      state.orders = action.payload
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(clearOrders.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(clearOrders.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(clearOrders.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(orderProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(orderProduct.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(orderProduct.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const { setOrders, setCount } = orderSlice.actions
export default orderSlice.reducer
