import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { IoMenu } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
// import { useStore } from '../utils/Store'

export default function BasicMenu({ isCustomer, isProvider, isDeliver }) {
  // const currentUser = JSON.parse(localStorage.getItem('currentUser'))
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

  const handleLogOut = () => {
    if (isCustomer) {
      localStorage.removeItem('currentUser')
      navigate('/Home')
    } else if (isProvider) {
      localStorage.removeItem('currentProvider')
      navigate('/Home')
    } else if (isDeliver) {
      localStorage.removeItem('currentDeliver')
      navigate('/Home')
    }
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
        <MenuItem onClick={() => navigate('/Home')}>
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

        {/* provider side */}
        {isProvider && (
          <MenuItem onClick={handleClose}>
            <p
              style={{
                fontSize: '130%',
                fontWeight: 'bold',
                marginBottom: '-1.5vh',
              }}
            >
              A propos
            </p>
          </MenuItem>
        )}
        {isProvider && (
          <MenuItem onClick={() => navigate('/create-announce')}>
            <p
              style={{
                fontSize: '130%',
                fontWeight: 'bold',
                marginBottom: '-1.5vh',
              }}
            >
              Créer une annonce
            </p>
          </MenuItem>
        )}
        {isDeliver !== null && isDeliver !== false ? (
          <MenuItem onClick={() => navigate('/Shipments')}>
            <p
              style={{
                fontSize: '130%',
                fontWeight: 'bold',
                marginBottom: '-1.5vh',
              }}
            >
              Mes courses
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

        {/* //customer side */}

        {isCustomer && (
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
        )}

        {isCustomer && (
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
        )}

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
            onClick={handleLogOut}
          >
            Se deconnecter
          </button>
        </MenuItem>
      </Menu>
    </div>
  )
}
