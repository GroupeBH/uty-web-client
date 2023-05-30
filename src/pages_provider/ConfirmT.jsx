import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Map from '../components/Map'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useShipmentStore } from '../utils/shipmentStore'
import { Rings } from 'react-loader-spinner'

function ConfirmT() {
  const [load, setLoad] = useState(false)
  // const [pickUpCoord, setPickUpCoord] = useState()
  // const [dropOffCoord, setDropOffCoord] = useState()
  const updateOrder = useShipmentStore((state) => state.updateOrder)
  const updateDistance = useShipmentStore((state) => state.updateDistance)
  const distance = useShipmentStore((state) => state.distance)
  const duration = useShipmentStore((state) => state.duration)
  const order = useShipmentStore((state) => state.order)
  const updatePickUpCoord = useShipmentStore((state) => state.updatePickUpCoord)
  const pickUpLocation = useShipmentStore((state) => state.pickUpCoord)
  const dropOffLocation = useShipmentStore((state) => state.dropOffCoord)
  // const pickUp = 'Kintambo magasin'
  // const dropOff = 'Kinshasa, Masanga-mbila'

  const params = useParams()

  // const getPickUppoint = async () => {
  //   try {
  //     await axios
  //       .get(
  //         `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickUp}.json?` +
  //           new URLSearchParams({
  //             access_token:
  //               'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag',
  //             limit: 1,
  //           })
  //       )
  //       .then((response) => {
  //         setPickUpCoord(response.data.features[0].center)
  //       })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const getDropOffpoint = async () => {
  //   try {
  //     await axios
  //       .get(
  //         `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropOff}.json?` +
  //           new URLSearchParams({
  //             access_token:
  //               'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag',
  //             limit: 1,
  //           })
  //       )
  //       .then((response) => {
  //         setDropOffCoord(response.data.features[0].center)
  //       })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    // updateOrder(params.id)
    updateOrder(params.id)
    console.log('drop:', dropOffLocation)
    console.log(order)
  }, [params.id])

  useEffect(() => {
    // getPickUppoint()
    // getDropOffpoint()
    updatePickUpCoord(order.provider)
    console.log('pick:', pickUpLocation)
  }, [order.provider])

  useEffect(() => {
    updateDistance(pickUpLocation, dropOffLocation)
  }, [pickUpLocation, dropOffLocation])

  const handleClick = async () => {
    setLoad(true)
    try {
      console.log('pickup', pickUpLocation)
      console.log('dropoff :', dropOffLocation)
      console.log(order._id)
      await axios
        .post('http://localhost:5200/api/shipment/addShipment', {
          orderId: order._id,
          pickUp: pickUpLocation,
          dropOff: dropOffLocation,
        })
        .then((response) => {
          console.log(response.data)
          setLoad(false)
        })
    } catch (e) {
      console.log(e)
      setLoad(false)
    }
  }

  return (
    <Container>
      <Map pickUpCoord={pickUpLocation} dropOffCoord={dropOffLocation} />
      <div className="ship__details">
        <div className="ride__details">
          <div className="item">
            <span>Cout</span>
            <p>{1500 * distance} FC</p>
          </div>
          <div className="item">
            <span>Trajet</span>
            <p>{duration} minutes</p>
            <p>{distance} kilomètres</p>
          </div>
        </div>
        <button onClick={handleClick}>
          {load ? (
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
            <>Lancer la levée</>
          )}
        </button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5vh;
  .ship__details {
    display: flex;
    flex-direction: column;
    align-items: center;
    .ride__details {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2.5vh;
      .item {
        background-color: #f0eeee;
        height: 15vh;
        width: 37.5vw;
        border-radius: 0.5rem;
        padding: 1vh 2.5vw;
        margin-left: 3vw;
        margin-right: 3vw;
        span {
          font-size: 150%;
          font-weight: bold;
        }
        p {
          font-size: 110%;
          font-weight: semi-bold;
        }
      }
    }
    button {
      width: 90vw;
      height: 8.5vh;
      border-radius: 0.5rem;
      background-color: #020664;
      color: white;
      font-size: 125%;
      border: none;
      margin-bottom: 2.5vh;
    }
  }
`

export default ConfirmT
