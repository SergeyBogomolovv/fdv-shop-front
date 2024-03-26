import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUpdateLogo, IUpdateUser, IUser } from '../../models/IUser'
import axios from 'axios'
import UserService from '@/service/User-Service'
import { beAdminArgs, beASellerArgs } from '@/models/args/profile'
import { toast } from 'sonner'

interface AuthState {
  user: IUser
  isLoading: boolean
}

const initialState: AuthState = {
  user: {} as IUser,
  isLoading: false,
}

export const beAdmin = createAsyncThunk(
  'profile/beAdmin',
  async (body: beAdminArgs, { rejectWithValue, dispatch }) => {
    try {
      const response = await UserService.beAdmin(body.id, body.message)
      dispatch(setUser(response.data))
      toast('Вы теперь администратор')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const beASeller = createAsyncThunk(
  'profile/beaseller',
  async (body: beASellerArgs, { rejectWithValue, dispatch }) => {
    try {
      const response = await UserService.beASeller(
        body.id,
        body.INN,
        body.companyName,
        body.about
      )
      dispatch(setUser(response.data))
      toast('Вы теперь продавец')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)

export const updateUser = createAsyncThunk(
  'profile/update',
  async (body: IUpdateUser, { rejectWithValue, dispatch }) => {
    try {
      if (body.id) {
        const response = await UserService.updateUser(body.id, body.body)
        dispatch(updateProfile(response.data))
        toast('Изменения сохранены')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const updateLogo = createAsyncThunk(
  'profile/updateLogo',
  async (body: IUpdateLogo, { rejectWithValue, dispatch }) => {
    try {
      if (body.id) {
        const response = await UserService.updateLogo(body.id, body.logo)
        dispatch(updateProfile(response.data))
        toast('Аватарка обновлена')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    updateProfile: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateUser.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateUser.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const { setUser, updateProfile } = profileSlice.actions
export default profileSlice.reducer
