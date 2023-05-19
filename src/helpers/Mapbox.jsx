import axios from 'axios'

const optimizedTrip = async (pickUpCoord, dropOffCoord) => {
  const response = await axios.get(
    `https://api.mapbox.com/optimized-trips/v1/mapbox/driving-traffic/${pickUpCoord[0]},${pickUpCoord[1]};${dropOffCoord[0]},${dropOffCoord[1]}?` +
      new URLSearchParams({
        access_token:
          'pk.eyJ1IjoidXR5LXdlYiIsImEiOiJjbGRtM3EzNTIwNW1yM3FxbDExYml2N244In0.87AOy9jkubot05KERkgQag',
      })
  )

  return response.data.distance
}

export default optimizedTrip
