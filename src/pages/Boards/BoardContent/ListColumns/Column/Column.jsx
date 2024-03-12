import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import AddIcon from '@mui/icons-material/Add'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'

function Column({ column }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  return (
    <Box sx={{
      bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
      maxWidth: '300px',
      minWidth: '300px',
      borderRadius: '6px',
      ml: 2,
      height: 'fit-content',
      maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
    }}>
      {/* Header Content */}
      <Box sx={{
        height: (theme) => theme.trello.columnHeaderHeight,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h6' sx={{
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          {column?.title}
        </Typography>
        <Box>
          <Tooltip title="More Option">
            <ExpandMoreIcon
              sx={{ cursor: 'pointer', color: 'text.primary' }}
              id="basic-button-workspaces"
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
          </Tooltip>
          <Menu
            id="basic-menu-column-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-column-dropdown'
            }}
          >
            <MenuItem>
              <ListItemIcon><AddCardIcon fontSize="small" />
              </ListItemIcon><ListItemText>Add new Card</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentCut fontSize="small" />
              </ListItemIcon><ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentCopy fontSize="small" />
              </ListItemIcon><ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentPaste fontSize="small" />
              </ListItemIcon><ListItemText>Paste</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon><DeleteForeverIcon fontSize="small" />
              </ListItemIcon><ListItemText>Remove column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><Cloud fontSize="small" />
              </ListItemIcon><ListItemText>Archive column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      {/* List Card */}
      <ListCards cards = {orderedCards} />
      {/* Footer Content */}
      <Box sx={{
        height: (theme) => theme.trello.columnFooterHeight,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Button startIcon={<AddIcon/>}>Add a card</Button>
        <Tooltip title="Drag to move">
          <DragHandleIcon sx={{ cursor: 'pointer' }} />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column