import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
// import { io } from 'socket.io-client'
import Nav from '../components/Nav'
import commande from '../assets/Affaires concl.png'
import vendus from '../assets/Articles vendus.png'
import recettes from '../assets/Chiffre daffaire.png'
import ads from '../assets/Campagnes ads.png'
import pubPrice from '../assets/Dépenses Pub.png'
import map from '../assets/map.png'
import axios from 'axios'
import { useStore } from '../utils/Store'
import ModalCoords from '../components/ModalCoords'
import ProviderLogin from './ProviderLogin'

function Dashboard() {
  let navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const currentProvider = JSON.parse(localStorage.getItem('currentProvider'))
  const [open, setOpen] = useState(false)
  const [connect, setConnect] = useState(false)
  const [isProvider, setIsProvider] = useState(false)
  // const [provider, setProvider] = useState()
  // const socket = useRef()
  // const [notifications, setNotifications] = useState([])
  const coords = useStore((state) => state.coords)
  const updateCoords = useStore((state) => state.updateCoords)

  useEffect(() => {
    if (!currentProvider) {
      setConnect(true)
    }
    setIsProvider(true)
  })

  useEffect(() => {
    updateCoords()

    const update = async () => {
      await axios
        .patch(
          `https://uty-ti30.onrender.com/api/provider/updateCoords/${currentUser._id}`,
          {
            coords,
          }
        )
        .then((response) => console.log(response))
    }
    if (coords.length > 0) {
      update()
    } else {
      setOpen(true)
    }

    // const getProvider = async () => {
    //   // const response = await axios.get(
    //   //   `https://uty-ti30.onrender.com/api/auth/getProvider/${currentUser._id}`
    //   // )
    //   // setProvider(response.data)
    //   // localStorage.setItem('currentProvider', JSON.stringify(response.data))
    //   // console.log(provider)
    // }

    // getProvider()
    console.log(coords)
    // socket.current = io('')
    // socket.current.emit('add-user', currentUser._id, currentUser.username)
  }, [coords])

  // console.log(latitude)

  // useEffect(() => {
  //   socket.current.on('provider_notif', (sender) => {
  //     setNotifications((prev) => [...prev, sender])
  //   })
  // }, [socket])

  // console.log(notifications)

  return (
    <Container>
      <Nav isProvider={isProvider} />
      <div className="list__post">
        <h3 className="provider__accroche">Pénètre ton marché différement</h3>
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
        <div
          className="commande__link"
          onClick={() => {
            navigate('/Command')
          }}
        >
          <div
            className="box__description"
            onClick={() => {
              navigate('/Command')
            }}
          >
            Ventes
          </div>
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
            navigate('/ConfirmT')
          }}
        >
          <div
            className="box__description"
            onClick={async () => {
              localStorage.setItem('currentLocation')
              navigate('/ConfirmT')
            }}
          >
            Traçage
          </div>
          <img src={map} alt="" />
        </div>
      </div>
      {open && <ModalCoords setOpen={setOpen} />}
      {connect && <ProviderLogin setConnect={setConnect} />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    text-align: center;
    font-size: 125%;
  }
  .list__post {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1vh 7.5vw;
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
