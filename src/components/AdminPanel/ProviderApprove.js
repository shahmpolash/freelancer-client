import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const ProviderApprove = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [provider, setProvider] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/freelancer/${id}`)
            .then(res => res.json())
            .then(data => setProvider(data))
    }, [provider])



    const approve = event => {
        event.preventDefault();
        const status = event.target.status.value;

        const freelancer = { status }

        const url = `http://localhost:5000/freelancer/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(freelancer)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                navigate('/admin/providers');

            })
    }

    return (
        <div className='container'>
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


        </div>
    );
};

export default ProviderApprove;