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
import {socket} from "./socket";
import Button from '@material-ui/core/Button';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';


const useStyles = makeStyles({
    root: {
        // width: '50%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});


export default function RecordTable({users}) {
    const classes = useStyles();

    const [fetchData, setFetchData] = React.useState(0);
    const [records, setRecords] = React.useState(null);

    React.useEffect(() => {
        fetch(socket + 'get_all_records')
            .then(response => response.json())
            .then(json => {
                let record = json['record'];
                if (record) record = record.reverse();
                setRecords(record);
            })
            .catch(error => console.log(error));
    }, [fetchData]);


    const retrieveName = (userid, doorid) => {
        // console.log(users)
        if (users && users.length > 0){
            const user = users.find(d => d['UserID'] === userid && d['DoorID'] === doorid);
            if (userid === 5 && doorid === 100){
                console.log(users, userid, doorid)
                console.log(user)
            }
            if (user === undefined) {
                return 'Unknown';
            } else{
                return user['Name'];
            }
        }

        return 'Unknown';
    };

    // name is the userid
    const handleDelete = (doorid, name) => {
        fetch(socket + 'handle_delete_record?door_id='+doorid+'&name='+name)
            .then(res => console.log(res))
    };

    return (
        <div>
            <UpdateButton fetchData={fetchData} setFetchData={setFetchData}/>
            {/*<button onClick={() => {setFetchData(fetchData+1)}}>update</button>*/}
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">DoorID</TableCell>
                            <TableCell align='center'>UserID</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Permission</TableCell>
                            <TableCell align="center">Image</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records && records.map(record => (
                            <TableRow key={record.Time}>
                                <TableCell component="th" scope="row" padding="checkbox">
                                    <Button
                                        // variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={<HighlightOffSharpIcon/>}
                                        onClick={() => console.log('clicked')}
                                    />
                                    {retrieveName(record['UserID'], record['DoorID'])}
                                </TableCell>
                                <TableCell align="center">{record.DoorID}</TableCell>
                                <TableCell align="center">{record['UserID']}</TableCell>
                                <TableCell align="center">{record.Date}</TableCell>
                                <TableCell align="center">{record.Time}</TableCell>
                                <TableCell align="center">{record.AccessGranted ? 'Granted' : 'Not Granted'}</TableCell>
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