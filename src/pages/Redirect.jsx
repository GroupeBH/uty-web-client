import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import utyLogo from '../assets/logo-uty.png'
import { IoMenu } from 'react-icons/io5'

function Redirect() {
  const navigate = useNavigate()
  return (
    <Container>
      <div className="sub__container">
        <div className="uty__logo">
          <img src={utyLogo} alt="uty-logo" />
        </div>
        <p>Bienvenu chez uty</p>

        <button onClick={() => navigate('/HomePage')}>Start</button>
      </div>
      <div className="desktop__display">
        <div className="start__navbar">
          <div className="uty__logo">
            <img src={utyLogo} alt="uty-logo" />
          </div>
          <IoMenu />
        </div>
        <div className="start__body">
          <div className="left__side">
            <div className="start__accroche">
              <h3>Bienvenu chez uty</h3>
              <p>Tout ce dont vous avez besoin en un click</p>
            </div>
            <button>Start</button>
          </div>
          <div className="right__side"></div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);
  .desktop__display {
    display: none;
  }
  .sub__container {
    background-color: white;
    height: 80vh;
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 1vh;
    border-radius: 1rem;
    .uty__logo {
      display: flex;
      justify-content: center;
      margin-top: -10vh;
      img {
        height: 25vh;
        width: 30vw;
      }
    }
    p {
      font-weight: bold;
      font-size: 150%;
      margin-top: 10vh;
      color: #7e7e80;
    }
    button {
      height: 10vh;
      width: 50vw;
      font-size: 200%;
      margin-top: 2.5vh;
      border: none;
      border-radius: 1rem;
      background-color: #020664;
      color: white;
      font-weight: bold;
    }
  }
  @media screen and (min-width: 992px) {
    .desktop__display {
      display: block;
      background-color: white;
      width: 97.5vw;
      height: 97.5vh;
      border-radius: 1rem;
      .start__navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1vh 2.5vw;
        svg {
          font-size: 300%;
        }
        .uty__logo {
          display: flex;
          justify-content: center;
          img {
            height: 10vh;
            width: 5vw;
          }
        }
      }
      .start__body {
        display: flex;
        .start__accroche {
          h3 {
            font-size: 250%;
          }
        }
        button {
          height: 5vh;
          width: 5vw;
        }
      }
    }
    .sub__container {
      display: none;
    }
  }
`

export default Redirect
