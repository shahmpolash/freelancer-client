import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../../firebase.init';

const ClientSentMessageToProviderAfterOrder = () => {
    const { orderId } = useParams();
    const [user] = useAuthState(auth);
    const [serviceOrders, setServiceOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/myorder/${orderId}`)
            .then(res => res.json())
            .then(result => setServiceOrders(result))
    }, [])

    const handleSendMessageToClient = event => {
        event.preventDefault();
        const serviceName = event.target.serviceName.value;
        const serviceId = event.target.serviceId.value;
        const providerName = event.target.providerName.value;
        const providerEmail = event.target.providerEmail.value;
        const providerId = event.target.providerId.value;
        const clientName = event.target.clientName.value;
        const clientEmail = event.target.clientEmail.value;
        const clientId = event.target.clientId.value;
        const orderId = event.target.orderId.value;
        const clientMessage = event.target.clientMessage.value;
        const messageStatus = event.target.messageStatus.value;
        const whoSent = event.target.whoSent.value;
        const clientSentMessage = { serviceName, serviceId, providerName, providerEmail, providerId, clientName, clientEmail, clientId, messageStatus, clientMessage, whoSent, orderId };

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
        <div className='container'>
            <h2>Hello</h2>
            {serviceOrders._id}
            {
                serviceOrders.customeremail === user.email &&
                <>
                    <h5>Send Message</h5>
                    <h5>Service Name: {serviceOrders.servicename}</h5>


                    <form onSubmit={handleSendMessageToClient}>
                        <input value={serviceOrders.servicename} type="text" name="serviceName" id="" />
                        <input value={serviceOrders.serviceId} type="text" name="serviceId" id="" />
                        <input value={serviceOrders.providerName} type="text" name="providerName" id="" />
                        <input value={serviceOrders.provideremail} type="text" name="providerEmail" id="" />
                        <input value={serviceOrders.providerId} type="text" name="providerId" id="" />
                        <input value={serviceOrders._id} type="text" name="orderId" id="" />
                        <input value="unRead" type="text" name="messageStatus" id="" />
                        <input value="clientSent" type="text" name="whoSent" id="" />
                        <input value={serviceOrders.clientName} type="text" name="clientName" id="" />
                         <input value={serviceOrders.customeremail} type="text" name="clientEmail" id="" />
                        <input value={serviceOrders.clientId} type="text" name="clientId" id="" />
                          
                        <textarea name="clientMessage" id="" cols="30" rows="10"></textarea>

                        <input className='btn btn-primary' type="submit" value="Send Message" />
                    </form>

                </>

            }

        </div>
    );
};

export default ClientSentMessageToProviderAfterOrder;