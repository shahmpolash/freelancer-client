import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useFreelancerProfile = () =>{
    const { freelancerId } = useParams();
    const [freelancer, setFreelancer] = useState({});

useEffect(() => {
    fetch(`https://agile-forest-60392.herokuapp.com/freelancer/${freelancerId}`)
        .then(res => res.json())
        .then(data => setFreelancer(data))
}, []);
return [freelancer]
}

export default useFreelancerProfile;