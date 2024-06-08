import { IPost, IPrams } from '@/common/types/post.interface'
import { createPost, deletePost, getListPost, getPost, searchPost, updatePost } from '@/services/postService'
import { Dispatch, createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  posts: IPost[]
  post: IPost | null
  isLoading: boolean
  isLoadingDetails: boolean
}

const initialState: IInitialState = {
  posts: [],
  post: null,
  isLoading: false,
  isLoadingDetails: false
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    isFetchingDetails: (state) => {
      state.isLoadingDetails = true
    },
    getAllSuccess: (state, { payload }) => {
      state.posts = payload
      state.isLoading = false
    },
    getAllFailure: (state) => {
      state.posts = []
      state.isLoading = false
    },
    getDetailsSuccess: (state, { payload }) => {
      state.post = payload
      state.isLoadingDetails = false
    },
    getDetailsFailure: (state) => {
      state.post = null
      state.isLoadingDetails = false
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    fetchedDetailsDone: (state) => {
      state.isLoadingDetails = false
    },
    createSuccess: (state, { payload }) => {
      state.posts = [...state.posts, payload]
      state.isLoading = false
    },
    updateSuccess: (state, { payload }) => {
      state.posts = state.posts?.map((post: IPost) => (post.id === payload?.id ? payload : post))
      state.isLoading = false
    },
    deleteSuccess: (state, { payload }) => {
      state.posts = state.posts?.filter((post: IPost) => post?.id !== payload?.id)
      state.isLoading = false
    }
  }
})

// Thunk
export const getAllPost = (params?: IPrams) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const { data } = await getListPost(params)
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

export const searchPosts = (q: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const { data } = await searchPost(q)
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

export const getOnePost = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetchingDetails())
  try {
    const { data } = await getPost(id)
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

export const createNewPost = (payload: IPost) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const response = await createPost(payload)
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

export const editPost = (payload: IPost) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const response = await updatePost(payload)
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

export const removePost = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const response = await deletePost(id)
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
} = postSlice.actions
export default postSlice.reducer
