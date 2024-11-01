import { useDraggable } from '@dnd-kit/core'

export function Draggable(props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props._id
  })

  return (
    <li ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </li>
  )
}