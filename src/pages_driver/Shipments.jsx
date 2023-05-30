import React, { useEffect } from 'react'
import styled from 'styled-components'
import Nav from '../components/Nav'
import _ from 'lodash'
import { useShipmentStore } from '../utils/shipmentStore'

function Shipments() {
  const updateShipments = useShipmentStore((state) => state.updateShipments)
  const shipments = useShipmentStore((state) => state.shipments)
  const updateDistance = useShipmentStore((state) => state.updateDistance)
  const distance = useShipmentStore((state) => state.distance)
  const duration = useShipmentStore((state) => state.duration)
  useEffect(() => {
    updateShipments()
  }, [])

  useEffect(() => {
    _.forEach(shipments, (shipment) =>
      updateDistance(shipment.pickupLocation, shipment.dropLocation)
    )
  }, [shipments])

  return (
    <Container>
      <Nav />
      <div>
        {_.filter(shipments, (ship) => ship.pickupLocation.length > 0).map(
          (shipment) => {
            return (
              <div key={shipment._id}>
                <p>{shipment._id}</p>
                <span>{distance} kilomètres</span>
                <span>{duration} minutes</span>
              </div>
            )
          }
        )}
      </div>
    </Container>
  )
}

const Container = styled.div``

export default Shipments
