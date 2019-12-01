import React from "react";
import {socket} from "./socket";

const UserContext = React.createContext(null);

const UserProvider = (props) => {
    const [users, setUsers] = React.useState();

    return (
        <UserContext.Provider value={[users, setUsers]}>
            {props.children}
        </UserContext.Provider>
    )
};

export {UserContext, UserProvider}