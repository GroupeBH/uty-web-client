import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import utyLogo from '../assets/logo-uty.png'
import { Rings } from 'react-loader-spinner'
import { usePayStore } from '../utils/payStore'

function BuyingModal({ setIsBuying, selectedOffer }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const getToken = usePayStore((state) => state.fetchToken)
  const token = usePayStore((state) => state.token)
  const initData = usePayStore((state) => state.initData)
  const initPay = usePayStore((state) => state.fetchInitData)
  const urlSuccess = encodeURI('https://uty.life/Categories')
  const urlDecline = encodeURI('https://uty.life/Requetes')
  const login = ''
  const pwd = ''
  const pin = ''

  const bodyObject = {
    montant: selectedOffer.price,
    deviseiso: 'CDF',
    commentaire: 'Vous avez effectué un achat avec uty.life',
    urlSuccess: urlSuccess,
    urlDecline: urlDecline,
    motif: 'Paiement de course sur uty.life',
    fpid: 'FP0752',
    transactionId: '',
    nomMarchand: '',
    pin: '',
  }

  const headerObject = {
    token: token,
    login: login,
    pwd: pwd,
    pin: pin,
  }
  console.log(selectedOffer)

  useEffect(() => {
    getToken(login, pwd, pin)
    console.log(token)
  }, [token])

  const handleClick = async () => {
    setLoading(true)
    try {
      initPay(headerObject, bodyObject)
      if (initData) {
        navigate(
          `http://flashint.cfc-rdc.com:3000/flashpay/auth/${initData.urlTransaction}`
        )
      }
    } catch (error) {
      console.error(error)
    }
    setIsBuying(false)
    navigate('/Categories')
  }

  return (
    <Container>
      <div className="modal__back">
        <div className="centered">
          <div className="modal__body">
            <img src={utyLogo} />
            <div className="offer__detail">
              <p>Vendeur: {}</p>
              <p>{}</p>
            </div>
            <button onClick={handleClick}>
              {loading ? (
                <>
                  <div
                    className="loader"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '-2vh',
                    }}
                  >
                    <Rings height="80" width="80" color="white" />
                  </div>
                </>
              ) : (
                <>Acheter la marchandise</>
              )}
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .modal__back {
    background-color: rgba(0, 0, 0, 0.5);
    top: 100vh;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    transform: translate(-0%, -100%);
    position: absolute;
    margin-left: -5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .centered {
      background-color: white;
      padding-right: 1vw;
      padding-left: 2vw;
      text-align: center;
      margin-right: 5vw;
      margin-left: 5vw;
      border-radius: 1rem;
      padding-bottom: 2.5vh;
      .modal__body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10;
        img {
          height: 17.5vh;
          margin-top: 2.5vh;
        }
        p {
          font-size: 120%;
          font-weight: bold;
          color: #4f4b4b;
        }
        button {
          color: white;
          background-color: #020664;
          border: none;
          width: 80vw;
          height: 7.5vh;
          border-radius: 0.5rem;
          font-size: 120%;
          font-weight: bold;
        }
      }
    }
  }
`

export default BuyingModal
