import React, { useState } from 'react'
import styled from 'styled-components'
import { IoLocate, IoLocation } from 'react-icons/io5'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useStore } from '../utils/Store'

function SearchLocation({ handleClick }) {
  //   const navigate = useNavigate()
  const [adress, setAdress] = useState()
  const latitude = useStore((state) => state.latitude)
  const updateLatitude = useStore((state) => state.updateLatitude)
  const longitude = useStore((state) => state.longitude)
  const updateLongitude = useStore((state) => state.updateLongitude)
  const coords = useStore((state) => state.coords)
  const updateCoords = useStore((state) => state.updateCoords)

  const getSearchAdress = async (e) => {
    e.preventDefault()
    setAdress(e.target.value)
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?limit=2&access_token=pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag`
    )
    updateCoords(response.data)
    console.log(coords)
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      console.log('location not supproted')
    } else {
      console.log('locating...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLatitude(position.coords.latitude)
          updateLongitude(position.coords.longitude)
        },
        () => {
          console.log('enabled to retrieve location')
        }
      )
      handleClick()
    }
  }

  console.log(latitude, longitude)
  return (
    <Container>
      <div className="input__search">
        <div className="locate__flag">
          <IoLocate onClick={getSearchAdress} />
        </div>
        <input
          type="text"
          placeholder="Quelle est votre adresse?"
          onChange={(e) => getSearchAdress(e)}
        />
      </div>
      <div className="current__location">
        <span onClick={getLocation}>
          <IoLocation />
          Utiliser votre localisation actuelle
        </span>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .input__search {
    display: flex;
    width: 90vw;
    margin-bottom: 2.5vh;
    .locate__flag {
      background-color: orange;
      width: 15vw;
      height: 7.5vh;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        color: white;
        font-size: 150%;
      }
    }
    input {
      width: 75vw;
      height: 7.5vh;
      border: none;
    }
  }
  .current__location {
    width: 90vw;
    span {
      text-align: center;
      font-size: 115%;
      display: flex;
      align-items: center;
      svg {
        font-size: 185%;
        align-self: center;
        color: #020664;
      }
    }
  }
`

export default SearchLocation
