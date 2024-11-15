import { createSlice } from '@reduxjs/toolkit'

//khoi tao gia tri initialState slice redux
const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },
    clearAndHideActiveCard: (state) => {
      state.currentActiveCard = null,
      state.isShowModalActiveCard = false
    },
    updateCurrentActiveCard: (state, action) => {
      state.currentActiveCard = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
// Actions: La nơi dành cho các components bên dưới gọi bằng dispatch() tới nó đe cập nhật lại dữ liệu thông qua reducer (chạy đồng độ)
// Đe ý ở trên thì không thây properties actions dau cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer.
export const { updateCurrentActiveCard, clearAndHideActiveCard, showModalActiveCard } = activeCardSlice.actions
// export const { clearActiveCard } = activeCardSlice.actions

// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook usesSelector() đe lay dữ liệu từ trong kho redux store ra su dụng

export const selectCurrentActiveCard = ( state ) => {
  return state.activeCard.currentActiveCard
}

export const selectIsShowModalActiveCard = ( state ) => {
  return state.activeCard.isShowModalActiveCard
}

export const activeCardReducer = activeCardSlice.reducer