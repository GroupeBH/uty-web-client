import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import styled from 'styled-components'
import axios from 'axios'

mapboxgl.accessToken =
  'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag'

function Map({ pickUpCoord, dropOffCoord }) {
  // const coords = [pickUpCoord, dropOffCoord]
  const [distance, setDistance] = useState()
  const mapContainer = useRef(null)

  const getDirection = async () => {
    await axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpCoord[0]},${pickUpCoord[1]};${dropOffCoord[0]},${dropOffCoord[1]}?` +
          new URLSearchParams({
            access_token:
              'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag',
          })
      )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        setDistance(data.routes[0].duration)
      })
  }
  getDirection()
  console.log(distance)

  const addMarkerToMap = (map, coordinates) => {
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-4.038333, 21.758664],
      zoom: 3,
    })

    getDirection()

    if (
      pickUpCoord &&
      dropOffCoord &&
      pickUpCoord.length &&
      dropOffCoord.length
    ) {
      addMarkerToMap(map, pickUpCoord)
      addMarkerToMap(map, dropOffCoord)
      map.on('load', () => {
        map.fitBounds([pickUpCoord, dropOffCoord], { padding: 60 })
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
        })
        map.addControl(directions, 'top-left')

        directions.setOrigin('Kintambo, kinshasa')
        directions.setDestination('Masanga-mbila, kinshasa')
        map.addLayer({
          id: 'trip',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [pickUpCoord, dropOffCoord],
              },
            },
          },
          paint: {
            'line-color': 'blue',
            'line-width': 2,
          },
        })
      })
    }
  }, [pickUpCoord, dropOffCoord])

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
