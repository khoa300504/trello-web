import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

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

function BoardBar() {
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
      bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      borderBottom: '1px solid white'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip sx={
          MenuStyle
        }
        icon={<DashboardIcon />}
        label="KhoaNguyenDev MERN STACK"
        clickable
        />
        <Chip sx={
          MenuStyle
        }
        icon={<VpnLockIcon />}
        label="Public/Private Workspace"
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
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon/>}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}>
          Invite
        </Button>
        <AvatarGroup
          max={5}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              height: 32,
              width: 32,
              fontSize: '16px',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="KhoaNguyenDev">
            <Avatar alt="KhoaNguyenDev" src="https://i.pinimg.com/736x/5a/ba/a4/5abaa4bdd57ac3dd1bf7a2159323bc88.jpg" />
          </Tooltip>
          <Tooltip title="BabyLove">
            <Avatar alt="BabyLove" src="https://i.pinimg.com/564x/b1/00/da/b100da15d670accd698ee82197f08585.jpg" />
          </Tooltip>
          <Tooltip title="Cr7">
            <Avatar alt="Cr7" src="https://i.pinimg.com/564x/c7/1c/f8/c71cf8c53739beacdcc80b50b9433a50.jpg" />
          </Tooltip>
          <Tooltip title="Itachi">
            <Avatar alt="Itachi" src="https://i.pinimg.com/564x/38/b9/f4/38b9f4e7c9244f83c085e560c5c207e5.jpg" />
          </Tooltip>
          <Tooltip title="Cr7">
            <Avatar alt="Cr7" src="https://i.pinimg.com/564x/a4/bc/07/a4bc074169928a3b36861738fda8f542.jpg" />
          </Tooltip>
          <Tooltip title="Xiao">
            <Avatar alt="Xiao" src="https://i.pinimg.com/564x/09/14/73/0914735f0930eaea1483297626fb85bc.jpg" />
          </Tooltip>
          <Tooltip title="Oni">
            <Avatar alt="Oni" src="https://i.pinimg.com/564x/ad/60/40/ad6040f3a427c68179208c3c4bc18fb2.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
