import React, { useEffect, useState, useRef } from 'react'
import EnterpriseNav from '../component/EnterpriseNav'
import firebase from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../icons/search-icon.png';
import ellipse from '../icons/ellipse.png';
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import ReactModalthree from 'react-modal';
import { borderRadius, width } from '@mui/material/node_modules/@mui/system';
import Select from 'react-select';
import {Avatar} from '@mui/material';
import DropOffModal from '../component/DropOffModal';
import ToggleSwitch from '../component/ToggleSwitch';
import { v4 as uuidv4 } from 'uuid';
import cargo from "../icons/cargo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DateTimePicker from 'react-datetime-picker';

export default function Enterprise() {
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState();
    const name = userEmail.substring(0, 7);
    const iconName = userEmail.substring(0, 2);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpenTwo, setIsOpenTwo] = useState(false);
    const [modalIsOpenThree, setIsOpenThree] = useState(false);
    const [query, setQuery] = useState("");
    const [queryTwo, setQueryTwo] = useState("");
    const [queryThree, setQueryThree] = useState("");

    const keys = ["puName", "puCompanyName","puSurname"];
    const keysTwo = ["doName", "doCompanyName","doSurname"];

    let subtitle;
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedbooking, setSelectedBooking] = useState()
    const [selectedbookingTwo, setSelectedBookingTwo] = useState()
    const [selectedbookingThree, setSelectedBookingThree] = useState()
    const [value, onChange] = useState(new Date());

    // const year = value.getFullYear();
    // const month = value.getMonth();
    // const day = value.getDay();

    // const fullDate = (`${year}-${month}-${day}`)
    // console.log(fullDate)

    console.log(value)

    const email = "rambuda3@gmail.co.za"
    const dropofParagraph = useRef()
    const dropofSearch = useRef()
    const dropofContainer = useRef()
    const dropofIcon = useRef()

    const pickUpParagraph = useRef()
    const pickUpSearch = useRef()
    const pickUpContainer = useRef()
    const pickUpIcon = useRef();
    const setDefault = useRef();
    const setDefaultTwo = useRef();

    // Liam	    Olivia
	// Noah	    Emma
	// Oliver	    Charlotte
	// Elijah	    Amelia
	// James	    Ava
	// William	    Sophia
	// Benjamin	Isabella
	// Lucas	    Mia
	// Henry	    Evelyn
	// Theodore	Harper

