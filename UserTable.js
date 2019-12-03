import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import {socket} from "./socket";
import HighlightOffSharpIcon from "@material-ui/icons/HighlightOffSharp";


const useStyles = makeStyles({
    root: {
        width: '50%',
        float: 'left',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    buttonCell: {
        padding: 5,
    }
});


function DeleteButton({doorid, name, refresh}) {

    const onClick = () => {
        fetch(socket + 'clear_user_from_scanner?door_id='+doorid+'&name='+name)
            .then(response => console.log(response));
        refresh();
    };

    return (
        <Button
            color="primary"
            startIcon={<HighlightOffSharpIcon/>}
            onClick={onClick}
        />
    )
}


export default function UserTable({setUsers, updateUser}) {
    const classes = useStyles();

    const [users, getUsers] = React.useState(null);
    const [refresh, setRefresh] = React.useState(0);

    React.useEffect(() => {
        fetch(socket+'get_all_users')
            .then(res => res.json())
            .then(json => {
                getUsers(json['users'])
                setUsers(json['users'])
            })
            .catch(e => console.log(e))

    }, [updateUser, refresh]);


    return (
            <Paper className={classes.root}>
                <Button variant="contained" className={classes.button} onClick={() => setRefresh(refresh+1)}>Update</Button>
                <Table className={classes.table} aria-label="username table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'></TableCell>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align="center">DoorID</TableCell>
                            <TableCell align="center">UserID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map(user => (
                            <TableRow key={user['UserID']+user['DoorID']+user['Name']}>
                                <TableCell>
                                    {/*<Button*/}
                                    {/*color="primary"*/}
                                    {/*className={classes.buttonCell}*/}
                                    {/*startIcon={<HighlightOffSharpIcon/>}*/}
                                    {/*user={user['DoorID']}*/}
                                    {/*name={user['Name']}*/}
                                    {/*onClick={() => console.log(this.user)}*/}
                                    {/*/>*/}
                                    <DeleteButton doorid={user['DoorID']} name={user['Name']} refresh={() => setRefresh(refresh+1)}/>
                                </TableCell>
                                <TableCell align="center">{user['Name']}</TableCell>
                                <TableCell align="center">{user['DoorID']}</TableCell>
                                <TableCell align="center">{user['UserID']}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
    )
}