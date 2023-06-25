import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Nav from '../components/Nav'
import commande from '../assets/Affaires concl.png'
import vendus from '../assets/Articles vendus.png'
import recettes from '../assets/Chiffre daffaire.png'
import map from '../assets/map.png'
import axios from 'axios'
import { useStore } from '../utils/Store'
import ModalCoords from '../components/ModalCoords'
import ProviderLogin from './ProviderLogin'
import DashCards from '../components/DashCards'
import { getTokenFromFirebase, onMessageListener } from '../firebase'

function Dashboard() {
  const currentProvider = JSON.parse(localStorage.getItem('currentProvider'))
  const [open, setOpen] = useState(false)
  const [connect, setConnect] = useState(false)
  const [isProvider, setIsProvider] = useState(false)
  const coords = useStore((state) => state.coords)
  const updateCoords = useStore((state) => state.updateCoords)

  const update = async (coords, user) => {
    await axios
      .patch(`https://uty-ti30.onrender.com/api/auth/updateCoords/${user}`, {
        coords: coords,
      })
      .then((response) => console.log(response))
  }

  useEffect(() => {
    if (!currentProvider) {
      setConnect(true)
    } else {
      updateCoords()
      update(coords, currentProvider.user._id)
      if (!currentProvider.user._id) {
        update(coords, currentProvider.user)
      }
      //👉🏻Logs the device token to the console
      getTokenFromFirebase(currentProvider._id)

      //👉🏻Listen and logs the push messages from the server.
      onMessageListener()
        .then((payload) => {
          console.log('From Message', payload)
        })
        .catch((err) => console.log('failed: ', err))

      setIsProvider(true)
    }
  })

  // useEffect(() => {
  //   if (currentProvider) {
  //     updateCoords()
  //     update(coords, currentProvider.user._id)
  //   }
  // }, [coords])

  return (
    <Container>
      <Nav isProvider={isProvider} />
      <div className="list__post">
        <h3 className="provider__accroche">
          Pénètre ton marché différement. Avec uty vend et fait livrer tes
          produits en toute tranquilité
          <hr />
        </h3>
        <DashCards
          imgSrc={vendus}
          title={'Commandes en attente'}
          path="/Order"
        />
        <DashCards
          imgSrc={commande}
          title={'Commandes en attente de livraison'}
          path="/Command"
        />
        <DashCards
          imgSrc={recettes}
          title={'Historique des ventes'}
          path="/Dashboard"
        />
        <DashCards
          imgSrc={map}
          title={'Commandes en livraison'}
          path="/Dashboard"
        />
      </div>
      {open && <ModalCoords setOpen={setOpen} />}
      {connect && <ProviderLogin setConnect={setConnect} />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    text-align: center;
    font-size: 125%;
  }
  .list__post {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 1vh 7.5vw;
    gap: 2.5vh 0.5vw;
  }
`

export default Dashboard
