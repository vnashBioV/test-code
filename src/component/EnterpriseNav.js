import React from 'react'
import {Avatar} from '@mui/material';
import zipilogo from '../icons/zipilogoo.png'
import {Link} from "react-router-dom";

export default function EnterpriseNav({name, iconName}) {
  return (
    <div className='nav-wrapper'>
        <div className='nav-container'>
        <div className='logo'>
            <img src={zipilogo} alt="" /><p>enterprise</p>
        </div>
        <div className='nav'>
            <p>{name}</p>
            <Avatar className='Enterprise-icon'>{iconName.toUpperCase()}</Avatar>
            <i class="fa-solid fa-chevron-down chearrow"></i>
            <ul className='dropdown-wrapper'>
                <li><Link to="/home"><i class="fa-solid fa-location-arrow"></i>Tracking</Link></li>
            </ul>
        </div>
    </div>
    </div>
  
  )
}
