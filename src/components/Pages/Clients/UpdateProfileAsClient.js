import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import './UpdateProfileAsClient.css';

const UpdateProfileAsClient = () => {

    const [myClient, setMyClient] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const handleUpdate = event => {
        event.preventDefault();
        const client = {
            clientEmail: user.email,
            clientName: event.target.clientname.value,
            clientProfile: event.target.clientprofile.value,
            cLientAbout: event.target.clientabout.value,
            clientFB: event.target.clientfb.value,
            clientTwitter: event.target.clienttwitter.value,
            clientLinkedin: event.target.clientlinkedin.value,
        }
        const url = `http://localhost:5000/clients/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(client)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                navigate('/');
            })
    }
    useEffect(() => {
        fetch(`http://localhost:5000/clientprofilereview?customeremail=${user.email}`)
            .then(res => res.json())
            .then(result => setMyClient(result))
    }, []);

    return (
        <div className='container'>
            {
                myClient.length === 1 && <h2>You have already Updated Profile</h2>
            }

            {
                myClient.length === 0 && <div>
                    <h5>Update Profile as a Client</h5>
                    <form className='client' onSubmit={handleUpdate}>
                        <input type="text" name="clientname" id="" placeholder='Your Full Name' required />
                        <textarea name="clientabout" id="" cols="30" rows="10" placeholder='Write about you'></textarea>
                        <input type="text" name="clientprofile" id="" placeholder='Your Profile Picture' required />
                        <input type="text" name="clientfb" id="" placeholder='FB Link' required />
                        <input type="text" name="clienttwitter" id="" placeholder='Twitter Link' required />
                        <input type="text" name="clientlinkedin" id="" placeholder='Linkedin Link' required />
                        <input className='btn btn-primary' type="submit" value="Update Profile" />
                    </form>
                </div>
            }

        </div>
    );
};

export default UpdateProfileAsClient;