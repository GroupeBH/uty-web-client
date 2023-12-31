import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IoArrowBackOutline } from 'react-icons/io5'
// import { FaBicycle, FaWalking, FaShippingFast, FaSkiing } from 'react-icons/fa'
import utyLogo from '../assets/logo-uty.png'
import ModalSign from '../components/ModalSign'
import ModalConnect from '../pages/ModalConnect'
import { Rings } from 'react-loader-spinner'

export default function DriverSignUp() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const [store, setStore] = useState()
  const [transport, setTransport] = useState()
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }
  const [values, setValues] = useState({
    transport,
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleValidation = () => {
    const { password, confirmPassword, phone } = values
    if (password !== confirmPassword) {
      toast.error('Password and confirm password should be same.', toastOptions)
      setIsLoad(false)
      return false
    } else if (phone.length < 3) {
      toast.error('Username should be greater than 3 characters.', toastOptions)
      setIsLoad(false)
      return false
    } else if (password.length < 8) {
      toast.error(
        'Password should be equal or greater than 8 characters.',
        toastOptions
      )
      return false
    }

    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoad(true)
    if (handleValidation()) {
      const { transport, lastName, firstName, phone, email, password } = values
      const { data } = await axios.post(
        'https://uty-ti30.onrender.com/api/deliver/register',
        {
          transport,
          lastName,
          firstName,
          phone,
          email,
          password,
        }
      )

      if (data.status === false) {
        toast.error(data.msg, toastOptions)
        setIsLoad(false)
      }
      if (data.status === true) {
        setIsLoad(false)
        setStore(data.user.username)
        localStorage.setItem('currentDeliver', JSON.stringify(data.deliver))
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
            <div className="form__header">
              <IoArrowBackOutline onClick={() => navigate('/')} />
              <img src={utyLogo} alt="" />
              <h3>
                Devenez un livreur sur <span className="uty__name">uty</span>
              </h3>
              <h4>
                Ou <span onClick={() => setIsOpen(true)}>connectez-vous</span>
                si vous avez dejà un compte
              </h4>
            </div>
            <hr />
            <div className="form__body">
              <div className="field">
                <div className="name__field">
                  <label htmlFor="">Mode de livraison preferé</label>
                  <select
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                  >
                    <option value="A pied">A pied</option>
                    <option value="En moto">En moto</option>
                    <option value="En voiture">En voiture</option>
                    <option value="All mode">All mode</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <div className="name__field">
                  <label htmlFor="">Nom de famille</label>
                  <input
                    type="text"
                    placeholder="Bosuku"
                    name="lastName"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="name__field">
                  <label htmlFor="">Prénom</label>
                  <input
                    type="text"
                    placeholder="Eugène"
                    name="firstName"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form__field">
                <label htmlFor="">Adresse mail</label>
                <input
                  type="email"
                  placeholder="default@example.com"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form__field">
                <label htmlFor="">Numéro de téléphone</label>
                <input
                  type="text"
                  placeholder="0998899000"
                  name="phone"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="field">
                <div className="name__field">
                  <label htmlFor="">Mot de passe</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="name__field">
                  <label htmlFor="">Confirmer mot de passe</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
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
                  <>Soumettre</>
                )}
              </button>
            </div>
          </form>
        </div>
      </FormContainer>
      {open && <ModalSign username={store} path="/Shipments" />}
      {isOpen && <ModalConnect setIsOpen={setIsOpen} />}
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  .register__page {
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
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: white;
      padding: 0.5vh 5vw;
      text-align: center;
      .form__header {
        display: flex;
        flex-direction: column;
        svg {
          font-size: 250%;
          margin-top: 1vh;
        }
        img {
          height: 12.5vh;
          width: 20vw;
          align-self: center;
          margin-top: 1vh;
          margin-bottom: 2.5vh;
        }
        h3 {
          font-size: 140%;
          margin-bottom: -1vh;
          margin-top: -1vh;
          color: #a6a2a2;
          .uty__name {
            color: orange;
            font-weight: bold;
          }
        }
        h4 {
          font-weight: medium;
          font-size: 105%;
          color: #a6a2a2;
          span {
            color: orange;
            margin-right: 1vw;
          }
        }
      }
      .form__body {
        display: flex;
        flex-direction: column;
        .form__field {
          display: flex;
          flex-direction: column;
          gap: 1.5vh 1vw;
          align-items: flex-start;
          margin-bottom: 2.5vh;
          label {
            margin-bottom: 1.5vh;
          }
        }
        .field {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2.5vh;
          /* margin-left: -4.5vw; */
          .name__field {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            label {
              text-align: start;
              margin-bottom: 3vh;
            }
            input {
              width: 34.5vw;
            }
            select {
              width: 90vw;
              height: 7.5vh;
              border-radius: 0.5rem;
              background-color: white;
              border-color: silver;
              margin-top: -1vh;
              padding-left: 2.5vw;
            }
          }
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
        /* margin-top: -1vh; */
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 2.5vh;
      }
    }
  }
  @media only screen and (max-width: 800px) {
  }
`
