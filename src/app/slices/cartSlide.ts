import { createSlice, Dispatch, ThunkDispatch, ThunkAction } from '@reduxjs/toolkit'
import { ISignin, ISignup } from '@/common/types/Auth.interface'
import { LogoutService, SigninService } from '@/services/AuthService'
import { AxiosError } from 'axios'
import { ErrorResponse } from 'react-router-dom'
import { addCartService, deleteCartService, GetAllCartService, updateCartService } from '@/services/CartService'
import { IAddCart } from '@/common/types/cart.interface'
import { AnyAction } from 'redux'
import { RootState } from '../store'
interface ICart {
  id: number
  user_id: number
  quantity: number
  created_at: string
  updated_at: string
  product_attr_id: number
}
interface IInitialState {
  carts: ICart[]
}

const initialState: IInitialState = {
  carts: []
}

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    getAllSuccess: (state, { payload }) => {
      state.carts = payload
    },
    login: (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload?.result?.data))
      localStorage.setItem('access_token', payload.result?.access_token)
      localStorage.setItem('token_type', payload.result?.token_type)
      // state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
      localStorage.removeItem('token_type')
      // state.isAuthenticated = false;
    },
    loadAuthState: (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload?.result?.data))
      // state.isAuthenticated = true;
    },
    setIsAuthenticated: (state) => {
      // state.isAuthenticated = !state.isAuthenticated
    }
  }
})

export const GetAllCart = (payload: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await GetAllCartService(payload)

    if (data && data.success == true) {
      return data
    }
  } catch (error) {
    return {
      success: false,
      message: 'Request failed'
    }
  }
}

export const AddToCart = (payload: IAddCart) => async (dispatch: Dispatch) => {
  try {
    const { data } = await addCartService(payload)

    if (data && data.success == true) {
      return data
    }

  } catch (error) {
    return {
      success: false,
      message: 'Không thể thêm vào giỏ hàng'
    }
  }
}

export const UpdateCart = (payload: { id: number; quantity: number; token: string }) => async (dispatch: Dispatch) => {
  try {
    const { data } = await updateCartService(payload)

    if (data && data.success == true) {
      return data
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>

    if (axiosError?.response?.status == 422) {
      return axiosError?.response?.data
    }

    return {
      success: false,
      result: {
        message: 'Request failed'
      }
    }
  }
}

export const DeleteCart = (payload: { id: number; token: string }) => async (dispatch: Dispatch) => {
  try {
    const { data } = await deleteCartService(payload)

    if (data && data.success == true) {
      return data
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>

    if (axiosError?.response?.status == 422) {
      return axiosError?.response?.data
    }

    return {
      success: false,
      result: {
        message: 'Request failed'
      }
    }
  }
}

export const { getAllSuccess, login, logout, loadAuthState, setIsAuthenticated } = cartSlice.actions

export default cartSlice.reducer
