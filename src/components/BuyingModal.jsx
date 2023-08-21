import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import utyLogo from '../assets/logo-uty.png'
import { IoArrowBackOutline } from 'react-icons/io5'
// import { Rings } from 'react-loader-spinner'
import { useShipmentStore } from '../utils/shipmentStore'
// import axios from 'axios'
import PayModal from './PayModal'
import ModalError from './ModalError'

function BuyingModal() {
  // const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [conn, setConn] = useState(true)
  const order = useShipmentStore((state) => state.order)
  const updateOrder = useShipmentStore((state) => state.updateOrder)
  const providerPrice = useShipmentStore((state) => state.providerPrice)
  const price = useShipmentStore((state) => state.price)
  const updatePrice = useShipmentStore((state) => state.updatePrice)

  // const updateProvider = useShipmentStore((state) => state.updateProvider)
  const updatePickUpCoord = useShipmentStore((state) => state.updatePickUpCoord)
  const dropOffCoord = useShipmentStore((state) => state.dropOffCoord)
  const pickUp = useShipmentStore((state) => state.pickUpCoord)
  const distance = useShipmentStore((state) => state.distance)
  const updateDistance = useShipmentStore((state) => state.updateDistance)

  const params = useParams()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  useEffect(() => {
    updateOrder(params.id)
    // updateProvider(selectedOffer.provider.user)
  }, [])

  useEffect(() => {
    updatePickUpCoord(order.provider)
  }, [order])

  useEffect(() => {
    console.log(pickUp, dropOffCoord)
    updateDistance(pickUp, dropOffCoord)
    updatePrice(providerPrice, distance)
  }, [pickUp, dropOffCoord, price])

  // const handleClick = async () => {
  //   setLoading(true)
  //   try {
  //     await axios.patch(
  //       'https://uty-ti30.onrender.com/api/order/confirmOrder',
  //       {
  //         orderId: selectedOffer._id,
  //         status: 'confirmed',
  //         price: price + price * 0.1,
  //       }
  //     )
  //     setLoading(false)
  //     setIsBuying(false)
  //   } catch (error) {
  //     setLoading(false)
  //     setIsBuying(false)
  //   }
  // }

  return (
    <Container>
      <div className="header">
        <IoArrowBackOutline onClick={() => navigate('/Offer')} />
        <img src={utyLogo} />
      </div>
      <div className="offer__detail">
        <div className="price__card">
          <span>Total à payer: </span>
          <p>{price + price * 0.1} CDF</p>
        </div>
        <PayModal
          price={price + price * 0.1}
          userId={currentUser._id}
          setConn={setConn}
        />
      </div>
      {!conn && <ModalError setOpen={setConn} />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh 1vw;
  z-index: 10;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    svg {
      font-size: 230%;
    }
    img {
      height: 10.5vh;
      margin-top: 2.5vh;
    }
  }
  .offer__detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3vh 1vw;
    width: 100%;
    .price__card {
      height: 15vh;
      width: 90%;
      padding: 2vh 1vw;
      border-radius: 0.5rem;
      box-shadow: 0px 0px 5px #5b5e5e;
      span {
        font-size: 120%;
        font-weight: semi-bold;
      }
      p {
        font-size: 190%;
      }
    }
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
`

export default BuyingModal
