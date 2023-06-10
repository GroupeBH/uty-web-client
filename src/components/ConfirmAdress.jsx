import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoClose, IoLocation } from 'react-icons/io5'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Map from './Map'
import axios from 'axios'
import { useStore } from '../utils/Store'
// import { useShipmentStore } from '../utils/shipmentStore'
import { Rings } from 'react-loader-spinner'
import { useShipmentStore } from '../utils/shipmentStore'

function ConfirmAdress({ coords, setIsConfirm, setIsBuying }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const updateAdress = useStore((state) => state.updateAdress)
  const adress = useStore((state) => state.adress)
  // const price = useShipmentStore((state) => state.price)
  const updatePrice = useShipmentStore((state) => state.updatePrice)
  const [loading, setLoading] = useState(false)
  // const [adress, setAdress] = useState()
  console.log(coords)
  useEffect(() => {
    const getAdress = async () => {
      try {
        await axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[1]},${coords[0]}.json?` +
              new URLSearchParams({
                access_token:
                  'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag',
                limit: 1,
              })
          )
          .then((response) => {
            // setAdress(response.data.features[0].place_name)
            console.log(response.data)
            updateAdress(response.data.features[0].place_name)
            console.log(adress)
          })
      } catch (error) {
        console.log(error)
      }
    }

    getAdress()
  }, [coords])

  const handleClick = async () => {
    console.log(adress)
    setIsBuying(true)
    const response = await axios.patch(
      `http://localhost:5200/api/auth/updateCoords/${currentUser._id}`,
      { coords }
    )
    setIsConfirm(false)
    setLoading(false)
    console.log(response)
  }

  return (
    <Container>
      <div className="body__back">
        <IoClose onClick={() => setIsConfirm(false)} />
        <div className="centered">
          <div className="confirm__body">
            <div className="map__side">
              <Map coords={coords} updatePrice={updatePrice} />
            </div>
            <div className="adress__container">
              <IoLocation className="adress__icon" />
              {adress}
            </div>
            <button className="confirm__command" onClick={handleClick}>
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
                <>Confirmer votre adresse de livraison</>
              )}
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  .body__back {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translate(-0%, -100%);
    top: 100vh;
    svg {
      align-self: flex-start;
      margin-left: 4vw;
      font-size: 250%;
      margin-bottom: -3vh;
      color: white;
    }
    .centered {
      display: flex;
      flex-direction: column;
      margin-top: 5vh;
      height: 88.5vh;
      background-color: white;
      width: 85vw;
      border-radius: 0.5rem;
      .confirm__body {
        .adress__container {
          display: flex;
          padding: 1.5vh 2.5vw;
          .adress__icon {
            font-size: 235%;
            margin-right: 2vw;
            color: orange;
          }
        }
        button {
          width: 90%;
          height: 7.5vh;
          border: none;
          border-radius: 0.5rem;
          background-color: #020664;
          color: white;
          font-size: 100%;
          margin-left: 5vw;
        }
      }
    }
  }
`

export default ConfirmAdress
