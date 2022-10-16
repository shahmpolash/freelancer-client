import React from 'react';
import { Helmet } from 'react-helmet';
import Freelancers from '../Freelancers/Freelancers/Freelancers';
import Services from '../Services/Services';
import Banner from './Banner';
import './Home.css';
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>TakeAlancer.com - Find Skilled SEO Experts</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <Banner></Banner>
            <div className='service-bg pb-5'><Services></Services></div>
            <div className='divided container'></div>
            <h5 className='my-5'>Recent Joined Service Providers</h5>
            <Freelancers></Freelancers>
        </div>
    );
};

export default Home;