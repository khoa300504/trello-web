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
import InsertCommentIcon from '@mui/icons-material/InsertComment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import AddIcon from '@mui/icons-material/Add'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import GroupIcon from '@mui/icons-material/Group'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <Box sx={{
      bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      display: 'flex',
      overflowY: 'hidden',
      overflowX: 'auto',
      p: '10px 0'
    }}>
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
        {/* Box Column 1*/}
        <Box sx={{
          bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          maxWidth: '300px',
          minWidth: '300px',
          borderRadius: '6px',
          ml: 2,
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
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
              Column title
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
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: '0 5px',
            m: '0 5px',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
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
            <Card sx={{
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
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&: last-child': { p: 1.5 } }}>
                <Typography>First task</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&: last-child': { p: 1.5 } }}>
                <Typography>First task</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&: last-child': { p: 1.5 } }}>
                <Typography>First task</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&: last-child': { p: 1.5 } }}>
                <Typography>First task</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&: last-child': { p: 1.5 } }}>
                <Typography>First task</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&: last-child': { p: 1.5 } }}>
                <Typography>First task</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&: last-child': { p: 1.5 } }}>
                <Typography>First task</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&: last-child': { p: 1.5 } }}>
                <Typography>First task</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
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
        {/* Box Column 2*/}
        <Box sx={{
          bgcolor: ( theme ) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          maxWidth: '300px',
          minWidth: '300px',
          borderRadius: '6px',
          ml: 2,
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
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
              Column title
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
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: '0 5px',
            m: '0 5px',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
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
            <Card sx={{
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
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&: last-child': { p: 1.5 } }}>
                <Typography>First task</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
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
      </Box>
    </Box>
  )
}

export default BoardContent
