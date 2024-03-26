import { API_URL } from '@/http'
import { ICategory } from '@/models/ICategory'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'

interface CategoryState {
  categories: ICategory[]
}

const initialState: CategoryState = {
  categories: [],
}
export const getCategories = createAsyncThunk(
  'category/getall',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response: AxiosResponse<ICategory[]> = await axios.get(
        `${API_URL}categories`
      )
      dispatch(setCategories(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) console.error(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload
    },
  },
})

export const { setCategories } = categorySlice.actions
export default categorySlice.reducer
