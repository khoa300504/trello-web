import { useEffect, useState } from 'react'
import moment from 'moment'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DoneIcon from '@mui/icons-material/Done'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInvitationsAPI, selectCurrentNotifications, updateBoardInvitationAPI } from '~/redux/notifications/notificationsSlice'

const BOARD_INVITATION_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
}

function Notifications() {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClickNotificationIcon = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const notifications = useSelector(selectCurrentNotifications)
  useEffect(() => {
    dispatch(fetchInvitationsAPI())
  }, [dispatch])

  const updateBoardInvitation = (status, ivitationId) => {
    dispatch(updateBoardInvitationAPI({ ivitationId, status }))
      .then(res => {
        console.log(res)
      })
  }

  return (
    <Box>
      <Tooltip title="Notifications">
        <Badge
          color="warning"
          // variant="none"
          variant={notifications === null ? 'standard' : 'dot'}
          sx={{ cursor: 'pointer' }}
          id="basic-button-open-notification"
          aria-controls={open ? 'basic-notification-drop-down' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickNotificationIcon}
        >
          <NotificationsNoneIcon sx={{
            // color: 'white'
            color: 'yellow'
          }} />
        </Badge>
      </Tooltip>

      <Menu
        sx={{ mt: 2 }}
        id="basic-notification-drop-down"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button-open-notification' }}
      >
        {(!notifications || notifications?.length === 0) && <MenuItem sx={{ minWidth: 200 }}>You don&apos;t have any notifications.</MenuItem>}
        {notifications?.map((notification, index) =>
          <Box key={index}>
            <MenuItem sx={{
              minWidth: 200,
              maxWidth: 360,
              overflowY: 'auto'
            }}>
              <Box sx={{ maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'pre-wrap', display: 'flex', flexDirection: 'column', gap: 1 }}>
                {/* Nội dung của thông báo */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box><GroupAddIcon fontSize="small" /></Box>
                  <Box><strong>{notification.inviter.displayName}</strong> had invited you to join the board <strong>{notification.board.title}</strong></Box>
                </Box>

                {/* Khi Status của thông báo này là PENDING thì sẽ hiện 2 Button */}
                {notification.boardInvitation.status === BOARD_INVITATION_STATUS.PENDING && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                  <Button
                    className="interceptor-loading"
                    type="submit"
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.ACCEPTED, notification._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    className="interceptor-loading"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => updateBoardInvitation(BOARD_INVITATION_STATUS.REJECTED, notification._id)}
                  >
                    Reject
                  </Button>
                </Box>}

                {/* Khi Status của thông báo này là ACCEPTED hoặc REJECTED thì sẽ hiện thông tin đó lên */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                  {notification.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED && <Chip icon={<DoneIcon />} label="Accepted" color="success" size="small" />}
                  {notification.boardInvitation.status === BOARD_INVITATION_STATUS.REJECTED && <Chip icon={<NotInterestedIcon />} label="Rejected" size="small" />}
                </Box>

                {/* Thời gian của thông báo */}
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="span" sx={{ fontSize: '13px' }}>
                    {moment(notification.createdAt).format('llll')}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {/* Cái đường kẻ Divider sẽ không cho hiện nếu là phần tử cuối */}
            {index !== (notifications.length - 1) && <Divider />}
          </Box>
        )}
      </Menu>
    </Box>
  )
}

export default Notifications