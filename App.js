import React from 'react';
import './App.css';
import './UpdateButton';
import RecordTable from "./RecordTable";
import ButtonsBar from "./ButtonsBar";
import AddBar from "./AddBar";
import SignIn from "./login";
import UserTable from "./UserTable";
import DoorIP from "./DoorIP";
import {UserProvider} from "./UserContext";


function App() {
    // const [pass, setPass] = React.useState(false);


    // if (!pass) {
    //     return (<SignIn pass={pass} setPass={setPass}/>)
    // } else{
        const [users, setUsers] = React.useState();
        const [updateUser, setUpdateUser] = React.useState({state:0});

        return (
            // <UserProvider>
                    <div className="App">
                        <ButtonsBar/>
                        <AddBar setUpdateUser={setUpdateUser}/>
                        <RecordTable users={users}/>
                        <UserTable setUsers={setUsers} updateUser={updateUser}/>
                        <DoorIP/>
                    </div>
            // </UserProvider>
        );
    // }

}

export default App;
