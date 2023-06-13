import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import { useNavigate } from 'react-router-dom'
import utyLogo from '../assets/logo-uty.png'
import { Rings } from 'react-loader-spinner'
import { useShipmentStore } from '../utils/shipmentStore'
import axios from 'axios'
// import optimizedTrip from '../helpers/Mapbox'

function BuyingModal({ setIsBuying, selectedOffer, dropOffCoord }) {
  console.log(selectedOffer)
  // const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const price = useShipmentStore((state) => state.price)
  const updatePrice = useShipmentStore((state) => state.updatePrice)
  const provider = useShipmentStore((state) => state.provider)
  const updateProvider = useShipmentStore((state) => state.updateProvider)
  // const updatePickUpCoord = useShipmentStore((state) => state.updatePickUpCoord)
  const pickUp = useShipmentStore((state) => state.pickUp)
  const distance = useShipmentStore((state) => state.distance)
  const updateDistance = useShipmentStore((state) => state.updateDistance)

  useEffect(() => {
    updateProvider(selectedOffer.provider.user)
    console.log(distance, 'pickup at', pickUp)
    console.log(distance, 'dropoff at', dropOffCoord)
  }, [selectedOffer])

  useEffect(() => {
    updateDistance(pickUp, dropOffCoord)
    updatePrice(selectedOffer.price, distance)
    console.log(provider)
    console.log(selectedOffer.customer.coords)
    console.log('pick:', pickUp)
    console.log(price)
  }, [])

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
    } catch (error) {
      console.log(error)
      setLoading(false)
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
