import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const ProviderUnverify = () => {
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
        const verifiedStatus = event.target.verifiedStatus.value;

        const freelancer = { verifiedStatus }

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
                provider.verifyStatus === "Unverified" && <h5>Already Unverified</h5>
            }
            {
                provider.verifyStatus === "Verified" &&
                <form onSubmit={approve}>
                    <input hidden value='Unverified' type="text" name="verifiedStatus" id="" />
                    <input className='btn btn-danger' type="submit" value="Unverify Now" />
                </form>
            }


        </div>
    );
};

export default ProviderUnverify;