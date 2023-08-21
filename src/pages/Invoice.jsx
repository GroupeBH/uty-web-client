import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// import { usePayStore } from '../utils/payStore'
import { InfinitySpin } from 'react-loader-spinner'
import axios from 'axios'
import utyLogo from '../assets/logo-uty.png'
import { FaExclamation, FaCheck } from 'react-icons/fa'

const Invoice = () => {
  let params = useParams()
  let navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [transaction, setTransaction] = useState()
  const [msg, setMsg] = useState()

  const handleClick = () => {
    if (transaction.data.status == '0') {
      navigate('/')
    } else {
      navigate(-1)
    }
  }
  const getTransaction = async (id, setLoading) => {
    try {
      await axios
        .get(`https://uty-ti30.onrender.com/api/payment/getTransaction/${id}`)
        .then((response) => {
          console.log(response.data)
          setTransaction(response.data)
          setMsg(response.data.data.message)
          setLoading(false)
        })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getTransaction(params.id, setLoading)
  }, [params])

  return (
    <>
      {loading ? (
        <ContainerL>
          <InfinitySpin width="200" color="orange" />
        </ContainerL>
      ) : (
        <Container>
          <div className="invoice__header">
            <h5 className="title">Mon paiement</h5>
            <img src={utyLogo} alt="uty logo" />
          </div>
          <div className="invoice__content">
            <div className="date">
              <span>Date de la transaction : </span>
              {transaction?.data.createDate}
            </div>
            <div className="status">
              <div className="status__icon">
                {transaction.data.status !== '0' ? (
                  <FaExclamation className="warning" />
                ) : (
                  <FaCheck className="success" />
                )}
              </div>
              <div className="status__text">{msg}</div>
            </div>
            <div className="details">
              <div className="details__card">
                <span>Montant à payer : </span>
                <p>
                  {transaction?.data.amountCustomer +
                    ' ' +
                    transaction.data.currency}
                </p>
              </div>
              <div className="details__card">
                <span>Canal de paiement : </span>
                <p>{transaction?.data.channel}</p>
              </div>
            </div>
          </div>
          <button onClick={handleClick}>
            {transaction.data.status == '0' ? 'ok' : 'Réesayer'}
          </button>
        </Container>
      )}
    </>
  )
}

const ContainerL = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 10vh;
    width: 20vw;
  }
`
const Container = styled.div`
  .invoice__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5vw;
    img {
      height: 10vh;
      width: 20vw;
    }
    h5 {
      font-size: 135%;
      color: #4d4b4b;
    }
  }

  .invoice__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh 1vw;
    .date {
      span {
        font-size: 120%;
        color: #2d2d2d;
        font-weight: semi-bold;
      }
    }
    .status {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 5px #5b5e5e;
      border-radius: 0.5rem;
      height: 20vh;
      width: 90vw;
      .status__text {
        font-size: 125%;
        font-weight: semi-bold;
      }
      .status__icon {
        .warning {
          color: red;
          font-size: 350%;
        }
        .success {
          color: green;
          font-size: 350%;
        }
      }
    }
    .details {
      display: flex;
      justify-content: space-between;
      width: 90vw;
      .details__card {
        display: flex;
        flex-direction: column;
        padding: 2vh 2vw;
        justify-content: center;
        box-shadow: 0px 0px 5px #5b5e5e;
        border-radius: 0.5rem;
        height: 20vh;
        width: 40vw;
        p {
          font-size: 175%;
        }
      }
    }
  }
  button {
    width: 90vw;
    height: 10vh;
    margin-top: 5vh;
    margin-left: 5vw;
    border: none;
    border-radius: 0.5rem;
    background-color: #020664;
    color: white;
    font-size: 120%;
  }
`

export default Invoice
