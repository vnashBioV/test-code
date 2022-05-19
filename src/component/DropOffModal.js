import React, { useEffect, useState, useRef } from 'react'
import {Avatar} from '@mui/material';

export default function DropOffModal({closeModal}) {

    const [bookingTwo, setBookingTwo] = useState(
        {
            "doDetails": {

            }
        }
    )
    const [bookingArrayTwo, setBookingArrayTwo] = useState([]);

     //save booking contact to local
     const saveTolocal = () =>{
        if(bookingTwo){
            const newBooking = {id: new Date().getTime().toString(), bookingTwo: bookingTwo}
            setBookingArrayTwo([...bookingArrayTwo, newBooking])
            localStorage.setItem("localBookingTwo", JSON.stringify([...bookingArrayTwo, newBooking]))
            console.log(bookingArrayTwo)
            setBookingTwo( {
                "doDetails": {
    
                }
            })
            closeModal();
        }
    }

    // const handleDelete = (bookingTwo) =>{
    //     const deleted = bookingArrayTwo.filter((b) => b.id !== bookingTwo.id);
    //     setBookingArrayTwo(deleted)
    //     localStorage.setItem("localBookingTwo", JSON.stringify(deleted));
    // }

    useEffect(() => {
        if(localStorage.getItem("localBookingTwo")){
            const storedListTwo = JSON.parse(localStorage.getItem("localBookingTwo"))
            setBookingTwo(storedListTwo);
        }
    }, [])

console.log(bookingTwo)
  return (
    <div className='modal-two-background'>

            <div className='inner-modal'>
                <div>
                    <h1>New address</h1>
                    <p>Add a new contact by adding their information</p>
                    <span className='address-btn'>
                        <button className='add-btn'>Business</button>
                        <button className='add-btn'>Residential</button>
                        <i class="fa-solid fa-star-of-life" style={{color:"red", fontSize:"7px"}}></i>
                    </span>
                    <form action="" className='business-form form'>
                        <input 
                            type="text"
                            className='text-inputs' 
                            placeholder='Company' 
                            onChange={e =>setBookingTwo((prevState) => ({
                                    ...prevState,
                                    doDetails:{
                                        ...prevState.doDetails,
                                        doCompanyName:e.target.value
                                    } 
                                }))
                            }
                        />
                        <input 
                            type="text" 
                            className='text-inputs' 
                            placeholder='Physical Address'
                            onChange={e =>setBookingTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doAddress:e.target.value
                                } 
                            }))
                        }
                        />
                        <input 
                            type="text" 
                            className='text-inputs' 
                            placeholder='Complex/Building'
                            onChange={e =>setBookingTwo((prevState) => ({
                                    ...prevState,
                                    doDetails:{
                                        ...prevState.doDetails,
                                        doComplexNumber:e.target.value
                                    } 
                                }))
                            }
                        />
                        <p style={{fontSize:"11px", margin:"0px", padding:"0",color:"#878787", marginLeft:"10px"}}>Building or complex name, floor or unit number</p>
                        <textarea
                            cols="30" 
                            rows="5" 
                            className='textarea' 
                            placeholder='Special instructions for driver'
                            onChange={e =>setBookingTwo((prevState) => ({
                                    ...prevState,
                                    doDetails:{
                                        ...prevState.doDetails,
                                        doDriverInstructions:e.target.value
                                    } 
                                }))
                            }
                        >
                        </textarea>
                        <hr className='contact-line'/>
                        <input 
                            type="email"
                            className='text-inputs' 
                            placeholder='Email'
                            onChange={e =>setBookingTwo((prevState) => ({
                                    ...prevState,
                                    doDetails:{
                                        ...prevState.doDetails,
                                        doEmail:e.target.value
                                    } 
                                }))
                            }
                        />

                        <span className='address-input'>
                            <input 
                                type="text"
                                className='text-inputs-sides'   
                                placeholder='Name'
                                onChange={e =>setBookingTwo((prevState) => ({
                                        ...prevState,
                                        doDetails:{
                                            ...prevState.doDetails,
                                            doName:e.target.value
                                        } 
                                    }))
                                }
                            />
                            <input 
                                type="text"
                                className='text-inputs-sides' 
                                placeholder='Surname'
                                onChange={e =>setBookingTwo((prevState) => ({
                                        ...prevState,
                                        doDetails:{
                                            ...prevState.doDetails,
                                            doSurname:e.target.value
                                        } 
                                    }))
                                }
                            />
                        </span>

                    <span className='address-input' style={{marginTop:"0px"}}>
                        <input 
                            type="text"
                            className='text-inputs-sides' 
                            placeholder='Phone'
                            onChange={e =>setBookingTwo((prevState) => ({
                                    ...prevState,
                                    doDetails:{
                                        ...prevState.doDetails,
                                        doPhone:e.target.value
                                    } 
                                }))
                            }
                        />
                        <input 
                            type="text"
                            className='text-inputs-sides' 
                            placeholder='Telephone'
                            onChange={e =>setBookingTwo((prevState) => ({
                                    ...prevState,
                                    doDetails:{
                                        ...prevState.doDetails,
                                        doTelephone:e.target.value
                                    } 
                                }))
                            }
                        />
                    </span>
                        
                    <select 
                        className='select-option'
                        onChange={e =>setBookingTwo((prevState) => ({
                                ...prevState,
                                doDetails:{
                                    ...prevState.doDetails,
                                    doNotificationType:e.target.value
                                } 
                            }))
                        }
                    >
                        <option value="sms">Notification Type</option>
                        <option value="sms">SMS</option>
                        <option value="email">Email</option>
                        <option value="both">Both</option>
                    </select>
                    </form>
                    <span className='address-input' style={{display:"flex", justifyContent:"end"}}>
                        <button className='add-contact-btn' onClick={saveTolocal}>Add to contacts</button>
                    </span>
                </div>
                <div>
                    <span>
                        <h1>Contacts</h1>
                        <button className='close-modal-second' onClick={() => closeModal(false)}>x</button>
                    </span>
                    {!bookingTwo.length < 1  ? bookingTwo.map((booking) =>(
                        <React.Fragment key={bookingTwo.id}>
                            <div className='contact-wrapper'>
                                <Avatar className='Enterprise-icon'>{booking.bookingTwo.doDetails.doName.substring(0,2).toUpperCase()}</Avatar>
                                <div>
                                    <p>{booking.bookingTwo.doDetails.doName}</p>
                                    <p>{booking.bookingTwo.doDetails.doEmail}</p>
                                </div>
                            </div>
                        </React.Fragment>
                        ))
                    
                        : <div className='no-contacts'>
                            <p>
                                You currently don't have any contact for the 
                                new address. Fill in the contact details here.
                            </p>
                            <div>
                                <i class="fa-solid fa-arrow-trend-down"></i>
                            </div>
                        </div>
                        }
                </div>
            </div>
    </div>
  )
}
