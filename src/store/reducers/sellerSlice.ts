import { IProduct } from '@/models/IProduct'
import { ISeller } from '@/models/ISeller'
import { SellerProducts } from '@/models/args/products'
import SellerService from '@/service/Seller-Service'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface SellerState {
  sellers: ISeller[]
  currentSeller: ISeller
  isLoading: boolean
  products: IProduct[]
  allProducts: IProduct[]
  count: number
}

const initialState: SellerState = {
  sellers: [],
  currentSeller: {} as ISeller,
  isLoading: false,
  products: [],
  allProducts: [],
  count: 0,
}

export const getSellers = createAsyncThunk(
  'seller/getall',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await SellerService.getAllSellers()
      dispatch(setSellers(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) console.error(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const removeSeller = createAsyncThunk(
  'seller/delete',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await SellerService.deleteSeller(id)
      dispatch(deleteSeller(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) console.error(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const getOneSeller = createAsyncThunk(
  'seller/getOne',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await SellerService.getOneSeller(id)
      dispatch(setCurrentSeller(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) console.error(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const getAllSellerProducts = createAsyncThunk(
  'seller/getAll',
  async (args: SellerProducts, { dispatch, rejectWithValue }) => {
    try {
      const response = await SellerService.getSellerProducts(args.sellerId)
      dispatch(setAllProducts(response.data.products))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) console.error(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const getSellersProducts = createAsyncThunk(
  'seller/getproducts',
  async (args: SellerProducts, { dispatch, rejectWithValue }) => {
    try {
      const response = await SellerService.getSellerProducts(
        args.sellerId,
        args.limit,
        args.page
      )
      dispatch(setProducts(response.data.products))
      dispatch(setCount(response.data.count))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) console.error(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload
    },
    setSellers: (state, action: PayloadAction<ISeller[]>) => {
      state.sellers = action.payload
    },
    setCurrentSeller: (state, action: PayloadAction<ISeller>) => {
      state.currentSeller = action.payload
    },
    deleteSeller: (state, action: PayloadAction<ISeller>) => {
      state.sellers = state.sellers.filter(
        (seller) => seller.id !== action.payload.id
      )
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
    setAllProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.allProducts = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(getSellers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSellers.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getSellers.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(getOneSeller.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getOneSeller.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getOneSeller.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(getAllSellerProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllSellerProducts.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getAllSellerProducts.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(getSellersProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSellersProducts.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getSellersProducts.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const {
  setSellers,
  setAllProducts,
  setCurrentSeller,
  deleteSeller,
  setProducts,
  setCount,
} = sellerSlice.actions
export default sellerSlice.reducer
