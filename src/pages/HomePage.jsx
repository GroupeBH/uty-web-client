import React from 'react'
import styled from 'styled-components'
import decoback from '../assets/decoback.jpg'
import utyLogo from '../assets/logo-uty.png'
import { useNavigate } from 'react-router-dom'
import {} from 'react-icons/io5'
import ModalConnect from './ModalConnect'
import MenuClient from '../components/MenuClient'
import { useState } from 'react'
import ModalProviderC from '../pages_provider/ModalProviderC'
import CarrouselHome from '../components/CarrouselHome'

function HomePage() {
  let navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <div className="navbar">
        <div className="page__title" onClick={() => navigate('/Redirect')}>
          {' '}
          <img src={utyLogo} alt="" className="uty__logo" />{' '}
        </div>
        <div className="phone__navbar">
          <MenuClient />
        </div>
      </div>
      <div className="carousel">
        <CarrouselHome />
        {/* <div className="pub__container">
          <p className="pub__message">
            Découvrez le meilleur de la déco près de chez vous
          </p>
          <button className="pub__buttom">Voir plus</button>
        </div> */}
      </div>
      <div className="ads__list">
        <div className="carousel">
          <div className="pub__container">
            <p className="pub__message">
              Découvrez le meilleur de la déco près de chez vous
            </p>
            <button className="pub__buttom">Voir plus</button>
          </div>
        </div>
        <div className="carousel">
          <div className="pub__container">
            <p className="pub__message">
              Découvrez le meilleur de la déco près de chez vous
            </p>
            <button className="pub__buttom">Voir plus</button>
          </div>
        </div>
        <div className="carousel">
          <div className="pub__container">
            <p className="pub__message">
              Découvrez le meilleur de la déco près de chez vous
            </p>
            <button className="pub__buttom">Voir plus</button>
          </div>
        </div>
        <div className="carousel">
          <div className="pub__container">
            <p className="pub__message">
              Découvrez le meilleur de la déco près de chez vous
            </p>
            <button className="pub__buttom">Voir plus</button>
          </div>
        </div>
        <div className="carousel">
          <div className="pub__container">
            <p className="pub__message">
              Découvrez le meilleur de la déco près de chez vous
            </p>
            <button className="pub__buttom">Voir plus</button>
          </div>
        </div>
        <div className="carousel">
          <div className="pub__container">
            <p className="pub__message">
              Découvrez le meilleur de la déco près de chez vous
            </p>
            <button className="pub__buttom">Voir plus</button>
          </div>
        </div>
      </div>
      <div className="button__container">
        <button
          className="ask__service"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          Soumettre une requete
        </button>
        <button
          className="give__service"
          onClick={() => {
            setOpen(true)
          }}
        >
          Répondre à une requete
        </button>
      </div>
      <div className="footer">
        <p>
          Copyright by <span>uty</span>
        </p>
      </div>
      {isOpen && <ModalConnect setIsOpen={setIsOpen} />}
      {open && <ModalProviderC setOpen={setOpen} />}
    </Container>
  )
}

const Container = styled.div`
  .carousel {
    display: flex;
  }
  @media all and (min-width: 992px) {
    display: flex;
    flex-direction: column;
    .navbar {
      display: none;
    }
    .carousel {
      display: none;
    }
    .ads__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding-bottom: 5vw;
      .carousel {
        display: flex;
        align-items: center;
        height: 50vh;
        width: 25vw;
        background-image: url(${decoback});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin-left: 2.5vw;
        margin-top: 5vh;
        .pub__container {
          display: flex;
          flex-direction: column;
          margin-left: 5vw;
          padding-left: 2vw;
          padding-right: 2vw;
          background-color: #020664;
          width: 15vw;
          height: 35vh;
          justify-content: center;
          border-radius: 1rem;
          color: white;
          font-weight: bold;
          opacity: 70%;
          p {
            text-align: center;
            align-self: center;
            opacity: 100%;
          }
          .pub__buttom {
            background-color: orange;
            color: white;
            border: none;
            border-radius: 0.5rem;
            width: 10vw;
            height: 5vh;
            align-self: center;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
    .button__container {
      display: none;
    }
  }

  @media all and (max-width: 875px) {
    .ads__list {
      display: none;
    }
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: -2vw;
      background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
      padding: 1vh 5vw;
      margin-bottom: 2.5vh;
      .user__profil {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #020664;
        background-color: white;
        border-radius: 2rem;
        padding-left: 2vw;
        padding-right: 2vw;
        svg {
          font-size: 150%;
          cursor: pointer;
        }
      }

      .page__title {
        padding-top: 1vh;
        padding-right: 1vw;
        .uty__logo {
          height: 8vh;
          width: 12.5vw;
          margin-right: 1vw;
        }
      }
    }
    .carousel {
      display: block;
      /* display: flex;
      align-items: center;
      height: 50vh;
      width: 95vw;
      background-image: url(${decoback});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      margin-left: 2.5vw;
      margin-top: 5vh;
      .pub__container {
        display: flex;
        flex-direction: column;
        margin-left: 5vw;
        padding-left: 2.5vw;
        padding-right: 2.5vw;
        background-color: #020664;
        width: 50vw;
        height: 35vh;
        justify-content: center;
        border-radius: 1rem;
        color: white;
        font-weight: bold;
        opacity: 70%;
        p {
          text-align: center;
          align-self: center;
          opacity: 100%;
        }
        .pub__buttom {
          background-color: orange;
          color: white;
          border: none;
          border-radius: 0.5rem;
          width: 25vw;
          height: 5vh;
          align-self: center;
          font-weight: bold;
          cursor: pointer;
        }
      } */
    }

    .button__container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      margin-top: 5vh;
      width: 100vw;
      /* background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%); */
      padding-top: 0.75vh;
      padding-bottom: 10vh;
      .ask__service {
        height: 10vh;
        width: 95vw;
        padding-left: 6vw;
        padding-right: 6vw;
        margin-top: -0.1vh;
        font-size: 135%;
        font-weight: bold;
        border-radius: 0.5rem;
        background-color: #020664;
        color: white;
        border: none;
        cursor: pointer;
      }
      .give__service {
        height: 10vh;
        width: 95vw;
        padding-left: 6vw;
        padding-right: 6vw;
        margin-top: 2vh;
        font-size: 135%;
        font-weight: bold;
        border-radius: 0.5rem;
        background-color: orange;
        color: white;
        border: none;
        cursor: pointer;
      }
    }
    .footer {
      display: none;
    }
  }
`

export default HomePage
