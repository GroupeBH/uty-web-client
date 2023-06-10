import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { useShipmentStore } from '../utils/shipmentStore'
import { useState } from 'react'

function Shipments() {
  const navigate = useNavigate()
  const currentDeliver = JSON.parse(localStorage.getItem('currentDeliver'))
  const [isDeliver, setIsDeliver] = useState(false)
  const updateShipments = useShipmentStore((state) => state.updateShipments)
  const shipments = useShipmentStore((state) => state.shipments)

  const updateDistance = useShipmentStore((state) => state.updateDistance)
  const distance = useShipmentStore((state) => state.distance)
  const duration = useShipmentStore((state) => state.duration)

  const updateAdress = useShipmentStore((state) => state.updateAdress)
  const adressPickup = useShipmentStore((state) => state.adress)

  const updatedropAdress = useShipmentStore((state) => state.updateAdress)
  const adressDropOff = useShipmentStore((state) => state.adress)

  const updateOrder = useShipmentStore((state) => state.updateOrder)
  const customer = useShipmentStore((state) => state.customer)

  useEffect(() => {
    if (!currentDeliver) {
      navigate('/Deliver-sign-up')
    } else {
      setIsDeliver(true)
      updateShipments()
    }
  }, [])

  useEffect(() => {
    _.forEach(shipments, (shipment) =>
      updateDistance(shipment.pickupLocation, shipment.dropLocation)
    )

    _.forEach(shipments, (shipment) => updateAdress(shipment.pickupLocation))
    _.forEach(shipments, (shipment) => updatedropAdress(shipment.dropLocation))

    _.forEach(shipments, (shipment) => updateOrder(shipment.order))
  }, [shipments])

  return (
    <Container>
      <Nav isDeliver={isDeliver} />
      <div className="container__list">
        {_.filter(shipments, (ship) => ship.pickupLocation.length > 0).map(
          (shipment) => {
            return (
              <StyledLink
                to={'/shipments/' + shipment._id}
                className="ships__item"
                key={shipment._id}
              >
                <div className="command">
                  <p>
                    Commande de <span className="customer">{customer}</span>
                  </p>
                  <p className="ship__adresses">
                    <span>{adressPickup}</span>
                    <IoArrowForwardOutline />
                    <span>{adressDropOff}</span>
                  </p>
                </div>
                <div className="timeline">
                  <span>{distance} km</span>
                  <span>{duration} min</span>
                </div>
              </StyledLink>
            )
          }
        )}
      </div>
    </Container>
  )
}

const StyledLink = styled(Link)`
  text-decoration: none;
`
const Container = styled.div`
  .container__list {
    display: flex;
    flex-direction: column;
    gap: 2.5vh;
    .ships__item {
      display: flex;
      padding: 1vh 5vw;
      align-items: center;
      box-shadow: 0px 0px 5px silver;
      .command {
        flex-grow: 2;
        .ship__adresses {
          display: flex;
        }
      }
      .timeline {
        display: flex;
        flex-direction: column;
      }
    }
  }
`

export default Shipments
