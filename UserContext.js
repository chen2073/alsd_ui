import React from "react";
import {socket} from "./socket";


const UserContext = React.createContext(null);

const UserProvider = (props) => {
    const reducer = () => {
        let data = null;
        fetch(socket+'get_all_users')
            .then(res => res.json())
            .then(json => data = json)
            .catch(e => console.log(e))
        return data
    };

    const [state, dispatcher] = React.useReducer(reducer, null);


    // React.useEffect(() => {
    //     fetch(socket+'get_all_users')
    //         .then(res => res.json())
    //         .then(json => setUsers(json['users']))
    //         .catch(e => console.log(e))
    // }, [updateUser]);


    return (
        <UserContext.Provider value={[state, dispatcher]}>
            {props.children}
        </UserContext.Provider>
    )
};

export {UserContext, UserProvider}