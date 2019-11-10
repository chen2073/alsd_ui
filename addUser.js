import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const socket = 'http://192.168.0.101:5000/';


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
    }


    return (
        <div className={classes.container}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">DoorID</InputLabel>
                <Input defaultValue={''} value={state.door} onChange={event => {setState({...state, door:event.target.value})}} />
                <FormHelperText>Enter a DoorId</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="component-simple">IP</InputLabel>
                <Input defaultValue={''} value={state.ip} onChange={event => {setState({...state, ip:event.target.value})}} />
                <FormHelperText>Enter an IP Address</FormHelperText>
            </FormControl>
            <Button variant="contained" className={classes.button} onClick={submitAction}>
                Map Door to IP
            </Button>
        </div>
    );

};


export default function ComposedTextField() {
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [name, setName] = React.useState('');
    const [id, setId] = React.useState('');
    const labelRef = React.useRef(null);
    const classes = useStyles();


    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.background}>
                <Toolbar>
                    {/*<div className={classes.container}>*/}
                    {/*    <FormControl className={classes.formControl}>*/}
                    {/*        <InputLabel htmlFor="component-simple">Name</InputLabel>*/}
                    {/*        <Input id="name" value={name} onChange={event => {setName(event.target.value);}} />*/}
                    {/*        <FormHelperText>Enter a name</FormHelperText>*/}
                    {/*    </FormControl>*/}
                    {/*    <FormControl className={classes.formControl}>*/}
                    {/*        <InputLabel htmlFor="component-simple">UserID</InputLabel>*/}
                    {/*        <Input id="id" value={id} onChange={event => {setId(event.target.value);}} />*/}
                    {/*        <FormHelperText>Enter a id</FormHelperText>*/}
                    {/*    </FormControl>*/}
                    {/*    <Button variant="contained" className={classes.button}>*/}
                    {/*        Add User*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                    <AddDoorIP/>
                    <Button variant="contained" className={classes.button} onClick={() => {fetch(socket + 'delete_all_doors')}}>
                        Clear DoorIP
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
