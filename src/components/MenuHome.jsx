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
        <IoMenu style={{ fontSize: ' 375%', color: '#020664' }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <MenuItem onClick={handleClose}>
          <p
            style={{
              fontSize: '130%',
              fontWeight: 'bold',
              marginBottom: '-5vh',
            }}
          >
            A propos
          </p>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <p style={{ fontSize: '130%', fontWeight: 'bold' }}>
            Dévenir livreur
          </p>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <button
            style={{
              height: '7.5vh',
              width: '55vw',
              backgroundColor: '#ffc000',
              border: 'none',
              marginBottom: '50vh',
              fontSize: '120%',
              fontWeight: 'bold',
              marginTop: '-1.5vh',
            }}
          >
            Nous contacter
          </button>
        </MenuItem>
      </Menu>
    </div>
  )
}
