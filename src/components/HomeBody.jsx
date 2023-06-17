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

  return (
    <Container>
      <div className="sidebar">
        <div
          className="sidebar__item"
          onClick={() => {
            setForCustomer(true)
            setForDeliver(false)
            setForProvider(false)
          }}
        >
          <FaShoppingCart />
          <span>Acheter avec uty</span>
        </div>
        <div
          className="sidebar__item"
          onClick={() => {
            setForCustomer(false)
            setForDeliver(true)
            setForProvider(false)
          }}
        >
          <FaShippingFast />
          <span>Livrer avec uty</span>
        </div>
        <div
          className="sidebar__item"
          onClick={() => {
            setForCustomer(false)
            setForDeliver(false)
            setForProvider(true)
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
    .sidebar__item {
      text-align: center;
      width: 35%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5vh 1vw;
      svg {
        font-size: 200%;
      }
      span {
        font-size: 130%;
        width: 80%;
      }
    }
  }
`
