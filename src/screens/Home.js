import React, { useEffect } from 'react'
import MapComponent from '../component/Map';
import logo from '../icons/we-tracking-logo.png';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebaseConfig';

export default function Home() {
  const navigate = useNavigate();

  const signOut = () =>{
    firebase.auth().signOut().then(() => {
      // alert('successfully signed out')
    }).catch((error) => {
      alert(error);
    });
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        var uid = user.uid;
        // ...
      } else {
        // User is signed out
        navigate('/')
      }
    });
  }, [])
  

  return (
    <div className='home'>       
        <button className='signout-btn' onClick={signOut}>Sign Out<i className="fa-solid fa-arrow-right-from-bracket logout-arrow"></i></button>
        <img src={logo} style={{position:'absolute', top:'0', left:'33px', zIndex:'999', width:'7%', borderRadius: '0px 0px 10px 10px'}} alt="" />
       <MapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAiS-wNj3d2m2LYryOSg4tG4NTei2TA5Os"
          loadingElement={<div style={{ height: `100%`, }} />}
          containerElement={<div style={{ height:'100%', width:'72%', display:'flex', flexDirection:'column-reverse', borderRadius:"10px" }} />}
          mapElement={<div style={{ height: `100%`, borderRadius:"10px", border:'1px solid #cfcfcf' }} />}
      />
    </div>
  )
}
