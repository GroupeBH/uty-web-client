import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useState } from 'react'
import Commande from '../assets/Articles vendus.png'
// import Proposition from './Proposition'
import moment from 'moment'
import ModalError from '../components/ModalError'
// import loader from '../assets/loader.gif'
import Nav from '../components/Nav'
// import BigImage from './BigImage'
import { Link } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'

function Order() {
  // const [picClick, setPicClick] = useState(false)
  const [preCommand, setPreCommand] = useState([])
  // const [isClick, setIsClick] = useState(false)
  // const [selectedId, setSelectedId] = useState('')
  const [open, setOpen] = useState('')
  const [loading, setLoading] = useState(true)
  const [isCustomer, setIsCustomer] = useState(false)

  useEffect(() => {
    setIsCustomer(true)
    const getPreOrders = async () => {
      const response = await axios.get(
        'https://uty-ti30.onrender.com/api/order/getOrder'
      )
      setPreCommand(response.data)
      setLoading(false)
    }
    // const getOrders = async () => {
    //   const resp = await axios.get(
    //     'https://uty-ti30.onrender.com/api/order/getOrder'
    //   )
    //   setOrders(resp.data)
    // }
    getPreOrders()
    // getOrders()
  }, [])

  // console.log(orders)

  return (
    <>
      {loading ? (
        <ContainerL>
          {/* <img src={loader} alt="loader" className="loader" /> */}
          <InfinitySpin width="200" color="orange" />
        </ContainerL>
      ) : (
        <Container>
          <Nav isCustomer={isCustomer} />
          <div className="order__page">
            {preCommand.length == 0 && (
              <div className="empty">
                Il n{"'"}ya aucune commande en attente
              </div>
            )}
            {preCommand.map((preCom) => {
              return (
                <StyledLink
                  className="normal"
                  to={'/Order/' + preCom._id}
                  key={preCom._id}
                >
                  <div className="image__precommand">
                    {preCom.wanted.media ? (
                      <img
                        src={preCom.wanted.media}
                        alt="precommand-image"
                        className="preOrder__image"
                      />
                    ) : (
                      <img
                        className="default__image"
                        src={Commande}
                        alt="default-image"
                      />
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
                  {/* <button
                    onClick={() => {
                      // setIsClick(true)
                      // setSelectedId(preCom)
                    }}
                  >
                    Répondre
                  </button> */}
                </StyledLink>
              )
            })}
            {/* {isClick && (
              <Proposition
                preOrder={selectedId}
                setIsClick={setIsClick}
                setOpen={setOpen}
                setPicClick={setPicClick}
              />
            )} */}
            {open && <ModalError setOpen={setOpen} />}
          </div>
        </Container>
      )}
    </>
  )
}
const StyledLink = styled(Link)`
  text-decoration: none;
`
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
    flex-direction: column;
    justify-content: center;
    gap: 2.5vh 1vw;
    .empty {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #484747;
      font-size: 125%;
      margin-top: 20vh;
    }
    .normal {
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 5px silver;
      border-radius: 0.5rem;
      height: 15vh;
      box-sizing: border-box;
      box-sizing: content-box;
      .image__precommand {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 0px 5px silver;
        .default__image {
          height: 15vh;
          width: 30vw;
        }
        .preOrder__image {
          height: 15vh;
          width: 30vw;
        }
      }
      .preOrder__description {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
        padding: 2vh 3vw;
        .preOrder__desc {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 90%;
          .first {
            color: #020664;
            margin-top: -3.5vh;
          }
          .second {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 60vw;
            /* margin-top: -1.5vh; */
          }
        }
        .preOrder__date {
          display: flex;
          color: orange;
          margin-top: -1vh;
        }
      }

      button {
        display: none;
      }
    }
    /* .normal:hover {
      background-color: white;
      cursor: pointer;
      .image__precommand {
        display: none;
      }
      .preOrder__description {
        display: none;
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1vh 1vw;
        border-radius: 0.25rem;
        background-color: #ffc000;
        border: none;
        width: 50vw;
        height: 7.5vh;
        font-size: 120%;
      }
    } */
  }
`

export default Order
