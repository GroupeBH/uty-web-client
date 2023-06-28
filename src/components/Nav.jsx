import React from 'react'
import styled from 'styled-components'
import utyLogo from '../assets/logo-uty.png'
import MenuClient from './MenuClient'

function Nav({ isProvider, isDeliver, isCustomer }) {
  return (
    <Container>
      <div className="page__title">
        <img src={utyLogo} alt="" className="uty__logo" />{' '}
      </div>
      <div className="count__container">
        <MenuClient
          isCustomer={isCustomer}
          isProvider={isProvider}
          isDeliver={isDeliver}
        />
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
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
    .uty__logo {
      height: 8vh;
      width: 12.5vw;
    }
  }
  .count__container {
    .menu__icon {
      font-size: 250%;
    }
  }

  //for desktop
  @media all and (min-width: 992px) {
    .page__title {
      padding-top: 1vh;
      .uty__logo {
        height: 10vh;
        width: 5vw;
      }
    }
  }

  //for tablets
  @media all and (765px <= width < 992px) {
    .page__title {
      padding-top: 1vh;
      .uty__logo {
        height: 8vh;
        width: 7.5vw;
      }
    }
  }
`

export default Nav
