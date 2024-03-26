import { IProduct, IProductBody } from '@/models/IProduct'
import ProductService from '@/service/Product-Service'
import SellerService from '@/service/Seller-Service'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'sonner'

interface ProductState {
  products: IProduct[]
  totalCount: number
  sellerProductsCount: number
  currentProduct: IProduct
  isLoading: boolean
  myProducts: IProduct[]
}
const initialState: ProductState = {
  products: [],
  currentProduct: {} as IProduct,
  isLoading: false,
  myProducts: [],
  totalCount: 0,
  sellerProductsCount: 0,
}
interface IQuery {
  page: number
  limit: number
}
interface IUpdate {
  id: string
  body: IProductBody
}

export const getByCategory = createAsyncThunk(
  'products/getByCategory',
  async (category: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await ProductService.getByCategory(category)
      dispatch(setProducts(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)

export const getMyProducts = createAsyncThunk(
  'products/getmy',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await SellerService.getSellerProducts(id)
      console.log(response.data)
      dispatch(setMyProducts(response.data.products))
      dispatch(setCount(response.data.count))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const getRandom3Products = createAsyncThunk(
  'products/getrandom',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const allresponse = await ProductService.getManyProducts(1, Infinity)
      const productsCount = allresponse.data.count / 3
      const randomPage = Math.random() * (productsCount - 1) + 1
      const response = await ProductService.getManyProducts(randomPage, 3)
      dispatch(setProducts(response.data.products))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const getManyProducts = createAsyncThunk(
  'products/getmany',
  async (query: IQuery, { dispatch, rejectWithValue }) => {
    try {
      const response = await ProductService.getManyProducts(
        query.page,
        query.limit
      )
      dispatch(setProducts(response.data.products))
      dispatch(setCount(response.data.count))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const getCurrentProduct = createAsyncThunk(
  'product/getOne',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await ProductService.getOneProduct(id)
      dispatch(setCurrentProduct(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const updateProductImage = createAsyncThunk(
  'product/changeimage',
  async (
    args: { id: string; image: FormData },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await ProductService.updateProductImage(
        args.id,
        args.image
      )
      dispatch(changeProduct(response.data))
      toast(`Товар ${response.data.title} изменен`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const addSecondImage = createAsyncThunk(
  'product/addSecondImage',
  async (
    args: { id: string; image: FormData },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await ProductService.addSecondImage(args.id, args.image)
      dispatch(changeProduct(response.data))
      toast(`Товар ${response.data.title} изменен`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const deleteSecondImage = createAsyncThunk(
  'product/deleteSecondImage',
  async (
    args: { id: string; image: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await ProductService.deleteSecondImage(
        args.id,
        args.image
      )
      dispatch(changeProduct(response.data))
      toast(`Товар ${response.data.title} изменен`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const updateProduct = createAsyncThunk(
  'product/change',
  async (args: IUpdate, { dispatch, rejectWithValue }) => {
    try {
      const response = await ProductService.updateProduct(args.id, args.body)
      dispatch(changeProduct(response.data))
      toast(`Товар ${response.data.title} изменен`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const removeProduct = createAsyncThunk(
  'products/delete',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await ProductService.deleteProduct(id)
      dispatch(deleteProduct(response.data))
      toast(`Товар ${response.data.title} удален`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const createProduct = createAsyncThunk(
  'products/create',
  async (body: FormData, { dispatch, rejectWithValue }) => {
    try {
      const response = await ProductService.addProduct(body)
      dispatch(addProduct(response.data))
      toast(`Товар ${response.data.title} добавлен`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
    setSellerCount: (state, action: PayloadAction<number>) => {
      state.sellerProductsCount = action.payload
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
    setMyProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.myProducts = action.payload
    },
    setCurrentProduct: (state, action: PayloadAction<IProduct>) => {
      state.currentProduct = action.payload
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.myProducts = [...state.myProducts, action.payload]
    },
    deleteProduct: (state, action: PayloadAction<IProduct>) => {
      state.myProducts = state.myProducts.filter(
        (product) => product._id !== action.payload._id
      )
    },
    changeProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.myProducts.findIndex(
        (p) => p._id === action.payload._id
      )
      state.myProducts[index] = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(getCurrentProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCurrentProduct.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getCurrentProduct.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(getByCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getByCategory.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getByCategory.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(getManyProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getManyProducts.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getManyProducts.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(getRandom3Products.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getRandom3Products.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getRandom3Products.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(getMyProducts.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getMyProducts.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(getMyProducts.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const {
  setProducts,
  setCurrentProduct,
  addProduct,
  deleteProduct,
  changeProduct,
  setMyProducts,
  setCount,
  setSellerCount,
} = productSlice.actions
export default productSlice.reducer
