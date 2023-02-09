import React from 'react'
import styled from 'styled-components'
import Map from '../components/Map'

function ConfirmT() {
  const getDropOffpoint = () => {
    const dropOff = 'Kinshasa,gombe'
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropOff}.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  }
  getDropOffpoint()
  return (
    <Container>
      <Map />
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
