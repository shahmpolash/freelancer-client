import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const useDashboard = () =>{
    const [user] = useAuthState(auth);
    const [dashboards, setDashboards] = useState([]);

    useEffect( ()=>{
        const url = `https://agile-forest-60392.herokuapp.com/freelancerprofile?email=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=>setDashboards(data))
    }, []);
    return [dashboards]
}

export default useDashboard;