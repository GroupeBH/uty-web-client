import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IoArrowBackOutline } from 'react-icons/io5'
import utyLogo from '../assets/logo-uty.png'
import ModalSign from '../components/ModalSign'
import ModalConnect from './ModalConnect'
import { Rings } from 'react-loader-spinner'

export default function Register() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }
  const [values, setValues] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  // useEffect(() => {
  //   if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
  //     navigate('/Login');
  //   }
  // }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email, phone } = values
    if (password !== confirmPassword) {
      toast.error('Password and confirm password should be same.', toastOptions)
      setIsLoad(false)
      return false
    } else if (username.length < 3) {
      toast.error('Username should be greater than 3 characters.', toastOptions)
      setIsLoad(false)
      return false
    } else if (password.length < 8) {
      toast.error(
        'Password should be equal or greater than 8 characters.',
        toastOptions
      )
      return false
    } else if (email === '' && phone === '') {
      toast.error('Email or phone is required.', toastOptions)
      return false
    }

    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoad(true)
    if (handleValidation()) {
      const { email, username, phone, password } = values
      const { data } = await axios.post(
        'https://uty-ti30.onrender.com/api/auth/register',
        {
          username,
          email,
          phone,
          password,
        }
      )

      if (data.status === false) {
        toast.error(data.msg, toastOptions)
        setIsLoad(false)
      }
      if (data.status === true) {
        setIsLoad(false)
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        setOpen(true)
      }
    }
  }

  return (
    <>
      <FormContainer>
        <div className="register__page">
          <div className="image__side">
            <img src="" alt="" />
          </div>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <IoArrowBackOutline onClick={() => navigate('/HomePage')} />
            <img src={utyLogo} alt="" />
            <h3>
              Inscrivez vous à <span className="uty__name">uty</span>
            </h3>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Téléphone"
              name="phone"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">
              {isLoad ? (
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
                <>Enregistrement</>
              )}
            </button>
            <p>
              Ou <span onClick={() => setIsOpen(true)}>connectez-vous</span>
              si vous avez un compte
            </p>
          </form>
        </div>
      </FormContainer>
      {open && <ModalSign />}
      {isOpen && <ModalConnect setIsOpen={setIsOpen} />}
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    .register__page {
      height: 100vh;
      width: 100vw;
      display: flex;
      background-color: white;
      align-items: center;
      justify-content: center;
      .image__side {
        display: none;
        img {
          height: 50vh;
          width: 40vw;
        }
      }
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2rem;
      background-color: white;
      padding: 3rem 5rem;
      text-align: center;
      svg {
        font-size: 250%;
      }
      img {
        height: 12.5vh;
        width: 20vw;
        align-self: center;
      }
      h3 {
        font-weight: bold;
        font-size: 150%;
        margin-bottom: -1vh;
        margin-top: -1vh;
        .uty__name {
          color: #fa5343;
          font-weight: bold;
        }
      }
      input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid silver;
        border-radius: 0.4rem;
        color: #2b2828;
        width: 80vw;
        height: 2vh;
        font-size: 1rem;
        margin-top: -2vh;
        &:focus {
          border: 0.1rem solid #997af0;
          outline: none;
        }
      }
      button {
        background-color: #040154;
        color: white;
        height: 7.5vh;
        border: none;
        font-weight: bold;
        margin-top: -1vh;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: bold;
      }
      p {
        color: black;
        margin-bottom: 2.5vh;
        margin-top: -2.5vh;
        font-size: 105%;
        span {
          color: red;
          font-weight: semi-bold;
          margin-right: 1vw;
        }
      }
    }
  }
  /* height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: silver;
  .register__page {
    display: flex;
    background-color: white;
    align-items: center;
    border-radius: 1rem;
    .image__side {
      img {
        height: 50vh;
        width: 40vw;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: white;
    border-radius: 2rem;
    padding: 3rem 5rem;
    text-align: center;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid silver;
    border-radius: 0.4rem;
    color: #2b2828;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  } */
`
