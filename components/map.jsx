import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useState } from 'react';

const containerStyle = {
    width: '100%',
    height: '85%'
  };
  
  const center = {
    lat: -34.61368,
    lng: -68.3300279
  };

export const Map = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'decoded-bulwark-401001',
    googleMapsApiKey: "AIzaSyA3jiZzoETRA3Uo2voXi3hviZNjv-EWZT0"
  })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
      setMap(null)
    }, [])

  return (
    <>
      {
        isLoaded && (
          <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
        )
      }
    </>
  )
}
