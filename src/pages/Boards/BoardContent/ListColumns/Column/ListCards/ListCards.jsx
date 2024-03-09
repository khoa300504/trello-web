import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      p: '0 5px',
      m: '0 5px',
      maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight})`,
      overflowX: 'hidden',
      overflowY: 'auto',
      '&::-webkit-scrollbar' : {
        width: '8px'
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ced0da',
        borderRadius: '8px'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#bfc2cf'
      }
    }}>
      <Card
      />
      <Card
        temporaryHideMedia
      />
      <Card
        temporaryHideMedia
      />
      <Card
        temporaryHideMedia
      />
      <Card
        temporaryHideMedia
      />
      <Card
        temporaryHideMedia
      />
    </Box>
  )
}

export default ListCards