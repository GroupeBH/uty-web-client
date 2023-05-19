import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
// import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import styled from 'styled-components'
import axios from 'axios'
import { useStore } from '../utils/Store'
import polyline from '@mapbox/polyline'

// /* eslint import/no-webpack-loader-syntax: off */

// mapboxgl.workerClass =
//   require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default
// mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken =
  'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag'

function Map({ pickUpCoord, dropOffCoord, coords, updtatePrice }) {
  const mapContainer = useRef(null)
  const prix = useStore((state) => state.prix)
  const geometrie = useStore((state) => state.geometrie)
  const updateGeometrie = useStore((state) => state.updateGeometrie)
  const addMarkerToMap = (map, coordinates) => {
    new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
  }

  useEffect(() => {
    const getMatrix = async () => {
      const response = await axios.get(
        `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${pickUpCoord[0]},${pickUpCoord[1]};${dropOffCoord[0]},${dropOffCoord[1]}?` +
          new URLSearchParams({
            access_token:
              'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag',
          })
      )
      console.log(response)
      updateGeometrie(response.data.trips[0].geometry)
      updtatePrice(prix, response.data.trips[0].distance)
      console.log(geometrie)
    }
    getMatrix()
  })

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-4.038333, 21.758664],
      zoom: 3,
    })

    console.log(geometrie)

    var myGeoJSON = polyline.toGeoJSON(geometrie)
    if (coords.length > 0) {
      map.on('load', () => {
        map.resize()
        map.flyTo({
          center: [coords[1], coords[0]],
          essential: true,
          zoom: 17,
        })
        addMarkerToMap(map, [coords[1], coords[0]])
      })
    }
    if (
      pickUpCoord &&
      dropOffCoord &&
      pickUpCoord.length &&
      dropOffCoord.length
    ) {
      map.on('load', () => {
        map.resize()
        map.fitBounds([pickUpCoord, dropOffCoord], { padding: 60 })
        addMarkerToMap(map, pickUpCoord)
        addMarkerToMap(map, dropOffCoord)

        map.addSource('route', {
          type: 'geojson',
          data: myGeoJSON,
        })
        console.log(myGeoJSON)

        map.addLayer(
          {
            id: 'routeline-active',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': 'blue',
              'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                12,
                3,
                22,
                12,
              ],
            },
          },
          'waterway-label'
        )
      })
    }
  }, [pickUpCoord, dropOffCoord, geometrie])

  return (
    <Container>
      <div ref={mapContainer} className="mapDiv"></div>
    </Container>
  )
}

const Container = styled.div`
  .mapDiv {
    height: 68.5vh;
    width: 100%;
  }
`

export default Map
