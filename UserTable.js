import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {socket} from "./socket";


const useStyles = makeStyles({
    root: {
        width: '50%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

export default function UserTable({setUsers, updateUser}) {
    const classes = useStyles();

    const [users, getUsers] = React.useState(null);

    React.useEffect(() => {
        fetch(socket+'get_all_users')
            .then(res => res.json())
            .then(json => {
                getUsers(json['users'])
                setUsers(json['users'])
            })
            .catch(e => console.log(e))

    }, [updateUser]);


    return (
        <div>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="username table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align="center">DoorID</TableCell>
                            <TableCell align="center">UserID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map(user => (
                            <TableRow key={user['UserID']+user['DoorID']+user['Name']}>
                                <TableCell align="center">{user['Name']}</TableCell>
                                <TableCell align="center">{user['DoorID']}</TableCell>
                                <TableCell align="center">{user['UserID']}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>)
}