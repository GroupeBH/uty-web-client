import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import Commande from '../assets/Articles vendus.png'
import Proposition from '../components/Proposition'
import moment from 'moment'

function Order() {
  const [preCommand, setPreCommand] = useState([])
  const [isClick, setIsClick] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [description, setDescription] = useState('')
  useEffect(() => {
    const getPreOrders = async () => {
      const response = await axios.get(
        'http://localhost:5200/api/preOrder/getpre'
      )
      setPreCommand(response.data)
      console.log(response.data)
    }
    getPreOrders()
  }, [])
  return (
    <Container>
      <div className="order__page">
        {preCommand.map((preCom) => {
          console.log(preCom._id)
          return (
            <div className="normal" key={preCom._id}>
              <div className="image__precommand">
                {preCom.image ? (
                  <img src={preCom.image} alt="precommand-image" />
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
                  setSelectedId(preCom._id)
                  setDescription(preCom.description)
                }}
              >
                Répondre
              </button>
            </div>
          )
        })}
        {isClick && (
          <Proposition
            id={selectedId}
            setIsClick={setIsClick}
            description={description}
          />
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
  .order__page {
    display: flex;
    flex-direction: column;
    .normal {
      display: flex;
      padding: 1vh 2.5vw;
      align-items: center;
      border-color: silver 1px;
      background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
      margin: 2vh 2vw;
      border-radius: 0.5rem;
      .preOrder__description {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
        margin-left: 2.5vw;
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
