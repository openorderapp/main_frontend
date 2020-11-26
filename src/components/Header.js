import React, { useContext } from 'react'
import { AppBar, Typography, Button, Avatar, Toolbar, makeStyles } from '@material-ui/core';
import { AuthContext } from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    icon: {
        margin: theme.spacing(0, 2)
    }
}));


export default function Header() {
    const classes = useStyles();
    const { state, dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        })
    }

    return (
        <div className={classes.root}>
            <AppBar id="navigation" position="static" >
                <Toolbar>
                    <Typography href="#" variant="h6" className={classes.title}>
                        Open Order App
                    </Typography>
                    {state.isAuthenticated && (
                        <>
                            <Avatar alt={state.user} className={classes.icon}></Avatar>
                            <Button variant="contained" color="primary" onClick={handleLogout}>LOG OUT</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
