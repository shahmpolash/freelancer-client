import React from 'react';
import Freelancers from '../Freelancers/Freelancers/Freelancers';
import Services from '../Services/Services';
import Banner from './Banner';
import './Home.css';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className='service-bg pb-5'><Services></Services></div>
            <h5 className='my-5'>Recent Joined Service Providers</h5>
            <Freelancers></Freelancers>
        </div>
    );
};

export default Home;