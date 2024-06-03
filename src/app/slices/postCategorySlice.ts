import { IPostCategory } from '@/common/types/category.interface'
import {
  createPostCategory,
  deletePostCategory,
  getListPostCategory,
  getPostCategory,
  searchPostCategory,
  updatePostCategory
} from '@/services/postCategoryService'
import { Dispatch, createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  postCategories: IPostCategory[]
  postCategory: IPostCategory | null
  isLoading: boolean
  isLoadingDetails: boolean
}

const initialState: IInitialState = {
  postCategories: [],
  postCategory: null,
  isLoading: false,
  isLoadingDetails: false
}

const postCategorySlice = createSlice({
  name: 'post-category',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    isFetchingDetails: (state) => {
      state.isLoadingDetails = true
    },
    getAllSuccess: (state, { payload }) => {
      state.postCategories = payload
      state.isLoading = false
    },
    getAllFailure: (state) => {
      state.postCategories = []
      state.isLoading = false
    },
    getDetailsSuccess: (state, { payload }) => {
      state.postCategory = payload
      state.isLoadingDetails = false
    },
    getDetailsFailure: (state) => {
      state.postCategory = null
      state.isLoadingDetails = false
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    fetchedDetailsDone: (state) => {
      state.isLoadingDetails = false
    },
    createSuccess: (state, { payload }) => {
      state.postCategories = [...state.postCategories, payload]
      state.isLoading = false
    },
    updateSuccess: (state, { payload }) => {
      state.postCategories = state.postCategories?.map((category: IPostCategory) =>
        category.id === payload?.id ? payload : category
      )
      state.isLoading = false
    },
    deleteSuccess: (state, { payload }) => {
      state.postCategories = state.postCategories?.filter((category: IPostCategory) => category?.id !== payload?.id)
      state.isLoading = false
    }
  }
})

// Thunk
export const getAllPostCategory = () => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const { data } = await getListPostCategory()
    if (data) {
      dispatch(getAllSuccess(data))
    }
  } catch (error) {
    console.log(error)
    dispatch(getAllFailure())
  } finally {
    dispatch(fetchedDone())
  }
}

export const searchPostCategories = (q: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const { data } = await searchPostCategory(q)
    if (data) {
      dispatch(getAllSuccess(data))
    }
  } catch (error) {
    console.log(error)
    dispatch(getAllFailure())
  } finally {
    dispatch(fetchedDone())
  }
}

export const getOnePostCategory = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetchingDetails())
  try {
    const { data } = await getPostCategory(id)
    if (data) {
      dispatch(getDetailsSuccess(data))
    }
  } catch (error) {
    console.log(error)
    dispatch(getDetailsFailure())
  } finally {
    dispatch(fetchedDetailsDone())
  }
}

export const createNewPostCategory = (payload: IPostCategory) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const response = await createPostCategory(payload)
    if (response.data) {
      dispatch(createSuccess(response.data))
      return { success: true }
    }
    return { success: false }
  } catch (error) {
    console.log(error)
    return { success: false, error }
  } finally {
    dispatch(fetchedDone())
  }
}

export const editPostCategory = (payload: IPostCategory) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const response = await updatePostCategory(payload)
    if (response.data) {
      dispatch(updateSuccess(response.data))
      return { success: true }
    }
    return { success: false }
  } catch (error) {
    console.log(error)
    return { success: false, error }
  } finally {
    dispatch(fetchedDone())
  }
}

export const removePostCategory = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const response = await deletePostCategory(id)
    if (response.data) {
      dispatch(deleteSuccess(response.data))
      return { success: true }
    }
    return { success: false }
  } catch (error) {
    console.log(error)
    return { success: false, error }
  } finally {
    dispatch(fetchedDone())
  }
}

export const {
  isFetching,
  isFetchingDetails,
  getAllSuccess,
  getDetailsSuccess,
  getDetailsFailure,
  getAllFailure,
  fetchedDone,
  fetchedDetailsDone,
  createSuccess,
  updateSuccess,
  deleteSuccess
} = postCategorySlice.actions
export default postCategorySlice.reducer
