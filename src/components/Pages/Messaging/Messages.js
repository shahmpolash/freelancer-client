import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
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
                <div className='d-flex'>
                    <h5 className='mx-3'><i class="fa-solid fa-envelope"></i> Inbox {providerMessages.length}</h5>
                    <h5><Link as to={'/sentmessages'}>Sent Messages</Link></h5>
                </div>
                {providerMessages.filter(providerMessage => providerMessage.providerEmail === user.email).length > 0 &&

                    <>
                        {
                            providerMessages.map(pm => <>
                                <div className='single-message-card d-flex'>
                                    <h5>Sender: {pm.clientName}</h5>
                                        <div className='mx-3'>
                                        <div className='d-flex'>
                                        <h5><Link to={`/inbox/${pm._id}`}>{pm.serviceName}</Link></h5>
                                        <p>{pm.messageStatus === 'unRead' && <div className='unread'>New</div>}</p>
                                        </div>
                                        <p>{(pm.clientMessage).slice(0, 50)}</p>
                                    </div>                                  
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