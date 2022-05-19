import React, { useState, useEffect, useRef } from 'react'
import MapComponent from './PickDropMap';
import downloadIcon from "../icons/arrow-down.png"
import {Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import firebase from '../firebaseConfig';
import chat from '../icons/chat.png'
import awesomePrint from '../icons/awesome-print.png'
import downloadPdf from '../icons/download-pdf.png'
import zipilogo from '../icons/zipi-now-logo.png'
import filter from '../icons/bars.png'

export default function PickUpPage() {
    const [directions, setDirections] = useState();
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();
    const [isChatActive, setChatActive] = useState("false");

    // useEffect(() => {
    //     const user = firebase.auth().currentUser;
    //     if (user !== null) {
    //     setUserEmail(user.email);
    //     const uid = user.uid;
    //     }else{
    //     // User is signed out
    //     navigate('/')
    //     }
    // }, [])

 const chatRoom = useRef();

 const displayChat =() =>{
    setChatActive(!isChatActive);
 }

  return (
    <div className='pickup'>
        <img src={zipilogo} className="zipinow-logo" alt="" />
        <div className='left-side'>
            <div>
                <MapComponent
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAiS-wNj3d2m2LYryOSg4tG4NTei2TA5Os"
                    loadingElement={<div style={{ height: `220px`, }} />}
                    containerElement={<div style={{ height:'220px',}} />}
                    mapElement={<div style={{ height: `220px`, borderRadius:"15px"}} />}
                />
            </div>
            <div className='load-summary'>
                <div>
                    <h1>Load Summary</h1>
                    <i class="fa-solid fa-chevron-down"></i>
                    <p>12:20 11 May 2022</p>
                </div>
                <div className='booking-party'>
                    <div>
                        <h3>Booking Party</h3>
                        <p>Zipity Doo</p>
                        <p>Shaun Mendez</p>
                        <p>0813917127</p>
                        <p>shaun@zipitydoo.io</p>
                    </div>
                    <div>
                        <h3>Pick-up</h3>
                        <p>Land and Sea Shuipp</p>
                        <p>769 Cascadinia Ave, Randpark Ridge Roodepoort, 1734</p>
                    </div>
                    <div>
                        <h3>Drop-off</h3>
                        <p>Land and Sea Shuipp</p>
                        <p>769 Cascadinia Ave, Randpark Ridge Roodepoort, 1734</p>
                    </div>
                </div>
                <div className='cargo-infomation'>
                    <div>
                        <h3>Cargo</h3>
                        <p>Manganese</p>
                        <p style={{marginBottom:"10px"}}>SKU: 001232MANG</p>
                        <h3>Packaging</h3>
                        <div className='packaging-block'>
                            <div>
                                <p>Package Type:</p>
                                <p>Dimensions:</p>
                                <p>Quantity:</p>
                                <p>Total Weight:</p>
                            </div>
                            <div>
                                <p>Box</p>
                                <p>120cm x 120cm x 100cm</p>
                                <p>30</p>
                                <p>32t</p>
                            </div>
                        </div>
                        <p style={{color:"red", marginBottom:"17px", marginTop:"10px"}}>This cargo is fragile, must be contained in temperatures between -20°C and 0°C and is hazardous.</p>
                        <a href="" className='download-btn'>Download SDS <div className='download-btn-btn'><img src={downloadIcon} alt="" /></div></a>
                    </div>
                    <div>
                        <h3>Vehicle</h3>
                        <p>Side Tipper</p>
                        <p>Mercedes Benz Actross</p>

                        <div className='packaging-block'>
                            <div>
                                <p>Net Weight:</p>
                                <p>Horse:</p>
                                <p>Trailer:</p>
                                <p>VIN:</p>
                            </div>
                            <div>
                                <p>34t</p>
                                <p>757JCYGP</p>
                                <p>HL76BDMP</p>
                                <p>123456789</p>
                            </div>
                        </div>
                        <h3>Transit</h3>
                        <p>In transit</p>
                        <div className='packaging-block'>
                            <div>
                                <p>Estimated Time of Arrival: </p>
                            </div>
                            <div>
                                <p>17:20 11 May 2022</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='print'>
                    <span className='the-print'>
                        <p><img src={awesomePrint} alt="" /> Print</p> <p><img src={downloadPdf} alt="" /> Download PDF</p>
                    </span> 
                    <span>
                        <div className='ava-name'>
                            <Avatar className='image-icon avatar-pickdrop'>{(userEmail.substring(0,2)).toUpperCase()}</Avatar> 
                            <p>Manqoba Mshunqisi</p>
                        </div>
                       <span><img src={chat} alt=""className='chat-icon' onClick={displayChat} /></span>
                       <div className={isChatActive ? "not-active-chat" : "active-chat"}>
                        <div>
                            <Avatar className='image-icon avatar-pickdrop'>{(userEmail.substring(0,2)).toUpperCase()}</Avatar><p>Manqoba Mshunqisi</p>
                            <p className='close-chat' onClick={() => setChatActive("true")}>X</p>
                        </div>
                       </div>

                    </span>
                </div>
            </div>
            
        </div>
        <div className='right-side'>
            <div>
                <h3>Overview</h3>
                <div className='inboud-btn'>
                    <button>Inbound</button>
                    <button>Outbound</button>
                </div>
                <div className='tracking-container'>
                    <h3>Tracking</h3>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <input className='search-input pick-search-input' type="text" placeholder='Advanced Search' />
                        <button className='filter-btn'><img src={filter} alt="" style={{height: "76%"}} /></button>
                    </div>
                    

                    <div className='profile-pickup'>
                        <div>
                            <div>
                                <Avatar className='image-icon'>{(userEmail.substring(0,2)).toUpperCase()}</Avatar>
                                <div>
                                    <h3>Glencore</h3>
                                    <p>Trip ID: FFJSLLH12</p>
                                    <p>757JCYGP</p>
                                </div>
                            </div>
                            <p className='side-tipper-title'>Side Tipper</p>
                        </div>
                        <progress 
                            value={30} 
                            max={100} 
                            className="pick-progress"
                        />
                        <p>5 hours</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}


