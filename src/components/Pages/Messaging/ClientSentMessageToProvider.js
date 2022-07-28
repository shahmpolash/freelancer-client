import React from 'react';
import useOrderItem from '../../hooks/useOrderItem';
import './ClientSentMessageToProvider.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientSentMessageToProvider = () => {
    const [user] = useAuthState(auth);
    const [service] = useOrderItem();
    const [client, setClient] = useState([]);
    const [provider, setProvider] = useState([]);
    const [orders, setorders] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user.email}`)
            .then(res => res.json())
            .then(data => setClient(data))
    }, [user])

    useEffect(() => {
        fetch(`http://localhost:5000/freelancerprofile?email=${user.email}`)
            .then(res => res.json())
            .then(data => setProvider(data))
    }, [user])

    useEffect(() => {
        fetch(`http://localhost:5000/orders`)
            .then(res => res.json())
            .then(result => setorders(result))
    }, [])




    const handleClientMessage = event => {
        event.preventDefault();
        const serviceName = event.target.serviceName.value;
        const serviceId = event.target.serviceId.value;
        const providerName = event.target.providerName.value;
        const providerEmail = event.target.providerEmail.value;
        const providerId = event.target.providerId.value;
        const clientName = event.target.clientName.value;
        const clientEmail = event.target.clientEmail.value;
        const clientId = event.target.clientId.value;
        const clientMessage = event.target.clientMessage.value;
        const messageStatus = event.target.messageStatus.value;
        const whoSent = event.target.whoSent.value;
        const clientSentMessage = { serviceName, serviceId, providerName, providerEmail, providerId, clientName, clientEmail, clientId, messageStatus, clientMessage, whoSent };

        const url = `http://localhost:5000/message/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(clientSentMessage)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/messages');
            })

    };


    return (
        <div className='send-message container'>
            {
                client.filter(c => c.clientEmail === user.email).length === 1 && <>

                    <h5>Send Message</h5>
                    <h5>Service Name: {service.title}</h5>
                    <h5>Provider Name: {service.providerName}</h5>

                    <form onSubmit={handleClientMessage}>
                        <input value={service.title} type="text" name="serviceName" id="" />
                        <input value={service._id} type="text" name="serviceId" id="" />
                        <input value={service.providerName} type="text" name="providerName" id="" />
                        <input value={service.email} type="text" name="providerEmail" id="" />
                        <input value={service.providerId} type="text" name="providerId" id="" />
                        <input value="unRead" type="text" name="messageStatus" id="" />
                        <input value="clientSent" type="text" name="whoSent" id="" />
                        {
                            client.map(c => <div key={c._id}>
                                <input value={c.clientName} type="text" name="clientName" id="" />
                            </div>)
                        }
                        {
                            client.map(c => <div key={c._id}>
                                <input value={c.clientEmail} type="text" name="clientEmail" id="" />
                            </div>)
                        }
                        {
                            client.map(c => <div key={c._id}>
                                <input value={c._id} type="text" name="clientId" id="" />
                            </div>)
                        }
                        <textarea name="clientMessage" id="" cols="30" rows="10"></textarea>

                        <input className='btn btn-primary' type="submit" value="Send Message" />
                    </form>

                </>
            }

           

        </div>
    );
};

export default ClientSentMessageToProvider;