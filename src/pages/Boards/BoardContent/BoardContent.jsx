import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { DndContext,
  useSensor,
  useSensors,
  // MouseSensor,
  // TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  // rectIntersection,
  getFirstCollision
  // closestCenter
} from '@dnd-kit/core'
import { useEffect, useState, useCallback, useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/fomartter'
import { MouseSensor, TouchSensor } from '~/customLibs/DndKitSensors'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({
  board,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn }) {
  //Nếu dùng pointerSensor thì phải kết hợp touchAction: 'none'
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumn, setOldColumn] = useState(null)

  const findColumnByCardId = cardId => {
    return orderedColumns.find(column => column?.cards.map(c => c._id)?.includes(cardId))
  }

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOrderedColumns(prevColumn => {
      //Index nơi mà card sắp thả ở OVercolumn
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1
      // Tạo mảng orderedColumns mới sau đó xử lí dữ liệu rồi return lại orderedColumns mới
      const nextColumns = cloneDeep(prevColumn)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
      if (nextActiveColumn)
      {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //Thêm placeholderCard nếu đây là card cuối cùng trong column
        if (isEmpty(nextActiveColumn.cards))
        {
          nextActiveColumn.cards = [generatePlaceholderCard(activeColumn)]
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(c => c._id)
      }
      if (nextOverColumn)
      {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // uppdate cardOrderIds data
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
        // Nếu Columns không rỗng thì xóa placeholderCard đi
        nextOverColumn.cards = nextOverColumn.cards.filter(c => !c.FE_PlaceholderCard)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(c => c._id)
      }
      if ( triggerFrom === 'handleDragEnd')
      {
        moveCardToDifferentColumn(activeDraggingCardId, oldColumn._id, nextOverColumn._id, nextColumns)
      }
      return nextColumns
    })
  }

  const handleDragStart = event => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // chỉ khi kéo card mới set
    if (event?.active?.data?.current?.columnId)
    {
      setOldColumn(findColumnByCardId(event?.active?.id))
    }
  }

  //Column không cần xử lí
  const handleDragOver = event => {
    // Nếu là column thì k xử lí
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    //oject destructering
    const { active, over } = event
    if (!over || !active) return

    const { id: activeDraggingCardId, data: { current : activeDraggingCardData } } = active
    const { id: overCardId } = over

    // Tìm 2 columns chứa 2 card active và over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // Đoạn code này xử lí kéo card thả ở column khác nếu kéo trong column cũ thì k làm gì và chỉ xử lí khi kéo còn kéo xong xử lí ở dragEnd
    if (activeColumn._id !== overColumn._id)
    {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver')
    }
  }

  const handleDragEnd = event => {
    const { active, over } = event
    if (!over || !active) return

    //Xử lí kéo thả Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD)
    {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      // Tìm 2 columns chứa 2 card active và over
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return
      if (oldColumn._id !== overColumn._id) {
        // console.log('Hành động kéo thả card trong 2 column khác nhau')
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd')
      }
      else
      //kéo thả trong cùng 1 column
      {
        const oldIndex = oldColumn.cards.findIndex(c => c._id === activeDragItemId)
        const newIndex = oldColumn.cards.findIndex(c => c._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumn.cards, oldIndex, newIndex)
        const dndOrderedCardIds = dndOrderedCards.map(c => c._id)
        setOrderedColumns(prevColumn => {
          const nextColumns = cloneDeep(prevColumn)
          const targerColumn = nextColumns.find(c => c._id === overColumn._id)
          targerColumn.cards = dndOrderedCards
          targerColumn.cardOrderIds = dndOrderedCardIds
          return nextColumns
        })
        moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumn._id)
      }
    }
    //Xử lí kéo thả Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    {
      if (active.id !== over.id)
      {
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        moveColumns(dndOrderedColumns)

        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumn(null)
  }

  useEffect(() => {
    setOrderedColumns(board.columns)
  }, [board] )

  const customDropAnimation = { sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  const lastOverId = useRef(null)

  //args là các đối số tham số arguments
  const collisionDetectionStratery = useCallback(( args ) => {
    //Nếu là column thì k cần custome trả về closetConner
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    {
      return closestCorners({ ...args })
    }
    // Tìm các điểm giao nhau (va chạm) với con trỏ
    const pointerIntersections = pointerWithin(args)
    if (!pointerIntersections?.length) return

    // const intersections = !!pointerIntersections.length ? pointerIntersections : rectIntersection(args)
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId)
    {
      const checkColumn = orderedColumns.find(c => c._id === overId)
      if (checkColumn)
      {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(Container => Container.id !== overId && checkColumn?.cardOrderIds?.includes(Container.id))
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // collisionDetection={closestCorners}
      // Tự custom thuật toán phát hiện va chạm
      collisionDetection={collisionDetectionStratery}
    >
      <Box sx={{
        bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        overflowY: 'hidden',
        overflowX: 'auto',
        p: '10px 0'
      }}>
        <ListColumns
          columns = {orderedColumns}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
