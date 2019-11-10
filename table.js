import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UpdateButton from "./UpdateButton";
import ModalImage from "react-modal-image";


// const socket = 'http://0.0.0.0:5000/';
const socket = 'http://192.168.0.101:5000/';


const useStyles = makeStyles({
    root: {
        // width: '50%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});


export default function SimpleTable() {
    const classes = useStyles();

    const [fetchData, setFetchData] = React.useState(0)
    const [records, setRecords] = React.useState(null);


    React.useEffect(() => {
        fetch(socket + 'get_all_records')
            .then(response => response.json())
            .then(json => {
                console.log(new Date());
                setRecords(json.record)
            })
            .catch(error => {
                console.log(error);
            });
    }, [fetchData]);


    return (
        <div>
            <UpdateButton fetchData={fetchData} setFetchData={setFetchData}/>
            <button onClick={() => {setFetchData(fetchData+1)}}>update</button>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">DoorId</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Permission</TableCell>
                            <TableCell align="center">Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records && records.map(record => (
                            <TableRow key={record.Time}>
                                <TableCell component="th" scope="row">{record.UserID}</TableCell>
                                <TableCell align="center">{record.DoorID}</TableCell>
                                <TableCell align="center">{record.Date}</TableCell>
                                <TableCell align="center">{record.Time}</TableCell>
                                <TableCell align="center">{record.AccessGranted}</TableCell>
                                {/*<TableCell align="right">{record.ImageID}</TableCell>*/}
                                <TableCell align="right">
                                    {/*<img src={socket+'get_image?image_id='+record.ImageID} height="42" width="42" alt={record.ImageID}/>*/}
                                    <div style={{ maxWidth: "100px" }}>
                                        <ModalImage
                                            small={socket+'get_image?image_id='+record.ImageID}
                                            large={socket+'get_image?image_id='+record.ImageID}
                                            alt={record.ImageID}/>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}