//     Percepta (security)
// Exela Movers
// Ibotta, Inc. (consumer services)
// Wanderu (hospitality & tourism)
// Aceable, Inc. (online learning)
// Intrepid Travel
// Defendify (security)(Plus, how freaking fun is this word to say?)
// Twisters Gymnastics Academy
// Aims Community College
// Kaboom Fireworks
// Compass Mortgage
// Marathon Physical Therapy
// Semicolon Bookstore

    const [booking, setBooking] = useState(
        {
            "puDetails": {
            }
        }
    )

    const [bookingTwo, setBookingTwo] = useState(
        {
            "doDetails": {
            }
        }
    )

    const [bookingThree, setBookingThree] = useState(
        {
            "cargoInformation": {
            }
        }
    )

    const [newBookingTwo, setNewBookingTwo] = useState([]);
    // const [modalsecond, setModalSecond] = useState(false)
    const [bookingArray, setBookingArray] = useState([]);
    const [bookingArrayTwo, setBookingArrayTwo] = useState([]);
    const [bookingArrayThree, setBookingArrayThree] = useState([])
    const [bookingArrayFinal, setBookingArrayFinal] = useState([])
    const [bookingToDatabase, setbookingToDatabase] = useState([])
    const btnBusiness = useRef();
    const btnResident = useRef();
    const inputCompany = useRef();
    const inputCo = useRef();
    const [suggestions, setSuggestions] = useState([])
    const [suggestionsTwo, setSuggestionsTwo] = useState([])
    const [suggestionsThree, setSuggestionsThree] = useState([])
    
    const btnTypeClick = (e)=>{
        if(e.target.style.background === "#E8E8E8" ){
            e.target.style.background = "#fbdf02"
        }else{
           e.target.style.background = "#E8E8E8"
        }
    }


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '49%',
      borderRadius:'15px',
      padding:"20px 25px"
    },
  };

  const customCargoStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '31%',
      borderRadius:'15px',
      padding:"20px 25px"
    },
  };


  function openModal() {
    setIsOpen(true);
  }

  function openModalTwo() {
    setIsOpenTwo(true);
  }

  function openModalThree() {
    setIsOpenThree(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModalTwo() {
    setIsOpenTwo(false);
  }

  function closeModalThree() {
    setIsOpenThree(false);
  }

  Modal.setAppElement('#root');

    useEffect(() => {
        const user = firebase.auth().currentUser;
        if (user !== null) {
        setUserEmail(user.email);
        // setUserPhone(user.phoneNumber)
        const uid = user.uid;
        }
    }, [])

    //save booking contact to local
    const saveTolocal = () =>{
        if(booking){
            const newBooking = {id: new Date().getTime().toString(), booking: booking}
            setBookingArray([...bookingArray, newBooking])
            localStorage.setItem("localBooking", JSON.stringify([...bookingArray, newBooking]))
            console.log(bookingArray)
            setBooking( {
                "puDetails": {
    
                }
            })
            closeModal();
        }
    }
 

    const saveTolocalTwo = () =>{
        if(bookingTwo){
            const newBooking = {id: new Date().getTime().toString(), bookingTwo: bookingTwo}
            setBookingArrayTwo([...bookingArrayTwo, newBooking])
            localStorage.setItem("localBookingTwo", JSON.stringify([...bookingArrayTwo, newBooking]))
            console.log(bookingArrayTwo)
            setBookingTwo( {
                "doDetails": {
                }
            })
            closeModalTwo();
        }
    }

    const saveTolocalThree = () =>{
        if(bookingThree){
            const newBooking = {id: new Date().getTime().toString(), bookingThree: bookingThree}
            setBookingArrayThree([...bookingArrayThree, newBooking])
            localStorage.setItem("localBookingThree", JSON.stringify([...bookingArrayThree, newBooking]))
            console.log(bookingArrayThree)
            setBookingThree( {
                "cargoInformation": {
    
                }
            })
            closeModalThree();
        }
    }

    const handleDelete = (booking) =>{
        const deletedPick = bookingArray.filter((b) => b.id !== booking.id);
        setBookingArray(deletedPick)
        localStorage.setItem("localBooking", JSON.stringify(deletedPick));
        pickUpParagraph.current.style.display="block"
    }

    const handleDeleteTwo = (booking) =>{
        const deletedDrop = bookingArrayTwo.filter((b) => b.id !== booking.id);
        setBookingArrayTwo(deletedDrop)
        localStorage.setItem("localBookingTwo", JSON.stringify(deletedDrop));

    }

    const handleDeleteThree = (booking) =>{
        const deletedCargo = bookingArrayThree.filter((b) => b.id !== booking.id);
        setBookingArrayThree(deletedCargo)
        localStorage.setItem("localBookingTwo", JSON.stringify(deletedCargo));
    }

    // const showModalTwo = () =>{
    //     setModalSecond(true);
    // }

    // const activeContact = () =>{

    // }
    
    // const notify = () => toast("Wow so easy!");

    console.log(value)

    const saveToDatabase = (uid) =>{
        // if(bookingArrayFinal){
            const bookingOneData = selectedbooking[0].booking
            const bookingTwoData = selectedbookingTwo[0].bookingTwo
            const bookingThreeData = selectedbookingThree[0].bookingThree
            const bookingRef = firebase.database().ref("booking");
            bookingRef.push( {
                // available_pick_up_date: startDate,
                puDetails: bookingOneData.puDetails,
                doDetails: bookingTwoData.doDetails,
                cargoInformation: bookingThreeData.cargoInformation,
                email: userEmail,
                // phoneNumber: userPhone,
            } )
            toast("Booking successfully added");
        // }
    }

    const pickUpClick = (booking) =>{
        const pickSelected = bookingArray.filter((b) => booking.id == b.id );
        setSelectedBooking(pickSelected)
        setBookingArray(pickSelected)
        pickUpParagraph.current.style.display="none"
        pickUpSearch.current.style.display="none"
        pickUpIcon.current.style.color="color:#ffe201 !important"        
        setDefault.current.style.cssText="display:block;"
        toast("Pick up contact successfully added");
        
    }

    console.log(selectedbooking)

    const dropofclick = (booking) =>{
        const dropSelected = bookingArrayTwo.filter((b) => booking.id == b.id );
        setSelectedBookingTwo(dropSelected)
        setBookingArrayTwo(dropSelected)
        dropofParagraph.current.style.display="none"
        dropofSearch.current.style.display="none"
        dropofIcon.current.style.cssText="color:#ffe201 !important"
        setDefaultTwo.current.style.cssText="display:block;"
        toast("Drop off contact successfully added");
    }

    console.log(selectedbookingTwo)
    
    const selectCargoCheck = (cargo)=>{
        const CargSelected = bookingArrayThree.filter((b) => cargo.id == b.id );
        setSelectedBookingThree(CargSelected)
        setBookingArrayThree(CargSelected)
    }

    const onSearchChange = (query) =>{
        let matches = []
        if (query.length>0){
            matches = bookingArray.filter(booking =>{
                const regex = new RegExp(`${query}`, "gi");
                return booking.booking.puDetails.puName.match(regex);
            })
        }
        console.log('matches', matches)
        setSuggestions(matches)
        setQuery(query)
    }

    const onSearchChangeTwo = (queryTwo) =>{
        let matches = []
        if (queryTwo.length>0){
            matches = bookingArrayTwo.filter(booking =>{
                const regex = new RegExp(`${queryTwo}`, "gi");
                return booking.bookingTwo.doDetails.doName.match(regex);
            })
        }
        console.log('matches', matches)
        setSuggestions(matches)
        setQueryTwo(queryTwo)
    }

    const onSearchChangeThree = (queryThree) =>{
        let matches = []
        if (queryThree.length>0){
            matches = bookingArrayThree.filter(booking =>{
                const regex = new RegExp(`${queryThree}`, "gi");
                return booking.bookingThree.puDetails.Name.match(regex);
            })
        }
        console.log('matches', matches)
        setSuggestions(matches)
        setQueryTwo(queryThree)
    }

    const onSuggestHandler = (query) =>{
        setQuery(query)
        setSuggestions([])
    }

    const onSuggestHandlerTwo = (queryTwo) =>{
        setQueryTwo(queryTwo)
        setSuggestionsTwo([])
    }

    const onSuggestHandlerThree = (queryThree) =>{
        setQueryTwo(queryThree)
        setSuggestionsTwo([])
    }


    useEffect(() => {
      if(localStorage.getItem("localBooking")){
          const storedList = JSON.parse(localStorage.getItem("localBooking"))
          setBookingArray(storedList);
          setBookingArrayFinal(storedList)
      }
    }, [])

    useEffect(() => {
        if(localStorage.getItem("localBookingTwo")){
            const storedListTwo = JSON.parse(localStorage.getItem("localBookingTwo"))
            setBookingArrayTwo(storedListTwo);
            setBookingArrayFinal((prevState) => ({
                ...prevState,
                storedListTwo
            }))

        }
    }, [])

    useEffect(() => {
        if(localStorage.getItem("localBookingThree")){
            const storedListThree = JSON.parse(localStorage.getItem("localBookingThree"))
            setBookingArrayThree(storedListThree);
            setBookingArrayFinal((prevState) => ({
                ...prevState,
               storedListThree
            }))
            // console.log(storedListThree);
        }
    }, [])

    useEffect(() => {
        window.onbeforeunload = function() {
            dropofParagraph.current.style.display="block"
            dropofSearch.current.style.display="flex"
            pickUpParagraph.current.style.display="block"
            pickUpSearch.current.style.display="flex"
        };
    
        return () => {
            window.onbeforeunload = null;
        };
    }, []);

    
    console.log(bookingToDatabase)
    
  return (
    <div style={{background: "#F2F2F2"}}>
        <EnterpriseNav 
            name={name}
            iconName={iconName}
        />
        <div className='pick-up'>
            <h3>Pick-up</h3>
            <p ref={pickUpParagraph}>
                Choose a pick-up contact from the list below. This is a contact that you've 
                previously registered in your entry. Alternatively, you can opt to add a new 
                contact by clicking the "New contact" button.
            </p>
            <div className='search-container' ref={pickUpSearch}>
                <span className='search-wrapper'>
                    <input type="text" placeholder='Search' className='pick-search' onChange={e => onSearchChange(e.target.value)} value={query}  />
                    <img src={searchIcon} alt="" />
                </span> 
                <button><img src={ellipse} alt="" onClick={openModal}/></button>
            </div>
                <div className='suggestionBlock'>
                    {suggestions ? suggestions.map((suggestion)=>
                        <p key={suggestion.id} onClick={() => onSuggestHandler(suggestion.booking.puDetails.puName)}>{suggestion.booking.puDetails.puName}</p>
                    )
                    : <></>
                }
                </div>
            <div className='contact-cover' ref={pickUpContainer}>

                {!bookingArray.length < 1 ? bookingArray.filter((booking) =>
                    keys.some((key) => booking.booking.puDetails[key].includes(query))
                ).map((booking) =>(
                    <React.Fragment key={booking.id}>
                        <div className='contacts-block' onClick={() => pickUpClick(booking)}>
                            <i class="fa-solid fa-house-chimney" ref={pickUpIcon}></i>
                            <div>
                                <div> 
                                    <p>{booking.booking.puDetails.puName}</p>
                                    <p>{booking.booking.puDetails.puCompanyName}</p>
                                    <p>{booking.booking.puDetails.puAddress}</p>
                                </div>
                                <div className='delete-contact'>
                                    <i class="fa-solid fa-trash" onClick={() => handleDelete(booking)}></i> 
                                    <i class="fa-solid fa-pen"></i> 
                                    <span ref={setDefault} className='set-default'>Set as default</span>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    ))
                    : 
                    <div className='no-contact-added'>
                        <h1 className='add-contacts'>Currently there are no pick up contacts please click the plus button to add contacts</h1>
                    </div>
                }
            </div>
           

        {/* ============================START MODAL==========================================================*/}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
            <div className='add-contact'>
                <div>
                    <h1>New address</h1>
                    <p>Add a new contact by adding their information</p>
                    <span className='address-btn'>
                        <button className='add-btn btn-select' ref={btnBusiness} onClick={btnTypeClick}>Business</button>
                        <button className='add-btn btn-select' ref={btnResident} onClick={btnTypeClick}>Residential</button>
                        <i class="fa-solid fa-star-of-life" style={{color:"red", fontSize:"7px"}}></i>
                    </span>
                    <form className='business-form form'>
                        <input 
                            type="text"
                            className='text-inputs' 
                            placeholder='Company' 
                            onChange={e =>setBooking((prevState) => ({
                                    ...prevState,
                                    puDetails:{
                                        ...prevState.puDetails,
                                        puCompanyName:e.target.value
                                    } 
                                }))
                            }
                            ref={inputCompany}
                        />
                        <input 
                            type="text" 
                            className='text-inputs' 
                            placeholder='Physical Address'
                            onChange={e =>setBooking((prevState) => ({
                                    ...prevState,
                                    puDetails:{
                                        ...prevState.puDetails,
                                        puAddress:e.target.value
                                    } 
                                }))
                            }
                        />

                        <input 
                            type="text" 
                            className='text-inputs' 
                            placeholder='Town Name'
                            onChange={e =>setBooking((prevState) => ({
                                    ...prevState,
                                    puDetails:{
                                        ...prevState.puDetails,
                                        puTownName:e.target.value
                                    } 
                                }))
                            }
                        />

                        <input 
                            type="text" 
                            className='text-inputs' 
                            placeholder='Complex/Building'
                            onChange={e =>setBooking((prevState) => ({
                                    ...prevState,
                                    puDetails:{
                                        ...prevState.puDetails,
                                        puComplexNumber:e.target.value
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
                             onChange={e =>setBooking((prevState) => ({
                                    ...prevState,
                                    puDetails:{
                                        ...prevState.puDetails,
                                        puDriverInstructions:e.target.value
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
                            onChange={e =>setBooking((prevState) => ({
                                ...prevState,
                                puDetails:{
                                    ...prevState.puDetails,
                                    puEmail:e.target.value
                                } 
                            }))
                        }
                        />
                    </form>
                    <span className='address-input'>
                        <input 
                            type="text"
                            className='text-inputs-sides'   
                            placeholder='Name'
                            onChange={e =>setBooking((prevState) => ({
                                    ...prevState,
                                    puDetails:{
                                        ...prevState.puDetails,
                                        puName:e.target.value
                                    } 
                                }))
                            }
                        />
                        <input 
                            type="text"
                            className='text-inputs-sides' 
                            placeholder='Surname'
                            onChange={e =>setBooking((prevState) => ({
                                    ...prevState,
                                    puDetails:{
                                        ...prevState.puDetails,
                                        puSurname:e.target.value
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
                            onChange={e =>setBooking((prevState) => ({
                                    ...prevState,
                                    puDetails:{
                                        ...prevState.puDetails,
                                        puPhone:e.target.value
                                    } 
                                }))
                            }
                        />
                        <input 
                            type="text"
                            className='text-inputs-sides' 
                            placeholder='Telephone'
                            onChange={e =>setBooking((prevState) => ({
                                    ...prevState,
                                    puDetails:{
                                        ...prevState.puDetails,
                                        puTelephone:e.target.value
                                    } 
                                }))
                            }
                        />
                    </span>
                   
                    {/* <Select
                        value={selectedOption}
                         onChange={e =>setBooking((prevState) => ({
                                ...prevState,
                                puDetails:{
                                    ...prevState.puDetails,
                                    puTelephone:e.target.value
                                } 
                            }))
                        }
                        options={options}
                        placeholder="Notification Type"
                    /> */}
                    <select 
                        className='select-option'
                        onChange={e =>setBooking((prevState) => ({
                                ...prevState,
                                puDetails:{
                                    ...prevState.puDetails,
                                    puNotificationType:e.target.value
                                } 
                            }))
                        }
                    >
                        <option value="sms">Notification Type</option>
                        <option value="sms">SMS</option>
                        <option value="email">Email</option>
                        <option value="both">Both</option>
                    </select>
                    <span className='address-input' style={{display:"flex", justifyContent:"end"}}>
                        <button className='add-contact-btn' onClick={saveTolocal}>Add to contacts</button>
                    </span>
                </div>
                <div>
                    <h1>Contacts</h1>
                        {!bookingArray.length < 1  ? bookingArray.map((booking) =>(
                        <React.Fragment key={booking.id}>
                            <div className='contact-wrapper'>
                                <Avatar className='Enterprise-icon'>{booking.booking.puDetails.puName.substring(0,2).toUpperCase()}</Avatar>
                                <div>
                                    <p>{booking.booking.puDetails.puName}</p>
                                    <p>{booking.booking.puDetails.puEmail}</p>
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
        </Modal>
        {/* =========================END MODAL================================================================*/}
        </div>

        <div className='drop-off'>
            <h3>Drop-off</h3>
            <p ref={dropofParagraph}>Choose a drip-off contact from the list below. This is a contact that you've previously registered in your entry. Alternatively, you can opt to add a new contact by clicking the "New contact" button.</p>
            <div className='search-container' ref={dropofSearch}>
                <span className='search-wrapper'>
                    <input type="text" placeholder='Search' onChange={e => onSearchChangeTwo(e.target.value)} value={queryTwo} className='pick-search'/>
                    <img src={searchIcon} alt="" />
                </span> 
                <button><img src={ellipse} alt="" onClick={openModalTwo}/></button>
            </div>
            <div className='suggestionBlock'>
                {suggestionsTwo && suggestionsTwo.map((suggestionTwo,i)=>
                    <p key={suggestionTwo.id} onClick={() => onSuggestHandlerTwo(suggestionTwo.bookingTwo.doDetails.doName)}>{suggestionTwo.bookingTwo.doDetails.doName}</p>
                )}
            </div>
          {/* {modalsecond && <DropOffModal closeModal={setModalSecond}/>} */}
          <ReactModal
             isOpen={modalIsOpenTwo}
             onRequestClose={closeModalTwo}
             style={customStyles}
             contentLabel="Modal"
          >
            <div className='add-contact'>
                <div>
                    <h1>New address</h1>
                    <p>Add a new contact by adding their information</p>
                    <span className='address-btn'>
                        <button className='add-btn btn-select' ref={btnBusiness} onClick={btnTypeClick}>Business</button>
                        <button className='add-btn btn-select' ref={btnResident} onClick={btnTypeClick}>Residential</button>
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
                            ref={inputCompany}
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
                            placeholder='Town Name'
                            onChange={e =>setBookingTwo((prevState) => ({
                                    ...prevState,
                                    doDetails:{
                                        ...prevState.doDetails,
                                        doTownName:e.target.value
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
                    </form>
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
                   
                    {/* <Select
                        value={selectedOption}
                         onChange={e =>setBooking((prevState) => ({
                                ...prevState,
                                puDetails:{
                                    ...prevState.puDetails,
                                    puTelephone:e.target.value
                                } 
                            }))
                        }
                        options={options}
                        placeholder="Notification Type"
                    /> */}
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
                    <span className='address-input' style={{display:"flex", justifyContent:"end"}}>
                        <button className='add-contact-btn' onClick={saveTolocalTwo}>Add to contacts</button>
                    </span>
                </div>
                <div>
                    <h1>Contacts</h1>
                        {!bookingArrayTwo.length < 1  ? bookingArrayTwo.map((booking) =>(
                        <React.Fragment key={booking.id}>
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
          </ReactModal>


          {!bookingArrayTwo.length < 1 ? bookingArrayTwo.filter((booking) =>
                    keysTwo.some((key) => booking.bookingTwo.doDetails[key].includes(queryTwo))
                ).map((booking) =>(
            <React.Fragment key={booking.id}>
                <div className='contacts-block' style={{width:"unset"}} onClick={() => dropofclick(booking)}>
                    <i class="fa-solid fa-house-chimney" ref={dropofIcon}></i>
                    <div>
                        <div>
                            <p>{booking.bookingTwo.doDetails.doName}</p>
                            <p>{booking.bookingTwo.doDetails.doCompanyName}</p>
                            <p>{booking.bookingTwo.doDetails.doAddress}</p>
                        </div>
                        <div className='delete-contact'>
                            <i class="fa-solid fa-trash" onClick={() => handleDeleteTwo(booking)}></i>
                            <i class="fa-solid fa-pen"></i>   
                            <span ref={setDefaultTwo} className='set-default'>Set as default</span>
                        </div>
                    </div>
                </div>
                <ToastContainer hideProgressBar={true}
/>
            </React.Fragment>
            ))
            : 
            <div className='no-contact-added'>
                <h1 className='add-contacts'>Currently there are no drop off contacts please click the plus button to add contacts</h1>
            </div>
        }
        </div>
            <div className='cargo'>
                <h1>Cargo</h1>
                <p>Choose the cargo you would like to transport below.</p>

                <div className='search-container'>
                    <span className='search-wrapper'>
                        <input type="text" placeholder='Search' className='pick-search'/>
                        <img src={searchIcon} alt="" />
                    </span> 
                    <button><img src={ellipse} alt="" onClick={openModalThree}/></button>
                </div>
                <ReactModalthree
                    isOpen={modalIsOpenThree}
                    onRequestClose={closeModalThree}
                    style={customCargoStyles}
                    contentLabel="Modal"  
                >
                    <div className='inner-cargo'>
                        <h1>New Cargo</h1>
                        <p>Add a new package by adding its information</p>
                        <span className='address-input cargo-product' style={{marginTop:"15px"}}>
                            <input 
                                type="text"
                                className='text-inputs-sides' 
                                placeholder='Product Name'
                                onChange={e =>setBookingThree((prevState) => ({
                                        ...prevState,
                                        cargoInformation:{
                                            ...prevState.cargoInformation,
                                            productName:e.target.value
                                        } 
                                    }))
                                }
                            />
                        
                            <input 
                                type="text"
                                className='text-inputs-sides' 
                                placeholder='SKU/ Product Number'
                                onChange={e =>setBookingThree((prevState) => ({
                                        ...prevState,
                                        cargoInformation:{
                                            ...prevState.cargoInformation,
                                            productNumber:e.target.value
                                        } 
                                    }))
                                }
                            />
                    </span>
                    <hr className='contact-line cargo-seperator'/>
                    <p className='packaging-title'>Packaging</p>
                    <span className='address-input cargo-product' style={{marginTop:"0px"}}>
                            <select 

                                style={{width: "49%"}}
                                className='select-option'
                                onChange={e =>setBookingThree((prevState) => ({
                                        ...prevState,
                                        cargoInformation:{
                                            ...prevState.cargoInformation,
                                            packageType:e.target.value
                                        } 
                                    }))
                                }
                            >
                                <option value="sms">Packaging Type</option>
                                <option value="sms">Pallet</option>
                                <option value="email">Box</option>
                                <option value="both">Crate</option>
                                <option value="sms">Carton</option>
                                <option value="email">Case</option>
                                <option value="both">Drum</option>
                                <option value="both">Bucket</option>
                                <option value="both">Bag</option>
                                <option value="both">Shrinkwrap</option>
                            </select>
                            <input 
                                type="text"
                                className='text-inputs-sides' 
                                placeholder='Length (cm)'
                                onChange={e =>setBookingThree((prevState) => ({
                                        ...prevState,
                                        cargoInformation:{
                                            ...prevState.cargoInformation,
                                            cargoLength:e.target.value
                                        } 
                                    }))
                                }
                            />
                    </span>

                    <span className='address-input cargo-product' style={{marginTop:"0px"}}>
                            <input 
                                type="text"
                                className='text-inputs-sides' 
                                placeholder="Volume (m3)"
                                onChange={e =>setBookingThree((prevState) => ({
                                        ...prevState,
                                        cargoInformation:{
                                            ...prevState.cargoInformation,
                                            volume:e.target.value
                                        } 
                                    }))
                                }
                            />
                        
                            <input 
                                type="text"
                                className='text-inputs-sides' 
                                placeholder='Breadth (cm)'
                                onChange={e =>setBookingThree((prevState) => ({
                                        ...prevState,
                                        cargoInformation:{
                                            ...prevState.cargoInformation,
                                            breadth:e.target.value
                                        } 
                                    }))
                                }
                            />
                    </span>

                    <span className='address-input cargo-product' style={{marginTop:"0px"}}>
                            <input 
                                type="text"
                                className='text-inputs-sides' 
                                placeholder="Weight"
                                onChange={e =>setBookingTwo((prevState) => ({
                                        ...prevState,
                                        cargoInformation:{
                                            ...prevState.cargoInformation,
                                            weight:e.target.value
                                        } 
                                    }))
                                }
                            />
                        
                            <input 
                                type="text"
                                className='text-inputs-sides' 
                                placeholder='Height (cm)'
                                onChange={e =>setBookingThree((prevState) => ({
                                        ...prevState,
                                        cargoInformation:{
                                            ...prevState.cargoInformation,
                                            height:e.target.value
                                        } 
                                    }))
                                }
                            />


                    </span>
                        <input 
                            type="radio" 
                            value="fragile"
                            onChange={e =>setBookingThree((prevState) => ({
                                    ...prevState,
                                    cargoInformation:{
                                        ...prevState.cargoInformation,
                                        cargoCondition:e.target.value
                                    } 
                                }))
                            }
                        />
                        &nbsp;
                        <label htmlFor="fragile" className='radioSelect'>Fragile</label> <br />

                        <input 
                            type="radio" 
                            value="temperature control"
                            onChange={e =>setBookingThree((prevState) => ({
                                    ...prevState,
                                    cargoInformation:{
                                        ...prevState.cargoInformation,
                                        cargoCondition:e.target.value
                                    } 
                                }))
                            }
                        />
                        &nbsp;
                        <label htmlFor="temperature" className='radioSelect'>Temperature Control (C)</label> 

                        <span className='address-input min-max'style={{marginTop:"18px"}}>
                            <input 
                                    type="text"
                                    className='text-inputs-sides' 
                                    placeholder='Min'
                                    onChange={e =>setBookingThree((prevState) => ({
                                            ...prevState,
                                            cargoInformation:{
                                                ...prevState.cargoInformation,
                                                min:e.target.value
                                            } 
                                        }))
                                    }
                                />
                            <input 
                                type="text"
                                className='text-inputs-sides' 
                                placeholder='Max'
                                onChange={e =>setBookingTwo((prevState) => ({
                                        ...prevState,
                                        cargoInformation:{
                                            ...prevState.cargoInformation,
                                            max:e.target.value
                                        } 
                                    }))
                                }
                            />
                        </span>
                        
                        <input 
                            type="radio" 
                            value="harzardous"
                            onChange={e =>setBookingThree((prevState) => ({
                                    ...prevState,
                                    cargoInformation:{
                                        ...prevState.cargoInformation,
                                        cargoCondition:e.target.value
                                    } 
                                }))
                            }
                        />
                        &nbsp;
                        <label htmlFor="harzardous" className='radioSelect'>Harzardous</label> <br />

                        <span className='upload'style={{marginTop:"15px"}}>
                            <input 
                                    type="text"
                                    className='imo-sides' 
                                    placeholder='IMO Class'
                                    onChange={e =>setBookingThree((prevState) => ({
                                            ...prevState,
                                            cargoInformation:{
                                                ...prevState.cargoInformation,
                                                imoClass:e.target.value
                                            } 
                                        }))
                                    }
                                />
                            <input 
                                type="text"
                                className='imo-sides' 
                                placeholder='UN Number'
                                style={{}}
                                onChange={e =>setBookingThree((prevState) => ({
                                        ...prevState,
                                        cargoInformation:{
                                            ...prevState.cargoInformation,
                                            unNumber:e.target.value
                                        } 
                                    }))
                                }
                            />
                             <div className='upload-file-container'>
                                <button className='upload-btn-btn'><i class="fa-solid fa-upload"></i></button>
                                <input type="file" placeholder='Upload SDS'/>
                            </div>                          
                        </span>
                        <span>
                            <button className='add-contact-btn' onClick={saveTolocalThree}>Save</button>
                        </span>
                    </div>
                </ReactModalthree>
                <div className='cargo-container'>
                                <div className='cargoHeading'>
                                    <div>Select Cargo</div>
                                    <div>Product Name</div>
                                    <div>Product Number</div>
                                    <div>Breath</div>
                                    <div>height</div>
                                    <div>Length</div>
                                    <div>Package Type</div>
                                    <div>Volume</div>
                                    <div>Edit</div>
                                </div>
                    {!bookingArrayThree.length < 1 ? bookingArrayThree.map((cargo) =>(
                        // <React.Fragment >
                                <div className='cargoDataTable' key={cargo.id}>
                                    <div><input type="checkbox" style={{marginRight: "10px"}} onChange={() => selectCargoCheck(cargo) } /></div>
                                    <div><p>{cargo.bookingThree.cargoInformation.productName}</p></div>
                                    <div><p>{cargo.bookingThree.cargoInformation.productNumber}</p></div>
                                    <div><p>{cargo.bookingThree.cargoInformation.breadth}</p></div> 
                                    <div><p>{cargo.bookingThree.cargoInformation.height}</p></div>
                                    <div><p>{cargo.bookingThree.cargoInformation.cargoLength}</p></div>
                                    <div><p>{cargo.bookingThree.cargoInformation.packageType}</p></div>
                                    <div><p>{cargo.bookingThree.cargoInformation.volume}</p></div>
                                    <div><i class="fa-solid fa-trash"></i></div> 
                                </div>
                        // </React.Fragment>
                        ))
                        : 
                        <div className='cargo-unavailable'>
                            <h1 className='add-contacts' style={{marginTop:"10px"}}>Currently there is no cargo please click the plus button to add cargo</h1>
                        </div>
                    }
                    
                </div> 
            </div>
            <div className='available-dates'>
                <h3>Available pick up dates</h3>
                {/* <DatePicker 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
                    
                /> */}
                <DateTimePicker 
                    onChange={onChange} 
                    value={value} 
                    dateFormat="yyyy-mm-dd"
                    className="available-pick-date" 
                />
            </div>
            <div className='the-booking-button'>
                <button onClick={saveToDatabase} className="booking-btn">Book</button>
            </div>
    </div>
  )
}
