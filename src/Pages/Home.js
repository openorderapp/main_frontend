import React, { useContext, useReducer, useEffect } from 'react'
import { AuthContext } from "./App";
import { Container, AppBar, Toolbar, Avatar, Button, Typography, Grid, makeStyles } from '@material-ui/core';
import SERVICE_PATH from '../config/API_URL';

const useStyles = makeStyles((theme) => ({

}));


export default (props) => {
    const classes = useStyles();
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

    useEffect(() => {
        if (!authState.user) {
            return props.history.push('/');
        }
    }, [authState.access_token]);

    const handleLogout = () => {
        fetch(SERVICE_PATH.LOGOUT, {
            headers: {
                Authorization: `Bearer ${authState.access_token}`
            },
            method: 'delete',
            body: JSON.stringify({
                refresh_token: authState.refresh_token
            })
        })
            .then(response => {
                console.log(response);
                authDispatch({
                    type: "LOGOUT"
                });
                return props.history.push('/');
            })
            .catch(error => {
                window.alert(error);
            });
    }

    return (
        <React.Fragment>
            <Container >
                <AppBar id="navigation" position="static" >
                    <Toolbar>
                        <Typography href="#" variant="h6" >
                            Open Order App
                        </Typography>
                        {authState.isAuthenticated && (
                            <>
                                <Avatar alt={authState.user} ></Avatar>
                                <Button variant="contained" color="primary" onClick={handleLogout}>LOG OUT</Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </Container>
            <Container className="home">
                You are here
            </Container>
        </React.Fragment>
    )
}

/*
<Container className={classes.root}>
                <AppBar id="navigation" position="static" >
                    <Toolbar>
                        <Typography href="#" variant="h6" className={classes.navTitle}>
                            Open Order App
                        </Typography>
                        {authState.isAuthenticated && (
                            <>
                                <Avatar alt={authState.user} className={classes.icon}></Avatar>
                                <Button variant="contained" color="primary" onClick={handleLogout}>LOG OUT</Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </Container>
            <Container className="home">
                You are here
            </Container>



dispatch({
            type: "FETCH_REQUEST"
        });
        fetch("http://localhost:8000/work_orders", {
            headers: {
                Authorization: `Bearer ${authState.access_token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: "FETCH_SUCCESS",
                    payload: response
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: "FETCH_FAILURE"
                });
            });


{state.isFetching ? (
                    <Typography className={classes.title}>LOADING...</Typography>
                ) : state.hasError ? (
                    <Typography className={classes.title}>AN ERROR HAS OCCURED</Typography>
                ) : (
                            <>
                                <Typography className={classes.title}>Work Order List</Typography>
                                <Grid container spacing={4}>
                                    {state.work_orders.length > 0 &&
                                        state.work_orders.map(work_order => (
                                            <Grid item xs={12} sm={4} key={work_order.work_order_id.toString()}>
                                                <OrderCard work_order={work_order} />
                                            </Grid>
                                        ))}
                                </Grid>
                            </>
                        )}


 */
