import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import './AdminSetup.css';

const AdminSetup = () => {
    const navigate = useNavigate();

    const handleAdmin = event =>{
        
        event.preventDefault();
        const adminName = event.target.adminName.value;
        const adminEmail = event.target.adminEmail.value;
        const adminDetails = {adminName, adminEmail}

        const url = `http://localhost:5000/admin`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(adminDetails)
        })
            .then(res => res.json())
            .then(result => {
                
                navigate('/dashboard');

            })
    }

    return (
        <div className='container mt-5'>
            <AdminMenu></AdminMenu>
            <form onSubmit={handleAdmin}>
                <input type="text" name="adminName" id="" placeholder='Admin Full Name'/>
                <input type="email" name="adminEmail" id="" placeholder='Admin Email' />
                <input type="submit" value="Add Admin" />
            </form>
        </div>
    );
};

export default AdminSetup;