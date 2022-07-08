import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ClientProfile.css';

const ClientProfile = () => {
    const {clientId} = useParams();
    const [client, setClient] = useState([]);
    const [clientReviews, setClientReviews] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/client/${clientId}`)
            .then(res => res.json())
            .then(data => setClient(data))
    }, [client]);

    useEffect(() => {
        fetch(`http://localhost:5000/clientprofilereview?customeremail=${client.clientEmail}`)
            .then(res => res.json())
            .then(result => setClientReviews(result))
    }, [clientReviews]);
    return (
        <div className='container'>
            <div>
                <img src={client.clientProfile} alt="" />
                <div>
                    <h3>About {client.clientName}</h3>
                    <p>{client.cLientAbout}</p>
                </div>
            </div>
            <h2>Total: {clientReviews.filter(clientReview => clientReview.providerReviewStatus === 'done').length} Reviews</h2>
            {
                clientReviews.map(clientReview =>
                 <div className='client-review col-lg-4' key={clientReview._id}>
                     {clientReview.providerReviewStatus === 'done' && <p>Rating {clientReview.providerRate} Out of 5</p>}
                     {clientReview.providerReviewStatus === 'done' && <p className='mt-0'>Review {clientReview.providerReview}</p>}
                </div>)
            }
        </div>
    );
};

export default ClientProfile;