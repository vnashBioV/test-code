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
import firebase from '../firebaseConfig';
import wheel from '../icons/wheel.png'
import rectangle from '../icons/rectangle.png';
import {v4 as uuid} from "uuid";
import userIcon from '../icons/user.png'
import {Avatar} from '@mui/material';
import styled from 'styled-components';
import routeIcon from "../icons/route.png"
// import market from '../icons/market.png'

import Modal from 'react-modal';

const styles = require('../GoogleMapStyles.json');

const Map = React.memo(() => {
  const [query, setQuery] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverInformation, setDriverInformation] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [directions, setDirections] = useState();
  const [value, setValue] = useState([]);
  const [lastDestination, setLastDestination] = useState([]);
  const [originToDes, setOriginToDes] = useState("")
  const [timeOfArrival, setTimeOfArrival] = useState(0);
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [inputRoute, setInputRoute] = useState("");
  const [defaultLocation, setDefaultLocation] = useState([
    {lat: -18.355906, lng: 26.502525}
  ]);
  const [lastcoord, setLastcoord] = useState([]);
  const [lastco, setLastco] = useState([]);
  // const [distanceMatrix, setDistanceMatrix] = useState();
  // const [result, setResult] = useState();
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");
  const [routeDistance, setRouteDistance] = useState();
  const pathCoordinates =[
    {lat: -18.355906, lng: 26.502525},
    {lat: -20.145742, lng: 28.587349},
    {lat: -17.826167, lng: 31.050537},
    {lat: -19.831601, lng: 34.836999}
  ];
  const keys = ["name","surname"];
  const driverCard = useRef();


  const waypnts = [
    {
      location: "Bulawayo, Zimbabwe",
      stopover: true
    },
    {
      location: "Harare, zimbabwe",
      stopover: true,
    },
  ];


const createRoute = ()=>{
  const newRoute = {
    location:inputRoute,
    stopover:true
  }
  waypnts.push(newRoute);
  console.log(waypnts)
}

//The add routes modal
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '40%'
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement('#root');

  function distanceCalc(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

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

  const btn = useRef();

  // const handleKeypress = e => {
  //   if (e.code === "Enter") {
  //     sortData()
  //   }
  // };

  useEffect(() => {
      const driversRef = firebase.database().ref("drivers");
      const routeRef = firebase.database().ref("route");

      driversRef.on("value", (snapshot) => {
        const drivers = snapshot.val();
        const driverListArray = [];
        for (let id in drivers){
          driverListArray.push({ id, ...drivers[id] });
        }
        setDriverList(driverListArray);
        console.log(driverListArray);
      })

      routeRef.once("value", (snapshot) => {
        const routes = snapshot.val();
        const lastrouteArray = [];
        for (let id in routes){
          lastrouteArray.push({ id, ...routes[id] });
        }
        setLastcoord(lastrouteArray);
        setLastco(lastrouteArray[0].zimToMoz[3]);
        setLastDestination(lastrouteArray[0].zimToMoz[0]);

        var distance = distanceCalc(lastrouteArray[0].zimToMoz[0].latitude, lastrouteArray[0].zimToMoz[0].longitude, lastrouteArray[0].zimToMoz[3].latitude, lastrouteArray[0].zimToMoz[3].longitude, 'K');
        setOriginToDes(Math.round(distance*1000)/1000)
      })
  }, [])
  
  console.log(pathCoordinates)
  console.log(lastco)

  var listPos = [{
    arriveeLat: -18.355906,
    arriveeLng: 26.502525,
    departLat: -19.831601,
    departLng: 34.836999
  },
  {
    arriveeLat: 48.8245306,
    arriveeLng: 2.40735,
    departLat: 48.799815,
    departLng: 2.257289
  },
];

  const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: new google.maps.LatLng(-18.355906, 26.502525 ),
      destination: new google.maps.LatLng(-19.831601, 34.836999 ),
      waypoints: waypnts,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result)
      } else {
        console.error(`error fetching directions ${result}`);
      }
  });

  return (
    <>
        {/* ============================START MODAL==========================================================*/}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)} className='modal-head'>Add new route</h2>
          <button onClick={closeModal} className="modal-button"><i class="fa-solid fa-xmark"></i></button>
          {/* <div>I am a modal</div> */}
          <form className='modal-form'>
              <input type="text" placeholder='Type address' onChange={e => setInputRoute(e.target.value)} />
              <button className='submit-route' onclick={createRoute}>Add route</button>
          </form>
        </Modal>
        {/* =========================END MODAL================================================================*/}

        <div className='search-section'>
          <button className='add-routes' onClick={openModal}>Add new route</button>
        </div>
        
        <div className='drivers-section'>
        <input className='search-input' type="text" placeholder='Search Driver' onChange={e => setQuery(e.target.value)} />
          <h2 className='heading-text'>Drivers</h2>
            {driverList  ? 
              driverList.filter((driver) =>
               keys.some((key) => driver[key].toLowerCase().includes(query))
               ).map((driver, index) => {
                const driverLocation = driver.current_location;
                var distance = distanceCalc(driverLocation.latitude, driverLocation.longitude, lastco.latitude, lastco.longitude, 'K');
                // console.log(distance);
                var distanceRounded = (Math.round(distance*1000)/1000); 
                var timetravelled =  Math.round(distanceRounded/60)
                // setTimeOfArrival(timetravelled)
                var progressLine = 100 - timetravelled 
                var alertTime = timetravelled
                console.log(timetravelled)

                const driverNumber = driver.phone
                 
              return(<><div className='driver-card' key={index} ref={driverCard}>
                <div>
                  <div style={{with:"25px", height:"25px", borderRadius:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    {/* <img src={userIcon} alt="" className='image-icon'/> */}
                    <Avatar className='image-icon'>{(driver.name.substring(0,2)).toUpperCase()}</Avatar>
                  </div>
                  <div>
                    <h2>{driver.name}</h2>
                    <a onclick="location.href=this.href+'?key='tell:+driverNumber;return false;" className='phonetag'><i class="fa-solid fa-phone"></i>{driverNumber}</a>
                    <p>
                      {timetravelled} hours away</p>
                  </div>
                </div>
                <div>
                  <div className='progress'>
                    <progress 
                      value={progressLine} 
                      max={100} 
                      className="progress-bars"
                    />
                  {/* <Modal/> */}
                  {/* <div>
                    hello
                  </div> */}
                  </div>
                  
                </div>
              </div>
              
              </>
              ) })
              : "No drivers are available please wait till drivers register"
            }
        </div>
          <GoogleMap
            defaultZoom={5}
            defaultCenter={{defaultLocation}}
            defaultOptions={{
              disableDefaultUI: true,
              scaleControl: true,
              scrollwheel: true,
              styles: styles,
            }}
            
          >
              {driverList.map((driverone) => ( 
                <Marker 
                  key={driverone.id} 
                  position={{
                    lat: driverone.current_location.latitude, 
                    lng: driverone.current_location.longitude
                  }}

                  onClick={() => {
                    setSelectedDriver(driverone);
                  }}

                  icon={{
                    url: '/wheel.png',
                  }}
                />
              ))} 

               {/* {driverList.map((driverone) => ( 
                <Marker
                  key={driverone.id}
                  position={{lat: driverone.current_location.latitude, lng: driverone.current_location.longitude}}

                  onClick={() => {
                    setSelectedDriver(driverList);
                  }}
                  
                  icon={{
                    url: '/wheel.png',
                    // scaledSize:  new google.maps.Size(15,15)
                  }} 
                />
              ))}  */}


            {/* {markers.map(({ id, name, position, icon }) => ( */}
              <Marker
                // key={id}
                position={{lat: -19.831601, lng: 34.836999 }}
                // onClick={() => handleActiveMarker(id)}

                icon={{
                  url: '/finish-flag.png',
                  scaledSize:  new google.maps.Size(25,25)
                }} 
              />
            {/* ))} */}

            <Marker
                // key={id}
                position={{lat: -18.355906, lng: 26.502525}}
                // onClick={() => handleActiveMarker(id)}

                icon={{
                  url: '/dot-inside-a-circle.png',
                  scaledSize:  new google.maps.Size(15,15)
                }} 
              />

            {selectedDriver && (
              <InfoWindow
                position={{
                  lat: selectedDriver.current_location.latitude,
                  lng: selectedDriver.current_location.longitude,
                }}
                onCloseClick={() => {
                  setSelectedDriver(null);
                }}
              >
                <div className='info-panel'>
                  <div className='info-container'>
                    {/* <img src={userIcon} alt="" className='image-icon'/> */}
                    <Avatar className='image-icon'>{(selectedDriver.name.substring(0,2)).toUpperCase()}</Avatar>
                    <div>
                      <h2>{selectedDriver.name}</h2>
                      {/* <p>{timeOfArrival} hours away</p> */}
                    </div>
                  </div>
                  <span><i class="fa-solid fa-circle-check"></i> <p>On course</p></span>
                  <span><i class="fa-solid fa-phone"></i> <p>{selectedDriver.phone}</p></span>
                </div>
              </InfoWindow>
            )}  

            {/* <Polyline
              path={pathCoordinates}
              geodesic={true}
              options={{
                  strokeColor: "#fbdf02",
                  strokeOpacity: 0.8,
                  strokeWeight: 7,
                  icons: [
                      {
                          icon: '/wheel.png',
                          offset: "0",
                          repeat: "20px"
                      }
                  ]
              }}
            /> */}

            <DirectionsRenderer 
              directions={directions} 
              options={mDirectionsRendererOptions}
              // panel={ document.getElementById('panel') }
            />

          </GoogleMap>
    </>
  )
});


const MapComponent = withScriptjs(withGoogleMap(Map));
export default MapComponent
