import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../../firebase.init';

const ProviderSentMessageToClient = () => {
    const { orderId } = useParams();
    const [user] = useAuthState(auth);
    const [serviceOrders, setServiceOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://agile-forest-60392.herokuapp.com/myserviceorder/${orderId}`)
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
        const providerMessage = event.target.providerMessage.value;
        const messageStatus = event.target.messageStatus.value;
        const whoSent = event.target.whoSent.value;
        const providerSentMessage = { serviceName, serviceId, providerName, providerEmail, providerId, clientName, clientEmail, clientId, messageStatus, providerMessage, whoSent, orderId };

        const url = `https://agile-forest-60392.herokuapp.com/message/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(providerSentMessage)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/messages');
            })

    };

    return (
        <div className='container'>

            {
                serviceOrders.provideremail === user.email &&
                <>
                    <h5>Send Message</h5>
                    <h5>Service Name: {serviceOrders.servicename}</h5>


                    <form onSubmit={handleSendMessageToClient}>
                        <input hidden value={serviceOrders.servicename} type="text" name="serviceName" id="" />
                        <input hidden value={serviceOrders.serviceId} type="text" name="serviceId" id="" />
                        <input hidden value={serviceOrders.providerName} type="text" name="providerName" id="" />
                        <input hidden value={serviceOrders.provideremail} type="text" name="providerEmail" id="" />
                        <input hidden value={serviceOrders.providerId} type="text" name="providerId" id="" />
                        <input hidden value={serviceOrders._id} type="text" name="orderId" id="" />
                        <input hidden value="unRead" type="text" name="messageStatus" id="" />
                        <input hidden value="providerSent" type="text" name="whoSent" id="" />
                        <input hidden value={serviceOrders.clientName} type="text" name="clientName" id="" />
                        <input hidden value={serviceOrders.customeremail} type="text" name="clientEmail" id="" />
                        <input hidden value={serviceOrders.clientId} type="text" name="clientId" id="" />
                          
                        <textarea name="providerMessage" id="" cols="30" rows="10"></textarea>

                        <input className='btn btn-primary' type="submit" value="Send Message" />
                    </form>

                </>

            }

        </div>
    );
};

export default ProviderSentMessageToClient;