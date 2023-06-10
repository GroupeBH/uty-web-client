import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IoArrowBackOutline } from 'react-icons/io5'
import utyLogo from '../assets/logo-uty.png'
import ModalSign from '../components/ModalSign'
import { Rings } from 'react-loader-spinner'
import Select from 'react-select'
import ProviderLogin from './ProviderLogin'

export default function ProviderSignUp() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const [store, setStore] = useState()
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }
  const [values, setValues] = useState({
    storeName: '',
    businessBrand: '',
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
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
      const {
        storeName,
        businessBrand,
        lastName,
        firstName,
        phone,
        email,
        password,
      } = values
      const { data } = await axios.post(
        'http://localhost:5200/api/provider/register',
        {
          storeName,
          businessBrand,
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
        setStore(data.provider.store)
        localStorage.setItem('currentProvider', JSON.stringify(data.provider))
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
              <IoArrowBackOutline onClick={() => navigate('/Home')} />
              <img src={utyLogo} alt="" />
              <h3>
                Devenez un marchand sur <span className="uty__name">uty</span>
              </h3>
              <h4>
                Ou <span onClick={() => setIsOpen(true)}>connectez-vous</span>
                si vous avez un compte
              </h4>
            </div>
            <hr />
            <div className="form__body">
              <div className="form__field">
                <label>Nom de l enseigne(facultatif)</label>
                <input
                  type="text"
                  placeholder="store-name"
                  name="storeName"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form__field">
                <label>Nom de la marque</label>
                <input
                  type="text"
                  placeholder="sokin"
                  name="businessBrand"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="field">
                <div className="name__field">
                  <label htmlFor="">Types de business</label>
                  <Select
                  //   options={options}
                  //   value={category}
                  //   onChange={handleSelect}
                  //     className="select"
                  //     isMulti
                  />
                </div>
                <div className="name__field">
                  <label htmlFor="">Adresse mail</label>
                  <input
                    type="email"
                    placeholder="default@example.com"
                    name="email"
                    onChange={(e) => handleChange(e)}
                  />
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
      {open && <ModalSign username={store} path="/Dashboard" />}
      {isOpen && <ProviderLogin setIsOpen={setIsOpen} />}
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  @media only screen and (max-width: 800px) {
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
                margin-bottom: 3vh;
              }
              input {
                width: 34.5vw;
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
  }
`
