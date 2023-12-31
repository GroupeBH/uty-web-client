import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'
import utyLogo from '../assets/logo-uty.png'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Rings } from 'react-loader-spinner'
// import { useStore } from '../utils/Store'

function ProviderLogin({ setConnect }) {
  const location = localStorage.getItem('currentLocation')
  const navigate = useNavigate()
  const [values, setValues] = useState({ phone: '', password: '' })
  const [loading, setLoading] = useState(false)
  // const username = useStore((state) => state.username)

  console.log(location)

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const validateForm = () => {
    const { phone, password } = values
    if (phone === '') {
      toast.error('Email and Password is required.', toastOptions)
      setLoading(false)
      return false
    } else if (password === '') {
      toast.error('Email and Password is required.', toastOptions)
      setLoading(false)
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    if (validateForm()) {
      const { phone, password } = values
      const { data } = await axios.post(
        'https://uty-ti30.onrender.com/api/provider/login',
        {
          phone,
          password,
        }
      )
      console.log(data)
      if (data.status === false) {
        setLoading(false)
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem('currentProvider', JSON.stringify(data.provider))
        navigate('/Dashboard')
        setLoading(false)
        setConnect(false)
      }
    }
  }

  return (
    <Container>
      <div className="modal__back">
        <div className="centered">
          <div className="modal__body">
            <div className="login__page">
              <IoClose
                className="close__icon"
                onClick={() => {
                  navigate('/Provider-sign-up')
                  setConnect(false)
                }}
              />
              <div className="image__side">
                <img src="" alt="image__login" />
              </div>
              <form action="" onSubmit={(event) => handleSubmit(event)}>
                <img src={utyLogo} alt="" onClick={() => navigate('/')} />
                <h3>Se connecter à uty</h3>
                <input
                  type="text"
                  placeholder="0998877888"
                  name="phone"
                  onChange={(e) => handleChange(e)}
                  min="8"
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                <button type="submit">
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
                    <>Se connecter</>
                  )}
                </button>
                <span>
                  Do not have an account ?{' '}
                  <Link to="/Provider-sign-up" className="signR">
                    Create One.
                  </Link>
                </span>
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .modal__back {
    background-color: rgba(0, 0, 0, 0.2);
    width: 100vw;
    height: 100vh;
    z-index: 0;
    transform: translate(-0%, -100%);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 100vh;
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

        .login__page {
          display: flex;
          flex-direction: column;
          padding-top: 3vh;
          svg {
            font-size: 200%;
          }
          .image__side {
            display: none;
          }
        }
        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 3vh;
          padding: 2vh 5vw;
          img {
            height: 20vh;
            width: 20vw;
            align-self: center;
          }
          input {
            height: 5vh;
            margin-top: -1vh;
            margin-bottom: 1vh;
            margin-right: 0.5vw;
          }
          button {
            height: 7.5vh;
            font-size: 150%;
            font-weight: bold;
            border-radius: 0.5rem;
            border: none;
            background-color: #020664;
            color: white;
          }
          span {
            .signR {
              color: #fb2f17;
            }
          }
        }
      }
    }
  }
`

export default ProviderLogin
