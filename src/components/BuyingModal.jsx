import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import utyLogo from '../assets/logo-uty.png'
import { Rings } from 'react-loader-spinner'
import { useShipmentStore } from '../utils/shipmentStore'
import axios from 'axios'
import PayModal from './PayModal'

function BuyingModal({ setIsBuying, selectedOffer, dropOffCoord }) {
  const [loading, setLoading] = useState(false)
  const price = useShipmentStore((state) => state.price)
  const updatePrice = useShipmentStore((state) => state.updatePrice)
  // const provider = useShipmentStore((state) => state.provider)
  const updateProvider = useShipmentStore((state) => state.updateProvider)

  const pickUp = useShipmentStore((state) => state.pickUp)
  const distance = useShipmentStore((state) => state.distance)
  const updateDistance = useShipmentStore((state) => state.updateDistance)

  // const payProduct = async () => {
  //   await axios.post('http://ip:port/api/rest/v1/paymentService', {

  //   })
  // }

  useEffect(() => {
    updateProvider(selectedOffer.provider.user)
  }, [])

  useEffect(() => {
    console.log(pickUp, dropOffCoord)
    updateDistance(pickUp, dropOffCoord)
    updatePrice(selectedOffer.price, distance)
  }, [pickUp, dropOffCoord])

  const payOrder = async (price) => {
    try {
      await axios
        .post('https://beta-cardpayment.flexpay.cd/v1.1/pay', {
          authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJcL2xvZ2luIiwicm9sZXMiOlsiTUVSQ0hBTlQiXSwiZXhwIjoxNzUwNTg2MDA2LCJzdWIiOiIxOTRiOTlhYjcwODQ4NjgxNjZiZDhhZDNmOTMzMTkzYyJ9.vJQnO5Nt8Hj2DOx2jKMd_iiPGn6Myur7D0iTPhgCTcs',
          merchant: 'GBHOLDING',
          reference: 'TEST0014521',
          amount: `${price}`,
          currency: 'CDF',
          description: 'Tests de paiement',
          callback_url: 'http://localhost:3000',
          approve_url: 'http://localhost:3000/Categories',
          cancel_url: 'http://localhost:3000/Home',
          decline_url: 'http://localhost:3000/Offer',
        })
        .then((response) => console.log(response.data))
    } catch (e) {
      console.log(e)
    }
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      await axios.patch(
        'https://uty-ti30.onrender.com/api/order/confirmOrder',
        {
          orderId: selectedOffer._id,
          status: 'confirmed',
          price: price + price * 0.1,
        }
      )
      payOrder(price + price * 0.1)
      setLoading(false)
      setIsBuying(false)
    } catch (error) {
      setLoading(false)
      setIsBuying(false)
    }
  }

  return (
    <Container>
      <div className="modal__back">
        <div className="centered">
          <div className="modal__body">
            <img src={utyLogo} />
            <div className="offer__detail">
              <p>Total à payer: {price + price * 0.1} fc</p>
              <PayModal price={price + price * 0.1} />
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
