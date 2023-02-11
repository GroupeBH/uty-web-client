import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'

mapboxgl.accessToken =
  'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag'

function Map({ pickUpCoord, dropOffCoord }) {
  const mapContainer = useRef(null)
  const map = useRef(null)

  // const [zoom, setZoom] = useState(3)

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
    console.log(marker1)
  }

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-4.038333, 21.758664],
      zoom: 3,
    })

    // map.current.on('move', () => {
    //   setLng(map.current.getCenter().lng.toFixed(4))
    //   setLat(map.current.getCenter().lat.toFixed(4))
    //   setZoom(map.current.getZoom().toFixed(2))
    // })

    if (pickUpCoord) {
      addToMap(map, pickUpCoord)
    }

    if (dropOffCoord) {
      addToMap(map, dropOffCoord)
    }
  })

  // useEffect(() => {
  //   map.current.on('move', () => {
  //     setLng(map.current.getCenter().lng.toFixed(4))
  //     setLat(map.current.getCenter().lat.toFixed(4))
  //     setZoom(map.current.getZoom().toFixed(2))
  //   })
  // })

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
