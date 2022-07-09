import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Requirement = () => {
    const { id } = useParams()
    const [myServiceorder, setmyServiceOrder] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        fetch(`http://localhost:5000/myserviceorder/${id}`)
            .then(res => res.json())
            .then(result => setmyServiceOrder(result))

    }, []);

    const confirmRequirement = event => {
        event.preventDefault();
        const requirement = event.target.updateRequirement.value;
        const providerReq = event.target.reqUpdated.value;
        const requirementStatus = { requirement, providerReq };
        const url = `http://localhost:5000/myserviceorderrequirement/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(requirementStatus)
        })
            .then(res => res.json())
            .then(result => {
                alert('Are You Sure You Understood?');
                navigate(`/requirement/${id}`);
            })
    };

    return (
        <div className='container'>
            <h5>{myServiceorder.servicename}</h5>
            <div className=''>
                <div>
                    <h5> Client: {myServiceorder.clientName}</h5>
                    <p>{myServiceorder.requirement}</p>
                </div>
                <div>
                <h5>{myServiceorder.providerName}</h5>
                    <p>{myServiceorder.providerSaid}</p>
                </div>
            </div>
            <form onSubmit={confirmRequirement}>
                <input hidden value='providerrequpdated' type="text" name="reqUpdated" id="" />
                <textarea name="updateRequirement" id="" cols="30" rows="10"></textarea>
                <input type="submit" value="Post" />
            </form>

        </div>
    );
};

export default Requirement;