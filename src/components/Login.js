import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Container, Button, CssBaseline, TextField, Typography } from '@material-ui/core';
import Recaptcha from 'react-google-invisible-recaptcha';
import { AuthContext } from '../App';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}
)
);

export default () => {
    const classes = useStyles();
    const { dispatch } = useContext(AuthContext);
    const initialState = {
        username: 'JavaScript Json',
        password: '123456789',
        isSubmitting: false,
        errorMessage: null,
        reCAPTCHA_site_key: '6LcaKtIZAAAAAK6RCXm1AoJfpgWNWo7wUzwzUZA-'
    }

    const [data, setData] = useState(initialState);
    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }


    let recaptcha = null;
    const handleSubmit = (event) => {
        event.preventDefault();

        if (data.username === "" || data.password === "")
            return window.alert("Please fill the form!");

        if (recaptcha) {
            recaptcha.execute(data.reCAPTCHA_site_key, { action: 'login' })
                .then((captcha) => {
                    handleLogin(captcha)
                });
        }

    }

    const handleLogin = (captcha) => {
        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        });

        fetch('http://localhost:8000/auth/employee/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                username: data.username,
                password: data.password,
                captcha: captcha
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.message) {
                    return setData({
                        ...data,
                        isSubmitting: false,
                        errorMessage: response.message
                    });
                }

                dispatch({
                    type: "LOGIN",
                    payload: {
                        user: data.username,
                        access_token: response.access_token,
                        refresh_token: response.refresh_token
                    }
                })
            })
            .catch(error => setData({
                ...data,
                isSubmitting: false,
                errorMessage: error.message || error.statusText
            })
            );
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <CssBaseline />
                <div>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                </div>
                <div className={classes.form}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth

                            id="username"
                            label="User Name"
                            name="username"

                            value={data.username}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth

                            name="password"
                            label="Password"
                            type="password"
                            id="password"

                            value={data.password}
                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={data.isSubmitting}
                        >
                            {data.isSubmitting ? (
                                "Loading..."
                            ) : (
                                    "Login"
                                )}
                        </Button>
                        <Link to="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </form>
                    {data.errorMessage && (
                        <Typography className="form-error">{data.errorMessage}</Typography>
                    )}
                </div>
            </div>
            <Recaptcha
                ref={ref => recaptcha = ref}
                sitekey={data.reCAPTCHA_site_key}
                onResolved={() => console.log('Human detected.')}
            />
        </Container>
    )
}
