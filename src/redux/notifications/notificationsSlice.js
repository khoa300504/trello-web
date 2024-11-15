import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

//khoi tao gia tri initialState slice redux
const initialState = {
  currentNotifications: null
}

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ ivitationId, status }) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${ivitationId}`, { status })
    return response.data
  }
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const incommingInvitation = action.payload
      state.currentNotifications.unshift(incommingInvitation)
    },
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incommingInvitations = action.payload
      state.currentNotifications = Array.isArray(incommingInvitations) ? incommingInvitations.reverse() : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incommingInvitation = action.payload
      const getInvitation = state.currentNotifications.find(i => i._id === incommingInvitation._id)
      getInvitation.boardInvitation = incommingInvitation.boardInvitation
    })
  }
})

export const { updateCurrentNotifications, clearCurrentNotifications, addNotification } = notificationsSlice.actions

export const selectCurrentNotifications = state => {
  return state.notifications.currentNotifications
}

export const notificationsReducer = notificationsSlice.reducer