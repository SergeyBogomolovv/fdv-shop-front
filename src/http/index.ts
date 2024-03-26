import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const IMAGE_URL = 'http://localhost:5174/'
export const API_URL = 'http://localhost:5174/api/'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accesToken')}`
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<AuthResponse>(
          `${API_URL}auth/refresh`,
          {
            withCredentials: true,
          }
        )
        localStorage.setItem('accesToken', response.data.accesToken)
        return $api.request(originalRequest)
      } catch (er) {
        console.log('не авторизован')
      }
    }
    throw error
  }
)

export default $api
