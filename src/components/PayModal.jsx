import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import drc from '../assets/cd.svg'
import { Rings } from 'react-loader-spinner'
import { usePayStore } from '../utils/payStore'
import mobilMoney from '../assets/mobile-money.png'
import bankCard from '../assets/bank-card.png'

export default function PayModal({ price, userId, setConn }) {
  const navigate = useNavigate()
  const [phone, setPhone] = useState()
  const [loading, setLoading] = useState(false)
  let orderNumber = usePayStore((state) => state.orderNumber)
  let updateOrderNumber = usePayStore((state) => state.updateOrderNumber)

  let cardUrl = usePayStore((state) => state.cardUrl)
  let updateCardUrl = usePayStore((state) => state.updateCardUrl)
  const payByMobile = async () => {
    try {
      setLoading(true)
      await axios
        .post('https://uty-ti30.onrender.com/api/payment/pay', {
          merchant: 'GBHOLDING',
          reference: uuidv4(),
          phone: phone,
          amount: `${price}`,
          user: userId,
          callback_url: 'https://uty.life/Home',
        })
        .then((response) => {
          console.log(response.data)
          navigate(
            `/invoice/${response.data.transaction.transaction.reference}`
          )
          setLoading(false)
        })

      // await axios
      //   .post('http://localhost:5200/api/payment/checkPay', {
      //     orderNumber: orderNumber,
      //     user: userId,
      //   })
      //   .then((response) => {
      //     navigate(`/invoice/${response.data.orderNumber}`)
      //   })
    } catch (e) {
      setLoading(false)
      setConn(false)
      console.log(e)
    }
  }

  const payByCard = async () => {
    try {
      await axios
        .post('https://uty-ti30.onrender.com/api/payment/pay', {
          merchant: 'GBHOLDING',
          reference: 'TEST0014521',
          amount: `${price}`,
          callback_url: 'https://uty.life/Home',
          approve_url: 'https://uty.life/Home',
          decline_url: 'https://uty.life/Home',
          cancel_url: 'https://uty.life/Home',
        })
        .then((response) => {
          console.log(response)
          console.log('card url:', response.data.data.url)
          console.log('order number:', response.data.data.orderNumber)
          updateCardUrl(response.data.data.url)
          updateOrderNumber(response.data.data.orderNumber)
          console.log(cardUrl, orderNumber)
          window.location.href = response.data.data.url
        })

      // await axios
      //   .post('https://uty-ti30.onrender.com/api/payment/checkPay', {
      //     orderNumber: orderNumber,
      //     user: userId,
      //   })
      //   .then((response) => {
      //     navigate(`/invoice/${response.data.orderNumber}`)
      //   })
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    let tel = '243' + _.toString(e.target.value)
    setPhone(tel)
  }
  return (
    <Container>
      <div className="pay__details">
        <div className="pay__button" onClick={payByCard}>
          <div className="prefix">
            <img src={bankCard} alt="" />
          </div>
          <div className="emoney">Acheter par carte</div>
        </div>

        <div className="intersection">
          <span>ou</span>
        </div>

        <div className="label">Entrer votre numero mobile money :</div>
        <div className="input__field">
          <div className="phone__prefix">
            <img src={drc} alt="drc lag" />
            <span>+243</span>
          </div>
          <div className="input__phone">
            <input
              type="number"
              placeholder="815060100"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="pay__button" onClick={payByMobile}>
          <div className="prefix">
            <img src={mobilMoney} alt="" />
          </div>
          <div className="emoney">
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
              <>Soumettre la requete</>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .pay__details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2vh 1vw;
    width: 100vw;
    .label {
      align-self: flex-start;
      margin-left: 5vw;
      font-size: 120%;
    }
    .intersection {
      font-size: 130%;
    }
    .pay__button {
      width: 92.5%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 0px 5px #5b5e5e;
      height: 10vh;
      .prefix {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15%;
        img {
          margin-left: -7.5vw;
        }
      }
      .emoney {
        width: 75%;
        background-color: silver;
        height: 10vh;
        margin-right: -8.5vw;
        display: flex;
        align-items: center;
        padding-left: 2.5vw;
        font-size: 130%;
        font-weight: semi-bold;
      }
    }

    .input__field {
      display: flex;
      align-items: center;
      width: 90%;
      margin-bottom: 1vh;
      .phone__prefix {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 5vh;
        padding: 1.5vh 2.5vw;
        background-color: #f0eded;
        box-shadow: 0px 0px 5px #5b5e5e;
        span {
          font-weight: semi-bold;
          font-size: 120%;
          margin-left: 1.5vw;
        }
        img {
          height: 1Ovh;
          width: 7.5vw;
          margin-top: -0.75vh;
        }
      }
      .input__phone {
        height: 5vh;
        padding: 1.5vh 2.5vw;
        box-shadow: 0px 0px 5px #5b5e5e;
        display: flex;
        align-items: center;
        input {
          height: 5.5vh;
          width: 95%;
          border: none;
          font-size: 120%;
        }
        input:focus {
          outline: none;
        }
      }
    }
  }
`
