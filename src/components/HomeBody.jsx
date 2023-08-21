import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import HomeCards from './HomeCards'
import {
  FaHandHoldingUsd,
  FaShippingFast,
  FaShoppingCart,
} from 'react-icons/fa'

export default function HomeBody() {
  const [forCustomer, setForCustomer] = useState(true)
  const [forProvider, setForProvider] = useState(false)
  const [forDeliver, setForDeliver] = useState(false)

  const [rideStyle, setRideStyle] = useState(false)
  const [style, setStyle] = useState(true)
  const [pStyle, setPstyle] = useState(false)

  return (
    <Container>
      <div className="sidebar">
        <div
          className={style ? 'side__clicked' : 'sidebar__item'}
          onClick={() => {
            setForCustomer(true)
            setForDeliver(false)
            setForProvider(false)
            setStyle(true)
            setPstyle(false)
            setRideStyle(false)
          }}
        >
          <FaShoppingCart />
          <span>Acheter avec uty</span>
        </div>
        <div
          className={rideStyle ? 'side__clicked' : 'sidebar__item'}
          onClick={() => {
            setForCustomer(false)
            setForDeliver(true)
            setForProvider(false)
            setRideStyle(true)
            setStyle(false)
            setPstyle(false)
          }}
        >
          <FaShippingFast />
          <span>Livrer avec uty</span>
        </div>
        <div
          className={pStyle ? 'side__clicked' : 'sidebar__item'}
          onClick={() => {
            setForCustomer(false)
            setForDeliver(false)
            setForProvider(true)
            setPstyle(true)
            setStyle(false)
            setRideStyle(false)
          }}
        >
          <FaHandHoldingUsd />
          <span>Devenir marchand</span>
        </div>
      </div>

      <div className="separator__container">
        <hr className="separator" />
      </div>

      <div className="home__body">
        {forCustomer && (
          <HomeCards
            title={'Recherche, trouve, paie, et fait toi livrer'}
            text={'Mode, alimentation, quincaillerie...'}
            path={'/Categories'}
            button={'Trouver et commander'}
          />
        )}
        {forDeliver && (
          <HomeCards
            title={'Gagner de l argent en livrant avec uty'}
            text={'Accedez au plus grand reseau de livraison de Kinshasa'}
            path={'/Shipments'}
            button={'Livrer avec uty'}
          />
        )}
        {forProvider && (
          <HomeCards
            title={'Aggrandissez votre business avec uty'}
            text={'Apportez vos produits directement chez le client'}
            path={'/Dashboard'}
            button={'Devenir marchand'}
          />
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding-top: 1vh;
  padding-bottom: 1vh;
  .separator__container {
    hr .separator {
      border: 1px solid silver;
    }
  }
  .sidebar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vh 3vw;
    .side__clicked {
      background-color: orange;
      text-align: center;
      width: 35%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 1vh;
      padding-bottom: 1vh;
      gap: 1.5vh 1vw;
      cursor: pointer;
      color: white;
      svg {
        font-size: 200%;
      }
      span {
        font-size: 130%;
        width: 80%;
      }
    }
    .sidebar__item {
      text-align: center;
      width: 35%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5vh 1vw;
      padding-top: 1vh;
      padding-bottom: 1vh;
      cursor: pointer;
      svg {
        font-size: 200%;
      }
      span {
        font-size: 130%;
        width: 80%;
      }
    }
  }

  //desktop
  @media all and (min-width: 992px) {
    height: 60vh;
    width: 40vw;
  }

  @media all and (765px <= width < 992px) {
    height: 70vh;
    width: 70vw;
  }
`
