import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

const rootPersistConfig = {
  key: 'root', //key cua persist chi dinh, mac dinh la root
  storage: storage, //Chi dinh luu vao localstorage
  whitelist: ['user'] // slice du lieu duoc duy tri qua f5
  // blackList: ['activeBoard'] slice Khong duoc duy tri qua f5 browser
}

const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})

const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
