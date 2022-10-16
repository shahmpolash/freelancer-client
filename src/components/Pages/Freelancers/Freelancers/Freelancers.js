import React, { useEffect, useState } from 'react';
import Freelancer from './Freelancer';
import './Freelancers.css';

const Freelancers = () => {
    const [freelancers, setFreelancers] = useState([]);

    useEffect(() => {
        fetch('https://agile-forest-60392.herokuapp.com/freelancers')
            .then(res => res.json())
            .then(data => setFreelancers(data))
    }, [])


    return (
        <div className='container'>

            <div className='freelancers'>
                {
                    freelancers.map(freelancer =>
                        <>{freelancer.status === 'Approved' && <Freelancer
                            key={freelancer._id}
                            freelancer={freelancer}>
                        </Freelancer>}</>

                    )
                }
            </div>

        </div>
    );
};

export default Freelancers;