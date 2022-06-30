import React from 'react';
import Freelancers from '../Freelancers/Freelancers/Freelancers';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            
            <Services></Services>
            <h2 className='my-5'>Recent Joined Service Providers</h2>
            <Freelancers></Freelancers>
        </div>
    );
};

export default Home;