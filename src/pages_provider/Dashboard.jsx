import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { IoNotifications } from 'react-icons/io5'
import MenuProvider from '../components/MenuProvider'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import utyLogo from '../assets/logo-uty.png'
import commande from '../assets/Affaires concl.png'
import vendus from '../assets/Articles vendus.png'
import recettes from '../assets/Chiffre daffaire.png'
import ads from '../assets/Campagnes ads.png'
import pubPrice from '../assets/Dépenses Pub.png'
import map from '../assets/map.png'
import { useGeolocated } from 'react-geolocated'
import { useBookStore } from '../utils/Store'

function Dashboard() {
  let navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const socket = useRef()
  const [notifications, setNotifications] = useState([])
  const [location, setLocation] = useState()
  const latitude = useBookStore((state) => state.latitude)
  const updateLatitude = useBookStore((state) => state.updateLatitude)
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enabledHighAccuracy: false,
      },
      userDecisionTimeout: 30000,
    })

  // console.log(coords)
  console.log(isGeolocationAvailable)
  console.log(isGeolocationEnabled)

  useEffect(() => {
    setLocation(coords)
    updateLatitude(coords.latitude)
    console.log(latitude)
    socket.current = io('http://localhost:5200')
    socket.current.emit('add-user', currentUser._id, currentUser.username)
  }, [currentUser])

  useEffect(() => {
    socket.current.on('provider_notif', (sender) => {
      setNotifications((prev) => [...prev, sender])
    })
  }, [socket])

  console.log(notifications)

  return (
    <Container>
      <div className="navbar">
        <div className="page__title" onClick={() => navigate('/HomePage')}>
          <img
            src={utyLogo}
            alt=""
            className="uty__logo"
            onClick={() => navigate('/HomePage')}
          />
        </div>
        <div className="menu__side">
          <IoNotifications className="notification__icon" />
          <span>{notifications.length}</span>
          <MenuProvider />
        </div>
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
              await localStorage.setItem(
                'currentLocation',
                JSON.stringify(coords)
              )
              await navigate('/DeliveryOne')
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: -5vw;
    margin-left: -5vw;
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
    box-shadow: 0px 0px 5px silver;
    padding: 1vh 5vw;
    margin-bottom: 2.5vh;
    .user__profil {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #020664;
      background-color: white;
      border-radius: 2rem;
      padding-left: 2vw;
      padding-right: 2vw;
      svg {
        font-size: 150%;
        cursor: pointer;
      }
    }

    .page__title {
      display: flex;
      justify-content: center;
      padding-top: 1vh;
      .uty__logo {
        height: 8vh;
        width: 12.5vw;
        align-self: flex-start;
      }
    }
    .menu__side {
      display: flex;
      align-items: center;
      .notification__icon {
        font-size: 220%;
        color: #020664;
      }
      .menu__icon {
        align-self: center;
        font-size: 260%;
        margin-right: 1vh;
      }
    }
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
