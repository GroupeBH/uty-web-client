import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Map from '../components/Map'

function ConfirmT() {
  const [pickUpCoord, setPickUpCoord] = useState()
  const [dropOffCoord, setDropOffCoord] = useState()

  const getPickUppoint = () => {
    const pickUp = 'matete'
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickUp}.json`,
      new URLSearchParams({
        access_token:
          'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag',
        limit: 1,
      })
    )
      .then((response) => response.json())
      .then((data) => {
        setPickUpCoord(data.features[0].center)
        console.log(pickUpCoord)
      })
  }

  const getDropOffpoint = () => {
    const dropOff = 'Kintambo'
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropOff}.json`,
      new URLSearchParams({
        access_token:
          'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag',
        limit: 1,
      })
    )
      .then((response) => response.json())
      .then((data) => {
        setDropOffCoord(data.features[0].center)
        console.log(dropOffCoord)
      })
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
