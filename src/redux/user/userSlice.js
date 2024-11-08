import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

//khoi tao gia tri initialState slice redux
const initialState = {
  currentUser: null
}

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/rtk-query/usage/migrating-to-rtk-query#implementation-using-createslice--createasyncthunk
export const loginUserAPI = createAsyncThunk(
  'board/loginUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login/`, data)
    toast.success('Welcome! You\u0027ve successfully logged in.')
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'board/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/logout/`)
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return response.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'board/updateUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/update/`, data)
    return response.data
  }
)

//Khoi tao mot slice trong kho luu tru - Redux store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  //Extrareducers: Noi xu li du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      //Day chinh la response.data trng ham callAPI phia tren
      let user = action.payload
      state.currentUser = user
    }),
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    }),
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// Actions: La nơi dành cho các components bên dưới gọi bằng dispatch() tới nó đe cập nhật lại dữ liệu thông qua reducer (chạy đồng độ)
// // Đe ý ở trên thì không thây properties actions dau cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer.
// export const {  } = userSlice.actions

// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook usesSelector() đe lay dữ liệu từ trong kho redux store ra su dụng
export const selectCurrentUser = ( state ) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer