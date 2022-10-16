import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import AdminMenu from './AdminMenu';

const ProviderApprove = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [provider, setProvider] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `https://agile-forest-60392.herokuapp.com/admin`
        fetch(url)
            .then(res => res.json())
            .then(data => setAdmins(data));
    }, []);

    useEffect(() => {
        fetch(`https://agile-forest-60392.herokuapp.com/freelancer/${id}`)
            .then(res => res.json())
            .then(data => setProvider(data))
    }, [provider])



    const approve = event => {
        event.preventDefault();
        const status = event.target.status.value;

        const providerApprove = { status }

        const url = `https://agile-forest-60392.herokuapp.com/freelancer-status/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(providerApprove)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                navigate('/admin/providers');

            })
    }

    return (
        <div className='container'>
            {
                 admins.filter(admin => admin.adminEmail === user?.email).length === 1 &&
                 <>
                 <AdminMenu></AdminMenu>
            {
                provider.status === "Approved" && <h5>Already Approved</h5>
            }
            {
                provider.status === "Unapproved" &&
                <form onSubmit={approve}>
                    <input hidden value='Approved' type="text" name="status" id="" />
                    <input className='btn btn-success' type="submit" value="Approve Now" />
                </form>
            }
                 </>
            }
             {
                admins.filter(admin => admin.adminEmail === user?.email).length === 0 &&
                <>
                    <h5>You dont have permission to access Admin Panel</h5>
                </>
            }
             {
                admins.filter(admin => admin.adminEmail === user?.email).length === 0 &&
                <>
                    <h5>You dont have permission to access Admin Panel</h5>
                </>
            }


        </div>
    );
};

export default ProviderApprove;