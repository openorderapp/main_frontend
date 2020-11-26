import React, { useContext, useReducer, useEffect } from 'react'
import { AuthContext } from "../App";
import { Container, Typography, Grid, makeStyles } from '@material-ui/core';
import OrderCard from './card/OrderCard';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 24,
        margin: theme.spacing(0, 2)
    }
}));

const initialState = {
    work_orders: [],
    isFetching: false,
    hasError: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                isFetching: false,
                work_orders: action.payload
            };
        case "FETCH_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false
            };
        default:
            return state;
    }
};

export default () => {
    const classes = useStyles();
    const { state: authState } = useContext(AuthContext);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
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
    }, [authState.access_token]);

    return (
        <React.Fragment>
            <Container className="home">
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
            </Container>
        </React.Fragment>
    )
}
