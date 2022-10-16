import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Service.css';
const Service = ({ service }) => {
    const [serviceReviews, setServiceReviews] = useState([]);

    const { _id, title, price, img, profileIMG, providerName } = service;
    const navigate = useNavigate();

    const navigateToServiceDetails = id => {
        navigate(`/service/${id}`)
    }

    useEffect(() => {
        fetch(`https://agile-forest-60392.herokuapp.com/providerreview?serviceId=${service._id}`)
            .then(res => res.json())
            .then(info => setServiceReviews(info))
    }, [serviceReviews]);
    return (
        <div className='single-service-card'>
            <Button variant="light" onClick={() => navigateToServiceDetails(_id)} ><img className='service-image' src={img} alt="" />
                <div className='service-card p-2'>
                    <div className='mt-4'>
                        <p className='title'>{title}</p>
                        <div className='d-flex justify-content-start mt-2'>
                            <img className='profile-image' src={profileIMG} alt="" />
                            <p>{providerName}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p>${price}usd/Mo</p>
                            <p>{serviceReviews.filter(review => review.reviewStatus === 'done').length} Reviews</p>
                        </div>
                    </div>
                </div>
            </Button>
        </div>
    );
};

export default Service;