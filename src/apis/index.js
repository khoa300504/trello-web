import { API_ROOT } from '~/utils/constants'
import axios from 'axios'

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`http://localhost:8017/v1/boards/${boardId}`)
  //Axios trả về kq về property của nó là data
  return response.data
}