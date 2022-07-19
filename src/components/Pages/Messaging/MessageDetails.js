import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const MessageDetails = () => {
    const { messageId } = useParams();
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/message/${messageId}`)
            .then(res => res.json())
            .then(data => setMessage(data))
    }, []);

    const handleRead = event => {
        event.preventDefault();
        const messageStatus = event.target.messageStatus.value;
        const status = { messageStatus };
        const url = `http://localhost:5000/message/${messageId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(result => {

                navigate('/messages');
            })
    };
    const handleUnRead = event => {
        event.preventDefault();
        const messageStatus = event.target.messageStatus.value;
        const status = { messageStatus };
        const url = `http://localhost:5000/message/${messageId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(result => {

                navigate('/messages');
            })
    };



    return (
        <div className='container mt-5'>
            <Link to={`/service/${message.serviceId}`}><h5>{message.serviceName}</h5></Link>
            {
                message.whoSent === 'clientSent' &&
                <div>
                    <div className='d-flex'>
                        <h5 className='col-lg-2'>
                            {message.clientName} Says
                        </h5>
                        <p className='mx-3'>
                            {message.clientMessage}
                        </p>
                    </div>
                   <div className='d-flex justify-content-center'>
                   <form onSubmit={handleRead}>
                        <input hidden value="read" type="text" name="messageStatus" id="" />
                        <input type="submit" value="Mark Read" />
                    </form>
                    <form onSubmit={handleUnRead}>
                        <input hidden value="unRead" type="text" name="messageStatus" id="" />
                        <input type="submit" value="Mark Unread" />
                    </form>
                   </div>
                </div>

            }

        </div>
    );
};

export default MessageDetails;