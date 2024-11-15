import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Tooltip from '@mui/material/Tooltip'
import { capitalizeFirstLetter } from '~/utils/fomartter'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'

const MenuStyle = {
  bgcolor: 'transparent',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  paddingX: '5px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board }) {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title = {board?.description}>
          <Chip sx={ MenuStyle }
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
        <Chip sx={
          MenuStyle
        }
        icon={<VpnLockIcon />}
        label={capitalizeFirstLetter(board?.type)}
        clickable
        />
        <Chip sx={
          MenuStyle
        }
        icon={<AddToDriveIcon />}
        label="Add To Google Drive"
        clickable
        />
        <Chip sx={
          MenuStyle
        }
        icon={<BoltIcon />}
        label="Automation"
        clickable
        />
        <Chip sx={
          MenuStyle
        }
        icon={<FilterListIcon />}
        label="Filter"
        clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <InviteBoardUser boardId={board._id}/>
        <BoardUserGroup boardUsers={board.FE_allUSERs}/>
      </Box>
    </Box>
  )
}

export default BoardBar
