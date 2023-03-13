import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { IoNotifications } from 'react-icons/io5'
import utyLogo from '../assets/logo-uty.png'
import { useNavigate } from 'react-router-dom'
import MenuProvider from '../components/MenuProvider'
import Select from 'react-select'
import axios from 'axios'
import blank_profile from '../assets/blank-profile.png'

function Compte() {
  let navigate = useNavigate()
  const [category, setCategory] = useState([])
  const data_user = JSON.parse(localStorage.getItem('currentUser'))
  const [photo, setPhoto] = useState()
  const [picUrl, setPicUrl] = useState()
  const [url, setUrl] = useState()
  const [username, setUsername] = useState(`${data_user.username}`)
  const [email, setEmail] = useState(`${data_user.email}`)
  const [phone, setPhone] = useState()
  const [provider, setProvider] = useState(false)
  const [select, setSelect] = useState(false)
  const [selectTwo, setSelectTwo] = useState(false)

  const optionList = [
    { value: 'Décoration', label: 'Décoration' },
    { value: 'Mobilier', label: 'Mobilier' },
    { value: 'Quincaillerie', label: 'Quincaillerie' },
    { value: 'Mode', label: 'Mode' },
    { value: 'Cosmétique', label: 'Cosmétique' },
    { value: 'Alimentaire', label: 'Alimentaire' },
    { value: 'Electronique', label: 'Electronique' },
    { value: 'Automobile', label: 'Automobile' },
    { value: 'Transport', label: 'Transport' },
    { value: 'Logistique', label: 'Logistique' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Santé', label: 'Santé' },
    { value: 'Education', label: 'Education' },
    { value: 'Sport', label: 'Sport' },
    { value: 'Hotellerie & restauration', label: 'Hotellerie & restauration' },
    { value: 'Tourisme', label: 'Tourisme' },
    { value: 'Télévision', label: 'Télévision' },
    { value: 'Télécom', label: 'Télécom' },
    { value: 'Internet', label: 'Internet' },
    { value: 'Services publics', label: 'Services publics' },
    { value: 'Voyage', label: 'Voyage' },
    { value: 'Communication', label: 'Communication' },
    { value: 'Imprimerie', label: 'Imprimerie' },
    { value: 'Presse', label: 'Presse' },
  ]
  const cloudName = 'disyacex9'
  console.log(data_user._id)

  useEffect(() => {
    if (photo) {
      setPicUrl(URL.createObjectURL(photo))
    }
  }, [photo])

  const uploadImage = async () => {
    const picData = new FormData()
    picData.append('file', photo)
    picData.append('upload_preset', 'utyweb')
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        picData
      )
      setUrl(response.data.secure_url)
      console.log(url)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChecked = (e) => {
    if (e.target.checked) {
      if (e.target.name == 'fournisseur') {
        setProvider(!provider)
        setSelect(!select)
      }

      if (e.target.name == 'livreur') {
        setSelectTwo(!selectTwo)
      }
    } else setProvider(false)
  }

  const handleSelect = (data) => {
    setCategory(data)
    console.log(category[0].value)
  }
  const handleclick = async (e) => {
    e.preventDefault()
    try {
      console.log(photo)
      await uploadImage()
      const response = await axios.patch(
        `https://uty-ti30.onrender.com/api/provider/updateCount/${data_user._id}`,
        { username, email, phone, url, select, selectTwo, category }
      )
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <div className="navbar">
        <div className="page__title" onClick={() => navigate('/HomePage')}>
          <img
            src={utyLogo}
            alt=""
            className="uty__logo"
            onClick={() => navigate('/')}
          />
        </div>
        <IoNotifications className="notification__icon" />
        <MenuProvider />
      </div>
      <div className="form__update">
        <h2>Manage your account</h2>
        <div className="image__container">
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="file"
          />
          {photo ? (
            <img src={picUrl} alt="profile picture" height="100" />
          ) : (
            <img src={blank_profile} alt="" />
          )}
        </div>
        <div className="fields">
          <label htmlFor="">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="fields">
          <label htmlFor="">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="fields">
          <label htmlFor="">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="checkbox__container">
          <input
            type="radio"
            name="fournisseur"
            checked={select}
            onClick={(e) => handleChecked(e)}
          />
          <p>Dévenir marchand</p>
        </div>
        {provider && (
          <div className="fields__category">
            <label htmlFor="">Catégorie</label>
            <Select
              options={optionList}
              value={category}
              onChange={handleSelect}
              className="select"
              isMulti
            />
          </div>
        )}
        <div className="checkbox__container1">
          <input
            type="radio"
            name="livreur"
            checked={selectTwo}
            onClick={(e) => handleChecked(e)}
          />
          <p>Dévenir livreur</p>
        </div>
        <button onClick={(e) => handleclick(e)}>Update</button>
        <button className="cancel__button">Cancel</button>
      </div>
    </Container>
  )
}

// const RadioLabel = styled.label`
//   width: 10vw;
//   height: 10vh;
//   border-radius: 50%;
//   background: white;
//   border: 1px solid black;
// `
// const item = styled.div`
//   display: flex;
// `
// const RadioButton = styled.input`
//   opacity: 0;
//   z-index: 1;
//   cursor: pointer;
//   width: 10vw;
//   height: 10vh;
//   &:hover ~ ${RadioLabel} {
//     background: silver;
//   }
//   &:checked + ${item} {
//     background-color: green;
//     border: 2px solid green;
//   }
// `
const Container = styled.div`
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: -5vw;
    margin-left: -5vw;
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
      display: flex;
      justify-content: center;
      padding-top: 1vh;
      .uty__logo {
        height: 8vh;
        width: 12.5vw;
      }
    }
    .notification__icon {
      font-size: 260%;
    }
    .menu__icon {
      align-self: center;
      font-size: 260%;
      margin-right: 1vh;
    }
  }
  .form__update {
    display: flex;
    flex-direction: column;
    padding-left: 5vw;
    padding-right: 5vw;
    gap: 2vh;
    .image__container {
      display: flex;
      justify-content: center;
      position: relative;
      .file {
        opacity: 0;
        position: absolute;
        align-self: center;
      }
      img {
        height: 17.5vh;
        cursor: pointer;
      }
    }
    h2 {
      text-align: center;
      margin-bottom: -1vh;
      margin-top: -1vh;
    }
    .checkbox__container {
      display: flex;
      border-color: 1px solid black;
      align-items: center;
      p {
        margin-left: 1.5vw;
        font-size: 135%;
      }
      input[type='radio'] {
        -webkit-appearance: none;
        appearance: none;
        color: slategray;
        font: inherit;
        border: 0.02em solid slategray;
        width: 5.5vw;
        height: 3vh;
        cursor: pointer;
        border-radius: 50%;
        display: grid;
        place-content: center;
      }
      input[type='radio']::before {
        content: '';
        width: 5.5vw;
        height: 3vh;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
      }
      input[type='radio']:checked::before {
        transform: scale(1);
        background-color: #020664;
      }
    }
    .checkbox__container1 {
      display: flex;
      border-color: 1px solid black;
      align-items: center;
      margin-top: -3.5vh;
      p {
        margin-left: 1.5vw;
        font-size: 135%;
      }
      input[type='radio'] {
        -webkit-appearance: none;
        appearance: none;
        color: slategray;
        font: inherit;
        border: 0.02em solid slategray;
        width: 5.5vw;
        height: 3vh;
        cursor: pointer;
        border-radius: 50%;
        display: grid;
        place-content: center;
      }
      input[type='radio']::before {
        content: '';
        width: 5.5vw;
        height: 3vh;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
      }
      input[type='radio']:checked::before {
        transform: scale(1);
        background-color: orange;
      }
    }
    .fields {
      display: flex;
      flex-direction: column;
      label {
        margin-top: 2vh;
        margin-bottom: 1vh;
      }
      input {
        height: 5vh;
      }
    }
    .fields__category {
      margin-bottom: 2vh;
      margin-top: -1vh;
      label {
        margin-bottom: 5vh;
      }
      .select {
        margin-top: 1vh;
      }
    }
    button {
      height: 7.5vh;
      font-size: 150%;
      background-color: #020664;
      font-weight: bold;
      color: white;
      border: none;
      border-radius: 0.5rem;
      margin-top: 2.5vh;
    }
    .cancel__button {
      background-color: orange;
      margin-top: -0.1vh;
      margin-bottom: 5vh;
    }
  }
`

export default Compte
