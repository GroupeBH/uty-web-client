import React from 'react'
import styled from 'styled-components'
import utyLogo from '../assets/logo-uty.png'
import MenuClient from './MenuClient'

function Nav() {
  return (
    <Container>
      <div className="page__title">
        <img src={utyLogo} alt="" className="uty__logo" />{' '}
      </div>
      <div className="count__container">
        <MenuClient />
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
`

export default Nav
