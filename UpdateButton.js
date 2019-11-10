import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    display: 'none',
    [theme.breakpoints.up('sm')]: {
        display: 'block',
    },
}));


export default function UpdateButton({fetchData, setFetchData}) {
    const [time, setTime] = React.useState(new Date());

    const classes = useStyles();

    const handleButtonClick = () => {
        setTime(new Date());
        setFetchData(fetchData+1);
    };

    return (
        <div>
            <Button variant="contained" className={classes.button} onClick={handleButtonClick}>
                Update
            </Button>
            <Typography className={classes.title} variant='body2' noWrap>
                Last Updated: {time.toString()}
            </Typography>
        </div>

    );
};
