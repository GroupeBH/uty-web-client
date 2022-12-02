import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import utyLogo from '../assets/logo-uty.png'
import { IoNotifications } from 'react-icons/io5'
import MenuProvider from '../components/MenuProvider'
import axios from 'axios'
import { useState } from 'react'
import PreOrders from '../components/PreOrders'
import Proposition from '../components/Proposition'

function Order() {
  let navigate = useNavigate()
  const [preCommand, setPreCommand] = useState([])
  const [currentTrade, setCurrentTrade] = useState(undefined)

  useEffect(() => {
    const getPreOrders = async () => {
      const response = await axios.get(
        'http://localhost:5100/api/preOrder/getpre'
      )
      setPreCommand(response.data)
      console.log(response.data)
    }
    getPreOrders()
  }, [])
  const handleTradeChange = (trade) => {
    setCurrentTrade(trade)
  }
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
        <IoNotifications className="notification__icon" />
        <MenuProvider />
      </div>
      <div className="order__page">
        <PreOrders preCommand={preCommand} changeTrade={handleTradeChange} />
        {currentTrade && <Proposition />}
      </div>
    </Container>
  )
}

const Container = styled.div`
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: -5vw;
    margin-left: -5vw;
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
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
      }
    }
    .notification__icon {
      font-size: 260%;
    }
    .menu__icon {
      align-self: center;
      font-size: 260%;
      margin-right: 1vh;
    }
  }
`

export default Order
