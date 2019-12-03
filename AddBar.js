import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { socket } from './socket.js'


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    grow: {
        flexGrow: 1,
    },
    background: {
        background : '#bac8a7',
    },
}));


function AddDoorIP() {
    const classes = useStyles();
    const [state, setState] = React.useState({door:'', ip:''});

    const submitAction = () => {
        fetch(socket + 'new_door?door_id='+state.door+'&ip_address='+state.ip)
            .then(response => console.log(response));

        setState({door:'', ip:''});
        console.log(state);
    };


    return (
        <div className={classes.container}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">DoorID</InputLabel>
                <Input value={state.door} onChange={event => {setState({...state, door:event.target.value})}} />
                <FormHelperText>Enter a Door ID</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">IP</InputLabel>
                <Input value={state.ip} onChange={event => {setState({...state, ip:event.target.value})}} />
                <FormHelperText>Enter an IP Address</FormHelperText>
            </FormControl>
            <Button variant="contained" className={classes.button} onClick={submitAction}>
                Map Door to IP
            </Button>
        </div>
    );

};


function AddUserName({setUpdateUser}) {
    const classes = useStyles();
    const [state, setState] = React.useState({user:'', door:'', name:''});

    const submitAction = () => {
        fetch(socket + 'new_user_name_assignment?user_id='+state.user+'&door_id='+state.door+'&name='+state.name)
            .then(response => console.log(response));

        setUpdateUser({state: state+1});
        setState({user:'', door:'', name:''});
    };


    return (
        <div className={classes.container}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">UserID</InputLabel>
                <Input value={state.user} onChange={event => {setState({...state, user:event.target.value})}} />
                <FormHelperText>Enter a User ID</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">DoorID</InputLabel>
                <Input value={state.door} onChange={event => {setState({...state, door:event.target.value})}} />
                <FormHelperText>Enter a Door ID</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">Name</InputLabel>
                <Input value={state.name} onChange={event => {setState({...state, name:event.target.value})}} />
                <FormHelperText>Enter a Name</FormHelperText>
            </FormControl>
            <Button variant="contained" className={classes.button} onClick={submitAction}>
                Add New User
            </Button>
        </div>
    );
}

function NewUserProcess() {
    const classes = useStyles();
    const [state, setState] = React.useState({door:'', name:''});

    const submitAction = () => {
        console.log(state.door, state.name);

        fetch(socket + 'start_new_user_process'+'?door_id='+state.door+'&name='+state.name)
            .then(response => console.log(response));


        setState({door:'', name:''});
    };


    return (
        <div className={classes.container}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">DoorID</InputLabel>
                <Input value={state.door} onChange={event => {setState({...state, door:event.target.value})}} />
                <FormHelperText>Enter a Door ID</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">Name</InputLabel>
                <Input value={state.name} onChange={event => {setState({...state, name:event.target.value})}} />
                <FormHelperText>Enter a Name</FormHelperText>
            </FormControl>
            <Button variant="contained" className={classes.button} onClick={submitAction}>
                Start New User Process
            </Button>
        </div>
    );
}

function ClearUser() {
    const classes = useStyles();
    const [state, setState] = React.useState({door:'', name:''});

    const submitAction = () => {
        console.log(state.door, state.name);

        fetch(socket + 'clear_user_from_scanner?door_id='+state.door+'&name='+state.name)
            .then(response => console.log(response));


        setState({door:'', name:''});
    };


    return (
        <div className={classes.container}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">DoorID</InputLabel>
                <Input value={state.door} onChange={event => {setState({...state, door:event.target.value})}} />
                <FormHelperText>Enter a Door ID</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">Name</InputLabel>
                <Input value={state.name} onChange={event => {setState({...state, name:event.target.value})}} />
                <FormHelperText>Enter a Name</FormHelperText>
            </FormControl>
            <Button variant="contained" className={classes.button} onClick={submitAction}>
                Clear User from Door
            </Button>
        </div>
    );
}

export default function AddBar({setUpdateUser}) {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.background}>
                <Toolbar>
                    <AddDoorIP/>
                    <AddUserName setUpdateUser={setUpdateUser}/>
                    <NewUserProcess/>
                    <ClearUser/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
