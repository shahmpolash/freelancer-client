import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import useOrderItem from '../../hooks/useOrderItem';
import './ServiceDetails.css';


const ServiceDetails = () => {
    const navigate = useNavigate();
    const [service] = useOrderItem();
    const [userProfile, setUserProfile] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/freelancerprofile?email=${service.email}`)
            .then(res => res.json())
            .then(result => setUserProfile(result))
    }, [userProfile]);

    useEffect(() => {
        fetch(`http://localhost:5000/providerreview?serviceId=${service._id}`)
            .then(res => res.json())
            .then(info => setReviews(info))
    }, [reviews]);

    const navigateToOrderPage = id => {
        navigate(`/order/${id}`)

    }

    const navigateTouserProfile = id => {
        navigate(`/freelancer/${id}`)
    }
    return (
        <div>
            <div className='container d-flex justify-content-center'>
                <div className='col-lg-3'>
                    <div className='user-profile'>
                        {
                            userProfile.map(u => <div key={u._id}><img src={u.profile} alt="" />
                                <p>{u.name}</p>
                                <Button onClick={() => navigateTouserProfile(u._id)}>View Profile</Button>
                            </div>)
                        }
                    </div>
                </div>
                <div className='service-details container'>
                    <h3>I am {userProfile.name}</h3>
                    <h2>{service.title}</h2>
                    <img src={service.img} alt="" />
                    <p>{service.details}</p>
                    <Button onClick={() => navigateToOrderPage(service._id)}>Order Now ${service.price}usd</Button>
                    
                </div>
            </div>
            <div className='container'>
            <h2>Total: {reviews.filter(review => review.reviewStatus === 'done').length} Reviews</h2>
                {
                    reviews.map(review => <div key={review._id}>
                        <div className='review col-lg-6 mt-3'>
                            <div>
                            {review.reviewStatus === 'none' && <></>}
                        {review.reviewStatus === 'done' && 
                        <div> <p>Client: {review.customeremail}</p>
                                <p>Rate: {review.rate} out of 5</p>
                                <p className='client-review font-italic'>"{review.review}"</p>
                            </div>}
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ServiceDetails;