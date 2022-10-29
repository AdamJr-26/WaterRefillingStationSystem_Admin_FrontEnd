import React from 'react'
import { Icon } from '@iconify/react';

function AdminDashboardCard2({ title, amount, iconName, active }) {
  return (
    <div className={active? "dashboard-card dashobard-card2-active":'dashboard-card'}>
        <Icon className='dashboard-card--icon' icon={iconName} />
        <p className='dashboard-card--amount'>{amount}</p>
        <p className="dashboard-card--title">{title}</p>
    </div>
  )
}

export default AdminDashboardCard2