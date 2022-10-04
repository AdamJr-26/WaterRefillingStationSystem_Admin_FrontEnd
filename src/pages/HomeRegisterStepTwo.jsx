import React from 'react'
import { NavLink } from 'react-router-dom'
import AdminTextinput from '../components/AdminTextinput'
import { Icon } from '@iconify/react';
function HomeRegisterStepTwo() {
  return (
    <div className='home-register--steps__two'>
        
        <NavLink className="back" to="/register" ><Icon icon="akar-icons:arrow-back-thick" /> Back</NavLink>
        <p className='title'>Your WRS Information</p>
        <p className='detail'>Register your water refilling business and use our system for free</p>
        <AdminTextinput label="WRSS Name" />
        <p className="address">Complete Address *</p>
        <AdminTextinput label="Region" />
        <AdminTextinput label="Province" />
        <AdminTextinput label="City" />
        <AdminTextinput label="Barangay" />
        <AdminTextinput label="Street name, building, house no." />
        <button type='submit'>Submit</button>
    </div>
  )
}

export default HomeRegisterStepTwo