import React from 'react';
import './App.css';
import './UpdateButton';
import UpdateButton from "./UpdateButton";
import SimpleTable from "./table";
import SearchBar from "./seach";
import ComposedTextField from "./addUser";
import SignIn from "./login";



function App() {
    const [pass, setPass] = React.useState(false);


    if (!pass) {
        return (<SignIn pass={pass} setPass={setPass}/>)
    } else{
        return (
            <div className="App">
                {/*<UpdateButton setTime={setTime}/>*/}
                <SearchBar/>
                <ComposedTextField/>
                <SimpleTable/>
            </div>
        );
    }

}

export default App;
