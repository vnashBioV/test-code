/*global google*/
import React, { useState, useEffect, useRef } from 'react'
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow,
    Polyline,
    DirectionsRenderer,
  } from 'react-google-maps';
  const styles = require('../GoogleMapStyles.json');
function PickDropMap() {

  const [directions, setDirections] = useState();

  // const waypnts = [
  //   {
  //     location: "Bulawayo, Zimbabwe",
  //     stopover: true
  //   },
  //   {
  //     location: "Harare, zimbabwe",
  //     stopover: true,
  //   },
  // ];

  useEffect(() => {
    
  }, [])
  

  var pOptions = {
    strokeColor: "#fbdf02",
    strokeOpacity: 0.9 ,
    strokeWeight: 5,
    zIndex: 99
  };

  var mDirectionsRendererOptions = {
    suppressMarkers: true,
    suppressInfoWindows: true,
    polylineOptions: pOptions
  };

  const DirectionsService = new google.maps.DirectionsService();
  DirectionsService.route({
    origin: new google.maps.LatLng(-18.355906, 26.502525 ),
    destination: new google.maps.LatLng(-19.831601, 34.836999 ),
    travelMode: google.maps.TravelMode.DRIVING,
  }, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      setDirections(result)
    } else {
      console.error(`error fetching directions ${result}`);
    }
  });

  return (
    <div>
        <GoogleMap
        defaultZoom={12}
        defaultCenter={{lat: -26.1185222, lng: 27.8895477 }}
        defaultOptions={{
        disableDefaultUI: true,
        scaleControl: true,
        scrollwheel: true,
        styles: styles,
        }}
        
        >

            <Marker
                position={{lat: -19.831601, lng: 34.836999 }}
                icon={{
                  url: '/wheel.png',
                  scaledSize:  new google.maps.Size(25,25)
                }} 
              />

            <Marker
                position={{lat: -18.355906, lng: 26.502525}}
                icon={{
                  url: '/rectangle.png',
                  scaledSize:  new google.maps.Size(15,15)
                }} 
              />

            <DirectionsRenderer 
              directions={directions} 
              options={mDirectionsRendererOptions}
              // panel={ document.getElementById('panel') }
            />

        </GoogleMap>
    </div>
  )
}
const MapComponent = withScriptjs(withGoogleMap(PickDropMap));
export default MapComponent
