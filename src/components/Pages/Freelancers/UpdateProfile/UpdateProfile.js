import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import './UpdateProfile.css';


const UpdateProfile = () => {
    const [user, loading, error] = useAuthState(auth);
    const handleUpdate = event => {
        event.preventDefault();
        const experience = event.target.experience.value;

        const freelancer = {
            email: user.email,
            name: event.target.name.value,
            onpageseo: event.target.onpageseo.value,
            offpageseo: event.target.offpageseo.value,
            technicalseo: event.target.technicalseo.value,
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

            })
    }

    return (
        <div className='container'>
            <h1>Update Your Profit</h1>
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


                            <input type="submit" value="Update Profile" />
                        </form>
                    </div>
                    );
};

                    export default UpdateProfile;