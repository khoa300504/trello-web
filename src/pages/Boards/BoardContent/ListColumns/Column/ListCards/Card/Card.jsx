import InsertCommentIcon from '@mui/icons-material/InsertComment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import GroupIcon from '@mui/icons-material/Group'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'

function Card({ temporaryHideMedia }) {
  if ( temporaryHideMedia ) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{ p: 1.5 }}>
          <Typography>Task1</Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (
    <MuiCard sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://blog.vantagecircle.com/content/images/size/w1000/2021/05/Organizational-Skills.png"
        title="itachi"
      />
      <CardContent sx={{ p: 1.5 }}>
        <Typography>KhoaNguyenDev</Typography>
      </CardContent>
      <CardActions sx={{ pt: 0, px: 0.5 }}>
        <Button size='small' startIcon={<GroupIcon/>}>5</Button>
        <Button size='small' startIcon={<InsertCommentIcon/>}>15</Button>
        <Button size='small' startIcon={<AttachmentIcon/>}>2</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card