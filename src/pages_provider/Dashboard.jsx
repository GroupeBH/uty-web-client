import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import Nav from '../components/Nav'
import commande from '../assets/Affaires concl.png'
import vendus from '../assets/Articles vendus.png'
import recettes from '../assets/Chiffre daffaire.png'
import ads from '../assets/Campagnes ads.png'
import pubPrice from '../assets/Dépenses Pub.png'
import map from '../assets/map.png'
import axios from 'axios'
import { useStore } from '../utils/Store'

function Dashboard() {
  let navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const [provider, setProvider] = useState()
  const socket = useRef()
  const [notifications, setNotifications] = useState([])
  const [location, setLocation] = useState()
  const latitude = useStore((state) => state.latitude)
  const updateLatitude = useStore((state) => state.updateLatitude)
  const longitude = useStore((state) => state.longitude)
  const updateLongitude = useStore((state) => state.updateLongitude)

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log('location not supproted')
    } else {
      console.log('locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLatitude(position.coords.latitude)
          updateLongitude(position.coords.longitude)
        },
        () => {
          console.log('enabled to retrieve location')
        }
      )
    }
  }

  useEffect(() => {
    getLocation()
    setLocation()
    // updateLatitude(coords.latitude)
    console.log(latitude)
    console.log(longitude)
    const updateCoords = async () => {
      const response = await axios.patch(
        `https://uty-ti30.onrender.com/api/auth/updateCoords/${currentUser._id}`,
        { latitude, longitude }
      )
      setLocation(response.data)
    }
    updateCoords()

    const getProvider = async () => {
      const response = await axios.get(
        `https://uty-ti30.onrender.com/api/auth/getProvider/${currentUser._id}`
      )
      setProvider(response.data)
      console.log(provider)
    }

    getProvider()

    socket.current = io('https://uty-ti30.onrender.com')
    // socket.current.emit('add-user', currentUser._id, currentUser.username)
  }, [currentUser])

  // console.log(latitude)

  useEffect(() => {
    socket.current.on('provider_notif', (sender) => {
      setNotifications((prev) => [...prev, sender])
    })
  }, [socket])

  console.log(notifications)

  return (
    <Container>
      <div className="navbar">
        <Nav />
      </div>
      <h3 className="provider__accroche">Pénètre ton marché différement</h3>
      <div className="list__post">
        <div
          className="commande__link"
          onClick={() => {
            navigate('/Order')
          }}
        >
          <div
            className="box__description"
            onClick={() => {
              navigate('/Order')
            }}
          >
            Commandes
          </div>
          <img src={vendus} alt="" />
        </div>
        <div className="commande__link">
          <div className="box__description">Ventes</div>
          <img src={commande} alt="" />
        </div>
        <div className="commande__link">
          <div className="box__description">Recettes</div>
          <img src={recettes} alt="" />
        </div>
        <div className="commande__link">
          <div className="box__description">Campagnes</div>
          <img src={ads} alt="" />
        </div>
        <div className="commande__link">
          <div className="box__description">Budget ads</div>
          <img src={pubPrice} alt="" />
        </div>
        <div
          className="commande__link"
          onClick={() => {
            localStorage.setItem('currentLocation', location)
            navigate('/DeliveryOne')
          }}
        >
          <div
            className="box__description"
            onClick={async () => {
              localStorage.setItem('currentLocation')
              navigate('/DeliveryOne')
            }}
          >
            Traçage
          </div>
          <img src={map} alt="" />
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  padding-left: 5vw;
  padding-right: 5vw;
  display: flex;
  flex-direction: column;
  .navbar {
    width: 100%;
  }
  h3 {
    text-align: center;
    font-size: 125%;
  }
  .list__post {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1vh 2vw;
    .commande__link {
      border-color: silver 1px;
      height: 20vh;
      width: 40vw;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #020664;
      margin-bottom: 5vh;
      border-radius: 1rem;
      z-index: 0;
      cursor: pointer;
      img {
        height: 15vh;
        z-index: 0;
        margin-left: -25vw;
      }
      .box__description {
        color: white;
        font-size: 120%;
        font-weight: bold;
      }
    }
    .commande__link:hover {
      background-color: orange;
      border-radius: 1rem;
    }
  }
`

export default Dashboard
