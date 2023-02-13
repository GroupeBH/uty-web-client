import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Map from '../components/Map'
import axios from 'axios'

function ConfirmT() {
  const [pickUpCoord, setPickUpCoord] = useState()
  const [dropOffCoord, setDropOffCoord] = useState()
  const access_token =
    'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag'
  const getPickUppoint = async () => {
    const pickUp = 'Kintambo magasin'
    try {
      const pickUrl = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickUp}.json?access_token=${access_token}`
      )
      console.log(pickUrl.data)
      setPickUpCoord(pickUrl.data.features[0].center)
    } catch (error) {
      console.log(error)
    }
  }

  const getDropOffpoint = async () => {
    const dropOff = 'Kinshasa, Masanga-mbila'
    try {
      const pickUrl = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropOff}.json?access_token=${access_token}`
      )
      console.log(pickUrl.data)
      setDropOffCoord(pickUrl.data.features[0].center)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPickUppoint()
    getDropOffpoint()
  })
  return (
    <Container>
      <Map pickUpCoord={pickUpCoord} dropOffCoord={dropOffCoord} />
      <div className="button__side">
        <button>Lancer la levée</button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7.5vh;
  .button__side {
    display: flex;
    justify-content: center;
    button {
      width: 90vw;
      height: 8.5vh;
      border-radius: 0.5rem;
      background-color: #020664;
      color: white;
      font-size: 125%;
      border: none;
    }
  }
`

export default ConfirmT
