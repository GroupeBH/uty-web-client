import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import utyLogo from '../assets/logo-uty.png'
import SearchLocation from '../components/SearchLocation'
import { useStore } from '../utils/Store'
import ModalConnect from './ModalConnect'

function Location() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const latitude = useStore((state) => state.latitude)
  const longitude = useStore((state) => state.longitude)
  const coords = useStore((state) => state.coords)
  const username = useStore((state) => state.username)

  useEffect(() => {
    console.log(latitude, longitude, coords)
  })

  const handleClick = async () => {
    console.log(username)
    if (!currentUser) {
      setIsOpen(true)
    } else {
      localStorage.setItem(
        'currentLocation',
        JSON.stringify([latitude, longitude, coords])
      )
      navigate('/Categories')
    }
  }
  return (
    <Container>
      <div className="location__container">
        <div className="inputs__field">
          <IoArrowBackOutline onClick={() => navigate('/')} />
          <img src={utyLogo} alt="uty logo" />
          <p>Renseignez le lieu de livraison</p>
          <SearchLocation handleClick={handleClick} />
        </div>
        <div></div>
        <button onClick={handleClick}>Continuer</button>
      </div>
      {isOpen && <ModalConnect setIsOpen={setIsOpen} />}
    </Container>
  )
}

const Container = styled.div`
  .location__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .inputs__field {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5vh;
      margin-bottom: 3vh;
      svg {
        align-self: flex-start;
        font-size: 250%;
        color: #020664;
      }
      p {
        font-size: 110%;
      }
      img {
        height: 20vh;
        width: 30vw;
      }
      input {
        height: 7.5vh;
        width: 85vw;
        border-radius: 0.5rem;
        padding-left: 2.5vw;
        font-size: 90%;
      }
    }
    button {
      height: 8.5vh;
      width: 90vw;
      font-size: 125%;
      border-radius: 0.5rem;
      background-color: #020664;
      color: white;
    }
  }
`
export default Location
