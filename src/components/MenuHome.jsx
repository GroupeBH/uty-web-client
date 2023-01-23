import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IoMenu } from 'react-icons/io5'
// import { useNavigate } from 'react-router-dom'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <IoMenu style={{ fontSize: ' 325%', color: '#020664' }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>A propos</MenuItem>
        <MenuItem onClick={handleClose}>Dévenir livreur</MenuItem>
        <MenuItem onClick={handleClose}>
          <button style={{ height: '5vh', backgroundColor: '#ffc000' }}>
            Nous contacter
          </button>
        </MenuItem>
      </Menu>
    </div>
  )
}
