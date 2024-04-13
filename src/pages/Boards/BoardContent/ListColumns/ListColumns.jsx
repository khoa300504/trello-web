import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'


function ListColumns({ columns, createNewColumn, createNewCard, deleteColumnDetails }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => { setOpenNewColumnForm(!openNewColumnForm) }
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = () => {
    if (!newColumnTitle)
    {
      toast.error('Please enter column title')
      return
    }

    //Tạo dữ liệu gọi API
    const newColumnData = {
      title: newColumnTitle

    }
    //Call api here
    createNewColumn(newColumnData)


    //Đóng trạng thái thêm clear input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  // const [searchValue, setSearchValue] = useState('')

  return (
    <SortableContext strategy={horizontalListSortingStrategy} items={columns?.map(column => column._id)}>
      <Box sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        overflowY: 'hidden',
        overflowX: 'auto',
        bgcolor: 'inherit',
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}>
        {/* Box Column Test 01*/}
        {columns?.map( column =>
          <Column key={column._id} column = {column} createNewCard = {createNewCard} deleteColumnDetails = {deleteColumnDetails} />
        )}
        {!openNewColumnForm
          ? <Box onClick={ toggleOpenNewColumnForm } sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}>
            <Button sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: '8px'
            }} startIcon={<NoteAddIcon/>}>Add new column</Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              id='outlined-search'
              label='Enter column title ...'
              type='text'
              size='small'
              variant='outlined'
              autoFocus
              value={ newColumnTitle }
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& input': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Button
                variant='contained' color='success' size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: { bgcolor: (theme) => theme.palette.success.main },
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
                onClick={ addNewColumn }
              >
                Add Column</Button>
              <CloseIcon
                fontSize='small'
                sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: (theme) => theme.palette.warning.light } }}
                onClick={ toggleOpenNewColumnForm }
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns