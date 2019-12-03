import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {socket} from "./socket";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles({
    root: {
        width: '50%',
        float: 'right',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

export default function DoorIP({setUsers, updateUser}) {
    const classes = useStyles();

    const [table, setTable] = React.useState(null);
    const [refresh, setRefresh] = React.useState(0);

    React.useEffect(() => {
        fetch(socket+'get_all_doors')
            .then(res => res.json())
            .then(json => {
                setTable(json['doors'])
            })
            .catch(e => console.log(e))

    }, [updateUser, refresh]);


    return (
            <Paper className={classes.root}>
                <Button variant="contained" className={classes.button} onClick={() => setRefresh(refresh+1)}>Update</Button>
                <Table className={classes.table} aria-label="username table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">DoorID</TableCell>
                            <TableCell align="center">IP</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table && table.map(e => (
                            <TableRow key={e['DoorID']+e['ip_address']}>
                                <TableCell align="center">{e['DoorID']}</TableCell>
                                <TableCell align="center">{e['ip_address']}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
    )
}