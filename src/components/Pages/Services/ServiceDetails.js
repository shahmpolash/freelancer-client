import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import auth from '../../../firebase.init';
import useOrderItem from '../../hooks/useOrderItem';
import './ServiceDetails.css';

const ServiceDetails = () => {
    const navigate = useNavigate();
    const {serviceId} = useParams();
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
        <div className='service-details-page'>
            <div className='container d-flex justify-content-center profile-service'>
                <div className='service-details container col-lg-9 shadow p-3 mb-5 bg-body rounded-5'>
                    <h5>{service.title}</h5>
                    <img src={service.img} alt="" />
                    <h5 className='mt-3'>About My Service:</h5>
                    <div className='verify-status'>
                    <div className='d-flex justify-content-center verified'>
                        <p className='mx-2'>Verified Provider <i class="fa-solid fa-check"></i></p>
                        <p className='mx-2'>Verified Service <i class="fa-solid fa-check"></i></p>
                    </div>
                    <p className='verified-by-takealancer'>(Verified by TakeALancer Team)</p>
                    </div>
                    {service.publishStatus === 'Published' && <Button onClick={() => navigateToOrderPage(service._id)}>Price ${service.price}usd/ Mo</Button>}
                    <p>{service.details}</p>
                     {service.publishStatus === 'Pending' && <Button>This Service is Not Published</Button>}
            
                </div>
                <div className='col-lg-3'>
                    <div className='user-profile shadow p-3 mb-5 bg-body rounded-5'>
                        {
                            userProfile.map(u => <div key={u._id}><img src={u.profile} alt="" />
                                <h5>{u.name}</h5>
                                <p><i class="fa-solid fa-location-dot"></i> {u.location}</p>
                                <Button className='mx-5' onClick={() => navigateTouserProfile(u._id)}><i class="fa-solid fa-user"></i> View Profile</Button>
                                
                            </div>)
                        }
                                <Link  to={`/message/${service._id}`} className="btn btn-primary mt-2"><i class="fa-solid fa-message"></i> Message Me</Link>
                    </div>
                    <div className='buy-service mt-3'>
                   
                    {service.publishStatus === 'Published' && <Button onClick={() => navigateToOrderPage(service._id)}>Buy this service ${service.price}usd/ Mo</Button>}
                    
                     {service.publishStatus === 'Pending' && <Button>This Service is Not Published</Button>}
                       
                        </div>
                </div>
            </div>
            <div className='container mt-5'>
            <h5>Total: {reviews.filter(review => review.reviewStatus === 'done').length} Reviews</h5>
                {
                    reviews.map(review => <div key={review._id}>
                        <div className='col-lg-6 mt-3'>
                            <div>
                            {review.reviewStatus === 'none' && <></>}
                        {review.reviewStatus === 'done' && 
                        <div className='review'><h6>Client: {review.clientName}: </h6>
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