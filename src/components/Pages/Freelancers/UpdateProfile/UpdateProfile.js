import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import './UpdateProfile.css';


const UpdateProfile = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [myFreelancer, setMyFreelancer] = useState([]);

    const handleUpdate = event => {
        event.preventDefault();
        const experience = event.target.experience.value;

        const freelancer = {
            email: user.email,
            name: event.target.name.value,
            onpageseo: event.target.onpageseo.value,
            offpageseo: event.target.offpageseo.value,
            technicalseo: event.target.technicalseo.value,
            lead: event.target.lead.value,
            social: event.target.social.value,
            profile: event.target.profile.value,
            available: event.target.available.value,
            experience,
            about: event.target.about.value,
            fb: event.target.fb.value,
            twitter: event.target.twitter.value,
            linkedin: event.target.linkedin.value,
        }
        const url = `http://localhost:5000/freelancers/`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(freelancer)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                navigate('/set-service');

            })
    }
    useEffect( () =>{
        fetch(`http://localhost:5000/freelancerprofile?email=${user.email}`)
        .then(res=>res.json())
        .then(data=>setMyFreelancer(data))
    },[])

    return (
        <div className='container'>
            <h1>Update Your Profit</h1>
            {
               myFreelancer.length === 1 && <h2>You have already Updated Profile</h2> 
            }

{
               myFreelancer.length === 0 && <div>
                <form className='freelancer' onSubmit={handleUpdate}>
                <input type="text" name="name" id="" placeholder='Your Full Name' required />
                <input type="text" name="heading" id="" placeholder='Headling Of You' required />
                <input type="text" name="profile" id="" placeholder='Your Profile Picture' required />
                <label><h3>Select Your Skills</h3></label><br></br>
                <input type="checkbox" name="onpageseo" value="Onpage SEO" />
                <label> OnPage SEO</label><br></br>
                <input type="checkbox" name="offpageseo" value="OffPage SEO" />
                <label> OffPage SEO</label><br></br>
                <input type="checkbox" name="technicalseo" value="Technical SEO" />
                <label>Technical SEO</label><br></br>
                <input type="checkbox" name="lead" value="Lead Generation" />
                <label>Lead Generation</label><br></br>
                <input type="checkbox" name="social" value="Social Media Marketing" />
                <label>Social Media Marketing</label><br></br>

                <textarea name="about" id="" cols="30" rows="10" placeholder='About You' required />
                <label> <h3>Your Experience</h3></label><br></br>
                <select name="experience" id="">
                    <option>Under 1 Year</option>
                    <option>1 Year + </option>
                    <option>2 Years +</option>
                    <option>3 Years +</option>
                    <option>5 Years +</option>
                </select>
                <label> <h3>Are you available for work?</h3></label><br></br>
                <select name="available">
                    <option>Yes</option>
                    <option>No</option>

                </select>
                <input type="text" name="fb" id="" placeholder='FB Link' required />
                <input type="text" name="twitter" id="" placeholder='Twitter Link' required />
                <input type="text" name="linkedin" id="" placeholder='Linkedin Link' required />


                <input className='btn btn-primary' type="submit" value="Update Profile" />
            </form>
               </div> 
            }
            
        </div>
    );
};

export default UpdateProfile;