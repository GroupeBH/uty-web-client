import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IoMenu } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  let navigate = useNavigate()
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
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <MenuItem onClick={() => navigate('/Compte')}>
          <p
            style={{
              fontSize: '130%',
              fontWeight: 'bold',
              marginBottom: '-1.5vh',
            }}
          >
            Profile
          </p>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <p
            style={{
              fontSize: '130%',
              fontWeight: 'bold',
              marginBottom: '-1.5vh',
            }}
          >
            Historique
          </p>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <p
            style={{
              fontSize: '130%',
              fontWeight: 'bold',
              marginBottom: '2.5vh',
            }}
          >
            Suivre ma livraison
          </p>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <button
            style={{
              height: '8.5vh',
              width: '60vw',
              backgroundColor: '#ffc000',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '135%',
              marginBottom: '2.5vh',
            }}
          >
            Se deconnecter
          </button>
        </MenuItem>
      </Menu>
    </div>
  )
}
