import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import utyLogo from '../assets/logo-uty.png'
import MenuProvider from '../components/MenuProvider'
import axios from 'axios'
import { useState } from 'react'
import Commande from '../assets/Articles vendus.png'
import Proposition from '../components/Proposition'
import moment from 'moment'

function Order() {
  let navigate = useNavigate()
  const [preCommand, setPreCommand] = useState([])
  const [isClick, setIsClick] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    const getPreOrders = async () => {
      const response = await axios.get(
        'https://uty-ti30.onrender.com/api/preOrder/getpre'
      )
      setPreCommand(response.data)
    }
    getPreOrders()
  }, [])

  return (
    <Container>
      <div className="navbar">
        <div className="page__title" onClick={() => navigate('/HomePage')}>
          <img
            src={utyLogo}
            alt=""
            className="uty__logo"
            onClick={() => navigate('/Dashboard')}
          />
        </div>
        <MenuProvider />
      </div>
      <div className="order__page">
        {preCommand.map((preCom) => {
          return (
            <div className="normal" key={preCom._id}>
              <div className="image__precommand">
                {preCom.image ? (
                  <img
                    src={preCom.image}
                    alt="precommand-image"
                    className="preOrder__image"
                  />
                ) : (
                  <img src={Commande} alt="default-image" />
                )}
              </div>
              <div className="preOrder__description">
                <h3 className="preOrder__name">{preCom.category}</h3>
                <p>{preCom.description}</p>
                <span className="preOrder__date">
                  <span>
                    {moment(Date.now()).format('MMM Do YY') ===
                    moment(preCom.createdAt).format('MMM Do YY')
                      ? moment(Date.now()).format('h') ===
                        moment(preCom.createdAt).format('h')
                        ? moment(preCom.createdAt).fromNow()
                        : moment(Date.now()).format('h:s')
                      : moment(preCom.createdAt).format('DD/MM/YYYY  h:s')}
                  </span>
                </span>
              </div>
              <button
                onClick={() => {
                  setIsClick(true)
                  setSelectedId(preCom)
                }}
              >
                Répondre
              </button>
            </div>
          )
        })}
        {isClick && (
          <Proposition preOrder={selectedId} setIsClick={setIsClick} />
        )}
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
    position: sticky;
    top: 0px;
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
      padding-left: 4.5vw;
      .uty__logo {
        height: 8vh;
        width: 12.5vw;
        margin-left: 2.5 vw;
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
  .order__page {
    display: flex;
    flex-direction: column;
    .normal {
      display: flex;
      padding: 1vh 2.5vw;
      align-items: center;
      border-color: silver 1px;
      /* background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%); */
      background-color: white;
      box-shadow: 0px 0px 5px silver;
      margin: 2vh 2vw;
      border-radius: 0.5rem;
      height: 20vh;
      .image__precommand {
        .preOrder__image {
          height: 10vh;
          width: 20vw;
        }
      }
      .preOrder__description {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
        margin-left: 2.5vw;
        width: 70%;
        h3 {
          color: #020664;
        }
        p {
          margin-top: -2.5vh;
          width: 50vw;
        }
      }
      .preOrder__date {
        display: flex;
        flex-direction: column;
        margin-right: 1vw;
        color: #fb2f17;
      }
      button {
        padding: 1vh 1vw;
        border-radius: 0.5rem;
        background-color: #ffc000;
        border: none;
        width: 30vw;
        height: 5vh;
      }
    }
  }
`

export default Order
