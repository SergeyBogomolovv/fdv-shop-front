import { IUser } from '@/models/IUser'
import UserService from '@/service/User-Service'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'sonner'

interface UserState {
  users: IUser[]
  currentUser: IUser
  isLoading: boolean
}

const initialState: UserState = {
  users: [],
  currentUser: {} as IUser,
  isLoading: false,
}

export const getUsers = createAsyncThunk(
  'user/getall',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await UserService.getAllUsers()
      dispatch(setUsers(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)

export const removeUser = createAsyncThunk(
  'user/delete',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await UserService.deleteUser(id)
      dispatch(deleteUser(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)

export const getOneUser = createAsyncThunk(
  'user/delete',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await UserService.getOneUser(id)
      dispatch(setCurrentUser(response.data))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) toast(error.response.data.message)
      }
      rejectWithValue(error)
    }
  }
)
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload
    },
    deleteUser: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id)
    },
  },
})

export const { setUsers, setCurrentUser, deleteUser } = userSlice.actions
export default userSlice.reducer
