import { Routes, Route, Navigate } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'

function App() {
  return (
    <Routes>
      <Route path='/' element={
        // Su dung replace tranh route / khong con trong history browser
        <Navigate to='/boards/6702ad827b9ab626479d0fd9' replace='true' />
      } />
      {/* Board Details */}
      <Route path='/boards/:boardId' element={<Board/>} />

      {/* Authentication */}
      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth/>} />

      {/* 404 Page */}
      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App
