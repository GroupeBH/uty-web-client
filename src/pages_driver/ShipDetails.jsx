import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Map from '../components/Map'
import ModalShip from '../components/ModalShip'
import { useShipmentStore } from '../utils/shipmentStore'

export const ShipDetails = () => {
  const params = useParams()

  const updateShipment = useShipmentStore((state) => state.updateShipment)
  const shipment = useShipmentStore((state) => state.shipment)

  const updateOrder = useShipmentStore((state) => state.updateOrder)
  const order = useShipmentStore((state) => state.order)
  const customer = useShipmentStore((state) => state.customer)

  const updatePickAdress = useShipmentStore((state) => state.updateAdress)
  const updatedropAdress = useShipmentStore((state) => state.updateAdress)
  const pickAdress = useShipmentStore((state) => state.adress)
  const dropAdress = useShipmentStore((state) => state.adress)

  const updateDistance = useShipmentStore((state) => state.updateDistance)
  const distance = useShipmentStore((state) => state.distance)
  const duration = useShipmentStore((state) => state.duration)

  const [isClick, setIsClick] = useState(false)

  useEffect(() => {
    updateShipment(params.id)
  }, [params.id])

  useEffect(() => {
    updateOrder(shipment.order)
    updatePickAdress(shipment.pickupLocation)
    updatedropAdress(shipment.dropLocation)
    updateDistance(shipment.pickupLocation, shipment.dropLocation)
  }, [shipment])
  return (
    <Container>
      <>
        <Map
          pickUpCoord={shipment.pickupLocation}
          dropOffCoord={shipment.dropLocation}
        />
        <div className="ship__detail">
          <div className="ship__preview">
            <p>{customer}</p>
            <span onClick={() => setIsClick(true)}>Voir plus de details</span>
          </div>
          <div className="ship__body">
            <div className="ship__item">
              <span className="item__title">Trajet</span>
              <span>{distance} km</span>
            </div>
            <div className="ship__item">
              <span className="item__title">Durée de la course</span>
              <span>{duration} min</span>
            </div>
          </div>
          <div className="button__side">
            <button className="accept">Accepter</button>
            <button className="deny">Refuser</button>
          </div>
        </div>
        {isClick && (
          <ModalShip
            // shipment={shipment}
            order={order}
            pickAdress={pickAdress}
            dropAdress={dropAdress}
            distance={distance}
            setIsClick={setIsClick}
          />
        )}
      </>
    </Container>
  )
}

const Container = styled.div`
  .ship__detail {
    padding: 1vh 5vw;
    .ship__preview {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ship__body {
      display: flex;
      justify-content: space-between;
      .ship__item {
        display: flex;
        flex-direction: column;
        padding: 1.5vh 2vw;
        border-radius: 0.5rem;
        height: 10.5vh;
        width: 35vw;
        background-color: silver;
        .item__title {
          font-size: 100%;
          color: black;
        }
        span {
          font-size: 175%;
          color: #020664;
        }
      }
    }
    .button__side {
      display: flex;
      justify-content: space-between;
      margin-top: 2.5vh;
      button {
        width: 47.5%;
        height: 7.5vh;
        border-radius: 0.5rem;
        border: none;
        color: white;
        font-size: 130%;
      }
      .accept {
        background-color: #020664;
      }
      .deny {
        background-color: orange;
      }
    }
  }
`
