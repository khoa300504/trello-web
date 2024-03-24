import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { useEffect, useState, useCallback, useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'
import { Container } from '@mui/material'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
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
      // Tìm card id trong overColumn nơi mà card sắp được thả
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
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(c => c._id)
        }
        if (nextOverColumn)
        {
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // uppdate cardOrderIds data
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(c => c._id)
        }
        return nextColumns
      })
    }
  }

  const handleDragEnd = event => {
    const { active, over } = event
    if (!over || !active) return

    //Xử lí kéo thả Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD)
    {
      if (!over || !active) return
      const { id: overCardId } = over

      // Tìm 2 columns chứa 2 card active và over
      const overColumn = findColumnByCardId(overCardId)

      if (!oldColumn || !overColumn) return
      if (oldColumn._id !== overColumn._id) {
        // console.log('Hành động kéo thả card trong 2 column khác nhau')
      }
      else
      {
        const oldIndex = oldColumn.cards.findIndex(c => c._id === activeDragItemId)
        const newIndex = oldColumn.cards.findIndex(c => c._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumn.cards, oldIndex, newIndex)
        setOrderedColumns(prevColumn => {
          const nextColumns = cloneDeep(prevColumn)
          const targerColumn = nextColumns.find(c => c._id === overColumn._id)
          targerColumn.cards = dndOrderedCards
          targerColumn.cardOrderIds = dndOrderedCards.map(c => c._id)
          return nextColumns
        })
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
        // 2 clg này sau này dùng gọi API
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id )
        // console.log(dndOrderedColumns)
        // console.log(dndOrderedColumnsIds)
        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumn(null)
  }

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board] )

  const customDropAnimation = { sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  const lastOverId = useRef(null)

  //args là các đối số tham số arguments
  const collisionDetectionStratery = useCallback(( args ) => {
    //Nếu là column thì k cần custome trả về closetConner
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    {
      return closestCorners(args)
    }
    // Tìm các điểm giao nhau (va chạm) với con trỏ
    const pointerIntersections = pointerWithin(args)
    const intersections = !!pointerIntersections.length ? pointerIntersections : rectIntersection(args)
    let overId = getFirstCollision(intersections, 'id')
    if (overId)
    {
      const checkColumn = orderedColumns.find(c => c._id === overId)
      if (checkColumn)
      {
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(Container => Container.id !== overId && checkColumn?.cardOrderIds?.includes(Container.id))
        })[0]?.id
      }

      lastOverId.current = overId
      console.log('last id: ', lastOverId)
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
        <ListColumns columns = { orderedColumns } />
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
