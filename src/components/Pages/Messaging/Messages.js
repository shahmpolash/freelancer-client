import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import './Messages.css';

const Messages = () => {
    const [user] = useAuthState(auth);
    const [providers, setProviders] = useState([]);
    const [providerMessages, setProviderMessages] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:5000/freelancerprofile?email=${user.email}`)
            .then(res => res.json())
            .then(data => setProviders(data))
    }, [user])


    useEffect(() => {
        fetch(`http://localhost:5000/messages`)
            .then(res => res.json())
            .then(result => setProviderMessages(result))
    }, [providerMessages])

    return (
        <div className='container'>
            <div className='col-lg-6'>
            <h5>Inbox {providerMessages.length}</h5>
            {providerMessages.filter(providerMessage => providerMessage.providerEmail === user.email).length > 0 &&

            <>
            {
                providerMessages.map(pm => <> 
                    <div className='single-message-card'>
                        <h5>Sender: {pm.clientName}</h5>
                        <h5>Service: {pm.serviceId}</h5>
                        <p>{pm.clientMessage}</p>
                    </div>
                </>).reverse()
            }
            </>
            
            } 
            

            </div>
        </div>
    );
};

export default Messages;