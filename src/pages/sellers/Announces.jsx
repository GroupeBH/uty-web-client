import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Announcements from '../../components/announcement/Announcements'
import Nav from '../../components/Nav'

export default function Announces() {
  const params = useParams()

  return (
    <Container>
      <Nav />
      <Announcements params={params.id} />
    </Container>
  )
}

const Container = styled.div``
