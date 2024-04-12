import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { generatePlaceholderCard } from '~/utils/fomartter'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '6613b90a9f007a47bf39097f'
    //Call api
    fetchBoardDetailsAPI(boardId).then(board => {
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
      console.log('New Board: ', board)
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
      if (columnToUpdate.cards.some(c => c.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      }
      else {
        columnToUpdate.cards.push( createdCard )
        columnToUpdate.cardOrderIds.push( createdCard._id )
      }
    }
    setBoard(newBoard)
  }

  const moveColumns = (dndOrderedColumns) => {
    //Cập nhật giao diện trước r mới gọi api tránh delay / conflickering
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id )
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(c => c._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
      setBoard(newBoard)
    }
    updateColumnDetailsAPI(columnToUpdate._id, { cardOrderIds: dndOrderedCardIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id )
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)
    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, width: '100vv', height: '100vh' }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar/>
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn = {createNewColumn}
        createNewCard = {createNewCard}
        moveColumns = {moveColumns}
        moveCardInTheSameColumn = {moveCardInTheSameColumn}
        moveCardToDifferentColumn = {moveCardToDifferentColumn} />
    </Container>
  )
}

export default Board
