import React, { useState } from 'react'
import '../stylesheet/login.css'
import logo from '../icons/we-tracking-logo.png';
import firebase from '../firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate();

    // const validatePassword = () => {
    //     let isValid = true
    //     if (password !== '' && confirmPassword !== ''){
    //       if (password !== confirmPassword) {
    //         isValid = false
    //         setError('Passwords does not match')
    //       }
    //     }
    //     return isValid
    // }

    const authenticateUser = (e) =>{
        e.preventDefault()
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log(userCredential.user)
                firebase.database().ref('fleets/' + userCredential.user.uid).push({
                  name,
                  surname,
                  email,
                  phoneNumber
                })
                // alert("Registration successful please go and login!")
                navigate('/')
              })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage);
              // ..
            });
        setName('')
        setSurname('')
        setEmail('')
        setPassword('')
        
    }


  return (
    <div className='login'>
        <div className='side-section'>
            <img src={logo} alt="" />
        </div>
        <form action="" className='login-form'>
            <h1 className='register-head'>Sign up</h1>
            <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder='Surname' onChange={(e) => setSurname(e.target.value)}/>
            <input type="number" placeholder='Phone number' onChange={(e) => setPhoneNumber(e.target.value)}/>
            <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <button className='login-btn register-btn' onClick={authenticateUser}>Sign up <i class="fa-solid fa-arrow-right"></i></button>
            <h2>or</h2> <Link to='/'>Sign in</Link>
        </form>
    </div>
  )
}
