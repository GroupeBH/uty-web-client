import React from 'react'
import styled from 'styled-components'
import mapboxgl from 'mapbox-gl'
import Map from '../components/Map'
import utyLogo from '../assets/logo-uty.png'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../utils/Store'

mapboxgl.accessToken =
  'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag'

function DeliveryOne() {
  const data = JSON.parse(localStorage.getItem('currentUser'))
  const navigate = useNavigate()
  const latitude = useStore((state) => state.latitude)
  const longitude = useStore((state) => state.longitude)
  console.log(latitude)
  console.log(longitude)
  return (
    <Container>
      <Map />
      <div className="start__ride">
        <div className="head__words">
          <img src={utyLogo} alt="" />
          <span>{data.username}</span>
        </div>
        <h4>Livrez vos marchandises en toute sécurité</h4>
        <button onClick={() => navigate('/SearchT')}>Lancer la levée</button>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .start__ride {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    padding-top: 2.55vh;
    padding-bottom: 5vh;
    padding-left: 4.5vw;
    padding-right: 4.5vw;
    .head__words {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        height: 7.5vh;
        width: 12.5vw;
      }
      span {
        width: 30vw;
        height: 5vh;
        padding: 1vh 1vw;
        display: flex;
        justify-content: center;
        font-size: 150%;
        box-shadow: 0px 0px 5px silver;
        border-radius: 0.5rem;
      }
    }
    h4 {
      margin-left: 1.5vw;
      color: gray;
    }
    button {
      background-color: #020664;
      color: white;
      width: 87.5vw;
      height: 7.5vh;
      font-size: 135%;
      border-radius: 0.5rem;
      border: none;
      margin-left: 1.5vw;
    }
  }
`

export default DeliveryOne
