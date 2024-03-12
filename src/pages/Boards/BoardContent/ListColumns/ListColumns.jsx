import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns({ columns }) {
  return (
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
      {columns?.map( column => <Column key={column._id} column = {column} /> )}

      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
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
    </Box>
  )
}

export default ListColumns