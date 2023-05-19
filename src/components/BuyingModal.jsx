import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import { useNavigate } from 'react-router-dom'
import utyLogo from '../assets/logo-uty.png'
import { Rings } from 'react-loader-spinner'
import { usePayStore } from '../utils/payStore'
import { useShipmentStore } from '../utils/shipmentStore'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
// import optimizedTrip from '../helpers/Mapbox'

function BuyingModal({ setIsBuying, selectedOffer }) {
  console.log(selectedOffer)
  // const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const price = useShipmentStore((state) => state.price)
  const updatePrice = useShipmentStore((state) => state.updatePrice)
  const getToken = usePayStore((state) => state.fetchToken)
  const token = usePayStore((state) => state.token)
  const initData = usePayStore((state) => state.initData)
  const initPay = usePayStore((state) => state.fetchInitData)
  const provider = useShipmentStore((state) => state.provider)
  const updateProvider = useShipmentStore((state) => state.updateProvider)
  const updatePickUpCoord = useShipmentStore((state) => state.updatePickUpCoord)
  const pickUpCoord = useShipmentStore((state) => state.pickUpCoord)
  const distance = useShipmentStore((state) => state.distance)
  const updateDistance = useShipmentStore((state) => state.updateDistance)
  const urlSuccess = encodeURI('https://uty.life/Categories')
  const urlDecline = encodeURI('https://uty.life/Requetes')
  const login = 'bjxbosuku@gmail.com'
  const pwd = 'Etumb@99'
  const pin = '130586'
  const transactionId = uuidv4()

  const bodyObject = {
    montant: price,
    deviseiso: 'CDF',
    commentaire: 'Vous avez effectué un achat avec uty.life',
    urlSuccess: urlSuccess,
    urlDecline: urlDecline,
    motif: 'Paiement de course sur uty.life',
    fpid: 'FP0752',
    transactionId: transactionId,
    nomMarchand: '',
    pin: '130586',
  }

  const headerObject = {
    token: token,
    login: login,
    pwd: pwd,
    pin: pin,
  }

  useEffect(() => {
    getToken(login, pwd, pin)
    console.log(token)
  }, [])

  const getShipPrice = async () => {
    await updatePickUpCoord(selectedOffer)
    await updateProvider(selectedOffer.provider.user)
    await updateDistance([-4.3054403, 15.3065331], [-4.30555503, 15.30667331])
    console.log(distance, 'pickup at', pickUpCoord)
    updatePrice(selectedOffer.price, distance)
  }

  useEffect(() => {
    getShipPrice()
    console.log(provider)
    console.log(selectedOffer.customer.coords)
    console.log(provider)
    console.log(price)
  }, [price])

  const handleClick = async () => {
    setLoading(true)
    try {
      await axios.patch(
        'https://uty-ti30.onrender.com/api/order/confirmOrder',
        {
          orderId: selectedOffer._id,
          status: 'confirmed',
          price: price,
        }
      )
      initPay(headerObject, bodyObject)
      if (initData) {
        await axios.get(
          `http://flashint.cfc-rdc.com:3000/flashpay/auth/${initData.urlTransaction}`
        )
      }
    } catch (error) {
      console.log(error)
      setIsBuying(false)
    }
    // setIsBuying(false)
    // navigate('/Categories')
  }

  return (
    <Container>
      <div className="modal__back">
        <div className="centered">
          <div className="modal__body">
            <img src={utyLogo} />
            <div className="offer__detail">
              <p>Total à payer: {price} fc</p>
              <p>Vendeur: </p>
            </div>
            <button onClick={handleClick}>
              {loading ? (
                <>
                  <div
                    className="loader"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '-2vh',
                    }}
                  >
                    <Rings height="80" width="80" color="white" />
                  </div>
                </>
              ) : (
                <>Acheter la marchandise</>
              )}
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .modal__back {
    background-color: rgba(0, 0, 0, 0.5);
    top: 100vh;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    transform: translate(-0%, -100%);
    position: absolute;
    margin-left: -5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .centered {
      background-color: white;
      padding-right: 1vw;
      padding-left: 2vw;
      text-align: center;
      margin-right: 5vw;
      margin-left: 5vw;
      border-radius: 1rem;
      padding-bottom: 2.5vh;
      .modal__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10;
        img {
          height: 17.5vh;
          margin-top: 2.5vh;
        }
        p {
          font-size: 120%;
          font-weight: bold;
          color: #4f4b4b;
        }
        button {
          color: white;
          background-color: #020664;
          border: none;
          width: 80vw;
          height: 7.5vh;
          border-radius: 0.5rem;
          font-size: 120%;
          font-weight: bold;
        }
      }
    }
  }
`

export default BuyingModal
