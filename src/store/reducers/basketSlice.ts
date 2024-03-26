import { IOrder } from '@/models/IOrder'
import { IProduct } from '@/models/IProduct'
import ProductService from '@/service/Product-Service'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'sonner'
interface ProductState {
  isLoading: boolean
  basket: IOrder[]
}
const initialState: ProductState = {
  isLoading: false,
  basket: [],
}
interface IBasket {
  productId: string
  userId: string
}

export const getBasket = createAsyncThunk(
  'products/getBasker',
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await ProductService.getBasket(userId)
      dispatch(setBasket(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const addToBasket = createAsyncThunk(
  'products/addBasket',
  async (args: IBasket, { dispatch, rejectWithValue }) => {
    try {
      const response = await ProductService.addToBasket(
        args.productId,
        args.userId
      )
      dispatch(addBasket(response.data))
      toast(`Товар ${response.data.title} добавлен в корзину`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)

export const removeFromBasket = createAsyncThunk(
  'products/removeBasket',
  async (args: IBasket, { dispatch, rejectWithValue }) => {
    try {
      const response = await ProductService.deleteFromBasket(
        args.productId,
        args.userId
      )
      dispatch(deleteBasket(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<IOrder[]>) => {
      state.basket = action.payload
    },
    addBasket: (state, action: PayloadAction<IOrder>) => {
      state.basket = [...state.basket, action.payload]
    },
    deleteBasket: (state, action: PayloadAction<IProduct>) => {
      state.basket = state.basket.filter(
        (productId) => productId._id != action.payload._id
      )
    },
  },
  extraReducers(builder) {
    builder.addCase(getBasket.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getBasket.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getBasket.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(addToBasket.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addToBasket.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(addToBasket.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(removeFromBasket.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(removeFromBasket.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(removeFromBasket.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const { setBasket, addBasket, deleteBasket } = basketSlice.actions
export default basketSlice.reducer
