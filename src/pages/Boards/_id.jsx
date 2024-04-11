import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { generatePlaceholderCard } from '~/utils/fomartter'
import { isEmpty } from 'lodash'

// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6613b90a9f007a47bf39097f'
    //Call api
    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
      })
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    createNewColumn.cards = [generatePlaceholderCard(createNewColumn)]
    createNewColumn.cardOrderIds = [generatePlaceholderCard(createNewColumn)._id]
    const newBoard = { ...board }
    newBoard.columns.push( createdColumn )
    newBoard.columnOrderIds.push( createdColumn._id )
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(c => c._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push( createdCard )
      columnToUpdate.cardOrderIds.push( createdCard._id )
      setBoard(newBoard)
    }
  }

  const moveColumns = async (dndOrderedColumns) => {
    //Cập nhật giao diện trước r mới gọi api tránh delay / conflickering
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id )
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar/>
      <BoardBar board={board} />
      <BoardContent
        moveColumns = {moveColumns}
        createNewColumn = {createNewColumn}
        createNewCard = {createNewCard}
        board={board} />
    </Container>
  )
}

export default Board
