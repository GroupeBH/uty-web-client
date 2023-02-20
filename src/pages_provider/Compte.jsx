import React, { useState } from 'react'
import styled from 'styled-components'
import { IoNotifications } from 'react-icons/io5'
import utyLogo from '../assets/logo-uty.png'
import { useNavigate } from 'react-router-dom'
import MenuProvider from '../components/MenuProvider'
import Select from 'react-select'
import axios from 'axios'

function Compte() {
  let navigate = useNavigate()
  const [category, setCategory] = useState([])
  const data_user = JSON.parse(localStorage.getItem('currentUser'))
  const [username, setUsername] = useState(`${data_user.username}`)
  const [email, setEmail] = useState(`${data_user.email}`)

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

  console.log(data_user._id)

  const handleSelect = (data) => {
    setCategory(data)
    console.log(category[0].value)
  }
  const handleclick = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(
        `https://uty-ti30.onrender.com/api/provider/updateCount/${data_user._id}`,
        { username, email, category }
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
            onClick={() => navigate('/HomePage')}
          />
        </div>
        <IoNotifications className="notification__icon" />
        <MenuProvider />
      </div>
      <div className="form__update">
        <h2>Manage your account</h2>
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
          <input type="text" name="" id="" />
        </div>
        <div className="fields">
          <label htmlFor="">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="fields">
          <label htmlFor="">Catégorie</label>
          <Select
            options={optionList}
            value={category}
            onChange={handleSelect}
            className="select"
            isMulti
          />
          {console.log(category)}
        </div>
        <button onClick={(e) => handleclick(e)}>Update</button>
        <button className="cancel__button">Cancel</button>
      </div>
    </Container>
  )
}

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
    h2 {
      text-align: center;
      margin-bottom: -1vh;
      margin-top: -1vh;
    }
    .fields {
      display: flex;
      flex-direction: column;
      label {
        margin-top: 2vh;
      }
      input {
        height: 5vh;
        border-radius: 0.5rem;
        margin-top: 1.5vh;
      }
      .select {
        height: 7.5vh;
        margin-top: 1.5vh;
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
      background-color: #fb2f17;
      margin-top: -0.1vh;
    }
  }
`

export default Compte
