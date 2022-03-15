import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/header';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '620px'
  };
  
  const center = {
    lat: 0.3476,
    lng: 32.5825
  };

const theme = createTheme({
    overrides: {
        MuiCssBaseline: {
          "@global": {
            body: {
              height: "100%",
            }
          }
        }
      }
});

function Stations(props) {
const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDNJl9axR0PBhA_04eRNdzeS-1WLi-GAxg"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header page = "Stations"/>
            { isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    { /* Child components, such as markers, info windows, etc. */ }
                    <></>
                </GoogleMap>
            ) : <></>}
        </ThemeProvider>
        );
}

export default Stations;