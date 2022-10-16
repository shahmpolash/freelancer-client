import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const useClient = () =>{
    const [user] = useAuthState(auth);
    const [clients, setClients] = useState([]);
    useEffect( () =>{
        const url = `https://agile-forest-60392.herokuapp.com/clientprofile?clientEmail=${user.email}`
        fetch(url)
        .then(res=>res.json())
        .then(data=> setClients(data));
  

    }, [user]);
    return [clients];
}

export default useClient;
