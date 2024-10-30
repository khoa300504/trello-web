import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { isEmpty } from 'lodash'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/fomartter'
import { mapOrder } from '~/utils/sorts'

//khoi tao gia tri initialState slice redux
const initialState = {
  currentActiveBoard: null
}

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
// https://redux-toolkit.js.org/rtk-query/usage/migrating-to-rtk-query#implementation-using-createslice--createasyncthunk
export const fetchBoardDetailsAPI = createAsyncThunk(
  'board/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)

//Khoi tao mot slice trong kho luu tru - Redux store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    // Lưu ý luôn là ở đây luôn luôn cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux:
    // https://redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    updateCurrentActiveBoard: (state, action) => {
      //chuan dat ten nhan du lieu vao reducer la action.payload , gan vao bien fullBoard cho co y nghia hon
      const board = action.payload

      //Xu li du lieu

      //Update du lieu currentActiveBoard
      state.currentActiveBoard = board
    }
  },
  //Extrareducers: Noi xu li du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      //Day chinh la response.data trng ham callAPI phia tren
      let board = action.payload

      //Xu lieu du lieu neu can thiet
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
        else
        {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
// Actions: La nơi dành cho các components bên dưới gọi bằng dispatch() tới nó đe cập nhật lại dữ liệu thông qua reducer (chạy đồng độ)
// Đe ý ở trên thì không thây properties actions dau cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer.
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook usesSelector() đe lay dữ liệu từ trong kho redux store ra su dụng

export const selectCurrentActiveBoard = ( state ) => {
  return state.activeBoard.currentActiveBoard
}

// Export Reducer thay vi activeBoardSlice
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer