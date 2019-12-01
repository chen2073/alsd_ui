import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import {socket} from "./socket";


const useStyles = makeStyles(theme => ({
    background: {
        background : '#73a1b2',
    },
    grow: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },

}));


function Unlock() {
    const classes = useStyles();

    const [door, setDoor] = React.useState(0);

    const onChangeDoor = event => {
        setDoor(event.target.value);
    };

    const handleUnlock = () => {
        fetch(socket + 'unlock?door_id='+door)
            .then(response => console.log(response));
    };

    return (
        <div>
            <select value={door} onChange={onChangeDoor}>
                <option value={0}>Choose a Door</option>
                <option value={100}>Door 100</option>
                <option value={101}>Door 101</option>
            </select>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleUnlock}
            >
                Unlock
            </Button>
        </div>
    );
}

function ClearDoorFP() {
    const classes = useStyles();

    const [door, setDoor] = React.useState(0);

    return (
        <div>
            <select value={door} onChange={event => setDoor(event.target.value)}>
                <option value={0}>choose a door</option>
                <option value={100}>DoorID 100</option>
                <option value={101}>Door 101</option>
            </select>
            <Button variant='contained'
                    color="secondary"
                    className={classes.button}
                    onClick={() => fetch(socket + 'clear_door_finger_print_scanner?door_id='+door).then(res => console.log(res))}>
                Clear Door FP
            </Button>
        </div>
    )
}

export default function ButtonsBar() {
    const classes = useStyles();

    const SelectUsers = () => {
        return(
            <select>
                <option>Choose a User</option>
                <option value={1}>UserID 1</option>
                <option value={2}>UserID 2</option>
                <option value={3}>UserID 3</option>
                <option value={4}>UserID 4</option>
                <option value={5}>UserID 5</option>
            </select>
        );
    };

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.background}>
                <Toolbar>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => {fetch(socket+'delete_all_records').then(res => {console.log(res)})}}
                    >
                        Delete All Records
                    </Button>
                    <Unlock/>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        // startIcon={<SelectDoors/>}
                    >
                        Delete All USERS
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<div>
                            {/*<SelectDoors/>*/}
                            <SelectUsers/>
                            </div>}
                    >
                        Delete A USER
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<AddIcon />}
                    >
                        New Door
                    </Button>
                    <ClearDoorFP/>
                </Toolbar>
            </AppBar>
        </div>
    );
}