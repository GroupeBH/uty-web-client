import React from 'react'
import styled from 'styled-components'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import utyLogo from '../assets/logo-uty.png'

function SearchT() {
  const navigate = useNavigate()
  return (
    <Container>
      <div className="inputs__field">
        <IoArrowBackOutline onClick={() => navigate('/DeliveryOne')} />
        <img src={utyLogo} alt="uty logo" />
        <p>Renseignez le trajet de la livraison</p>
        <input
          type="text"
          placeholder="Entrez le point de récuperation de la marchandise"
        />
        <input
          type="text"
          placeholder="Entrez le point de dépot de la marchandise"
        />
      </div>
      <div></div>
      <button onClick={() => navigate('/ConfirmT')}>Confirmer le trajet</button>
    </Container>
  )
}

const Container = styled.div`
  padding: 2vh 5vw;
  .inputs__field {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5vh;
    margin-bottom: 3vh;
    svg {
      align-self: flex-start;
      font-size: 250%;
      color: #020664;
    }
    p {
      font-size: 110%;
    }
    img {
      height: 20vh;
      width: 30vw;
    }
    input {
      height: 7.5vh;
      width: 85vw;
      border-radius: 0.5rem;
      padding-left: 2.5vw;
      font-size: 90%;
    }
  }
  button {
    height: 8.5vh;
    width: 90vw;
    font-size: 125%;
    border-radius: 0.5rem;
    background-color: #020664;
    color: white;
  }
`
export default SearchT
