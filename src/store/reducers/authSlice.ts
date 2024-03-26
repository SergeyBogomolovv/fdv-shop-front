import { IUser } from '@/models/IUser'
import { loginArgs } from '@/models/args/profile'
import AuthService from '@/service/Auth-Service'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from './profileSlice'
import { AuthResponse } from '@/models/response/AuthResponse'
import { API_URL } from '@/http'

interface AuthState {
  isAuth: boolean
  isLoading: boolean
  isLogining: boolean
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  isLogining: false,
}
export const checkAuth = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}auth/refresh`, {
        withCredentials: true,
      })
      localStorage.setItem('accesToken', response.data.accesToken)
      dispatch(setUser(response.data.user))
      dispatch(setAuth(true))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) console.error(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
export const login = createAsyncThunk(
  'auth/login',
  async (auth: loginArgs, { rejectWithValue, dispatch }) => {
    try {
      const response = await AuthService.login(auth.email, auth.password)
      localStorage.setItem('accesToken', response.data.accesToken)
      dispatch(setAuth(true))
      dispatch(setUser(response.data.user))
      console.log(response.data.user)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)

export const registration = createAsyncThunk(
  'auth/registration',
  async (body: FormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await AuthService.registration(body)
      dispatch(setAuth(true))
      localStorage.setItem('accesToken', response.data.accesToken)
      dispatch(setUser(response.data.user))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await AuthService.logout()
      dispatch(setAuth(false))
      dispatch(setUser({} as IUser))
      localStorage.removeItem('accesToken')
      toast('Вы успешно вышли из профиля')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(checkAuth.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(login.pending, (state) => {
      state.isLogining = true
    })
    builder.addCase(login.fulfilled, (state) => {
      state.isLogining = false
    })
    builder.addCase(login.rejected, (state) => {
      state.isLogining = false
    })
    builder.addCase(registration.pending, (state) => {
      state.isLogining = true
    })
    builder.addCase(registration.fulfilled, (state) => {
      state.isLogining = false
    })
    builder.addCase(registration.rejected, (state) => {
      state.isLogining = false
    })
  },
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer
