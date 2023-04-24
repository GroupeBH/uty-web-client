import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import Commande from '../assets/Articles vendus.png'
import Proposition from '../components/Proposition'
import moment from 'moment'
import ModalError from '../components/ModalError'
import loader from '../assets/loader.gif'
import Nav from '../components/Nav'

function Order() {
  const [preCommand, setPreCommand] = useState([])
  const [isClick, setIsClick] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [open, setOpen] = useState('')
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getPreOrders = async () => {
      const response = await axios.get(
        'https://uty-ti30.onrender.com/api/order/getOrder'
      )
      setPreCommand(response.data)
      setLoading(false)
    }
    const getOrders = async () => {
      const resp = await axios.get(
        'https://uty-ti30.onrender.com/api/order/getOrder'
      )
      setOrders(resp.data)
    }
    getPreOrders()
    getOrders()
  }, [])

  console.log(orders)

  return (
    <>
      {loading ? (
        <ContainerL>
          <img src={loader} alt="loader" className="loader" />
        </ContainerL>
      ) : (
        <Container>
          <Nav />
          <div className="order__page">
            {preCommand.map((preCom) => {
              return (
                <div className="normal" key={preCom._id}>
                  <div className="image__precommand">
                    {preCom.wanted.media ? (
                      <img
                        src={preCom.wanted.media}
                        alt="precommand-image"
                        className="preOrder__image"
                      />
                    ) : (
                      <img src={Commande} alt="default-image" />
                    )}
                  </div>

                  <div className="preOrder__description">
                    <h5 className="preOrder__name"></h5>
                    <p className="preOrder__desc">
                      <span className="first">{preCom.category}</span>
                      <div className="second">{preCom.wanted.text}</div>
                    </p>
                    <p className="preOrder__date">
                      <span>
                        {moment(Date.now()).format('MMM Do YY') ===
                        moment(preCom.createdAt).format('MMM Do YY')
                          ? moment(Date.now()).format('h') ===
                            moment(preCom.createdAt).format('h')
                            ? moment(preCom.createdAt).fromNow()
                            : moment(Date.now()).format('h:s')
                          : moment(preCom.createdAt).format('DD/MM/YYYY  h:s')}
                      </span>
                    </p>
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
              <Proposition
                preOrder={selectedId}
                setIsClick={setIsClick}
                setOpen={setOpen}
              />
            )}
            {open && <ModalError setOpen={setOpen} />}
          </div>
        </Container>
      )}
    </>
  )
}

const ContainerL = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45vh;
  img {
    height: 10vh;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  .order__page {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5vh 5vw;
    .normal {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 5px silver;
      border-radius: 0.5rem;
      height: 25vh;
      width: 45vw;
      box-sizing: border-box;
      padding-top: 1vh;
      padding-bottom: 1vh;
      box-sizing: content-box;
      .image__precommand {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 5px silver;
        width: 80%;
        flex-grow: 2;
        padding: 2vh 1vw;
        .preOrder__image {
          height: 10vh;
          width: 20vw;
        }
      }
      .preOrder__description {
        display: flex;
        flex-direction: column;
        .preOrder__desc {
          display: flex;
          flex-direction: column;
          width: 90%;
          margin-top: -5vh;
          .first {
            color: #020664;
          }
          .second {
            height: 2vh;
            overflow: clip;
            width: 100%;
          }
        }
        .preOrder__date {
          display: flex;
          color: #fb2f17;
          margin-top: -2vh;
        }
      }

      button {
        display: none;
      }
    }
    .normal:hover {
      background-color: blue;
      cursor: pointer;
      .image__precommand {
        display: none;
      }
      .preOrder__description {
        display: none;
      }
      button {
        display: flex;
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
