import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IoMenu } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
// import { useStore } from '../utils/Store'

export default function BasicMenu() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  // const user = useStore((state) => state.user)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  // console.log(user)
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
        <MenuItem onClick={() => navigate('/')}>
          <p
            style={{
              fontSize: '130%',
              fontWeight: 'bold',
              marginBottom: '-1.5vh',
            }}
          >
            Accueil
          </p>
        </MenuItem>
        {currentUser.isProvider !== null && currentUser.isProvider !== false ? (
          <MenuItem onClick={() => navigate('/Dashboard')}>
            <p
              style={{
                fontSize: '130%',
                fontWeight: 'bold',
                marginBottom: '-1.5vh',
              }}
            >
              My dashboard
            </p>
          </MenuItem>
        ) : (
          <p></p>
        )}
        {currentUser.isDeliver !== null && currentUser.isDeliver !== false ? (
          <MenuItem onClick={() => navigate('/Profile')}>
            <p
              style={{
                fontSize: '130%',
                fontWeight: 'bold',
                marginBottom: '-1.5vh',
              }}
            >
              My courses
            </p>
          </MenuItem>
        ) : null}
        <MenuItem onClick={() => navigate('/Profile')}>
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

        <MenuItem onClick={() => navigate('/Offer')}>
          <p
            style={{
              fontSize: '130%',
              fontWeight: 'bold',
              marginBottom: '-1.5vh',
            }}
          >
            Offres
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
            onClick={() => {
              localStorage.removeItem('currentUser')
              navigate('/')
            }}
          >
            Se deconnecter
          </button>
        </MenuItem>
      </Menu>
    </div>
  )
}
