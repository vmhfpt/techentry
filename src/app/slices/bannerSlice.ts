import { Dispatch, createSlice } from '@reduxjs/toolkit'
import { IBanner } from '@/common/types/banner.interface'
import { createBanner, deleteBanner, getBanner, getListBanner, searchBanner, updateBanner } from '@/services/bannerService'

interface IInitialState {
  banners: IBanner[]
  banner: IBanner | null
  isLoading: boolean
  isLoadingDetails: boolean
}

const initialState: IInitialState = {
  banners: [],
  banner: null,
  isLoading: false,
  isLoadingDetails: false
}

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    isFetching: (state) => {
      state.isLoading = true
    },
    isFetchingDetails: (state) => {
      state.isLoadingDetails = true
    },
    getAllSuccess: (state, { payload }) => {
      state.banners = payload
      state.isLoading = false
    },
    getAllFailure: (state) => {
      state.banners = []
      state.isLoading = false
    },
    getDetailsSuccess: (state, { payload }) => {
      state.banner = payload
      state.isLoadingDetails = false
    },
    getDetailsFailure: (state) => {
      state.banner = null
      state.isLoadingDetails = false
    },
    fetchedDone: (state) => {
      state.isLoading = false
    },
    fetchedDetailsDone: (state) => {
      state.isLoadingDetails = false
    },
    createSuccess: (state, { payload }) => {
      state.banners = [...state.banners, payload]
      state.isLoading = false
    },
    updateSuccess: (state, { payload }) => {
      state.banners = state.banners?.map((banner: IBanner) => (banner.id === payload?.id ? payload : banner))
      state.isLoading = false
    },
    deleteSuccess: (state, { payload }) => {
      state.banners = state.banners?.filter((banner: IBanner) => banner?.id != payload)
      state.isLoading = false
    }
  }
})

// Thunk
export const getAllBanner = () => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const { data } = await getListBanner()
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

export const searchBanners = (q: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching());
  try {
    const { data } = await searchBanner(q);
    if (data) {
      dispatch(getAllSuccess(data));
    }
  } catch (error) {
    console.log(error);
    dispatch(getAllFailure());
  } finally {
    dispatch(fetchedDone());
  }
};

export const getOneBanner = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetchingDetails())
  try {
    const { data } = await getBanner(id)
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

export const createNewBanner = (payload: IBanner) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const response = await createBanner(payload)
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

export const editBanner = (payload: IBanner) => async (dispatch: Dispatch) => {
  
  dispatch(isFetching())
  try {
    const response = await updateBanner(payload)
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

export const removeBanner = (id: string) => async (dispatch: Dispatch) => {
  dispatch(isFetching())
  try {
    const response = await deleteBanner(id)
    if (response.data) {
      dispatch(deleteSuccess(id))
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
} = bannerSlice.actions
export default bannerSlice.reducer
