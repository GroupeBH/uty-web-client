import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'

mapboxgl.accessToken =
  'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag'

function Map() {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-4.038333)
  const [lat, setLat] = useState(21.758664)
  const [zoom, setZoom] = useState(3)
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })
  })

  useEffect(() => {
    if (!map.current) return
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  return (
    <Container>
      <div ref={mapContainer} className="mapDiv"></div>
    </Container>
  )
}

const Container = styled.div`
  .mapDiv {
    height: 68.5vh;
  }
`

export default Map
