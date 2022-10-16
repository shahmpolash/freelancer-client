import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const useFreelancer = () =>{
    const [user] = useAuthState(auth);
    const [myDatas, setmyDatas] = useState([]);
    useEffect( () =>{
        const url = `https://agile-forest-60392.herokuapp.com/freelancerprofile?email=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=> setmyDatas(data));
  

    }, [user]);
    return [myDatas];
}

export default useFreelancer;
