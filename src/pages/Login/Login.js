import React, { useState } from 'react';
import { makeStyles, Container, Button, CssBaseline, TextField, Typography } from '@material-ui/core';
import Recaptcha from 'react-google-invisible-recaptcha';

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
    const reCAPTCHA_site_key = '6LcaKtIZAAAAAK6RCXm1AoJfpgWNWo7wUzwzUZA-';
    const [username, setUsername] = useState('JavaScript Json');
    const [password, setPassword] = useState('123456789');
    let recaptcha = null;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (recaptcha) {
            recaptcha.execute(reCAPTCHA_site_key, { action: 'login' })
                .then((captcha) => {
                    handleLogin(captcha)
                });
        }

    }

    const handleLogin = (captcha) => {
        let data = {
            username: username,
            password: password,
            captcha: captcha
        }

        fetch('http://localhost:8080/auth/employee/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(text => showResult(text))
            .catch(error => showResult(error));
    }

    const showResult = (text) => {
        window.alert(text);
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
                    <form>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth

                            id="username"
                            label="User Name"
                            name="username"

                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
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

                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Log In
                        </Button>
                    </form>
                </div>
            </div>
            <Recaptcha
                ref={ref => recaptcha = ref}
                sitekey={reCAPTCHA_site_key}
                onResolved={() => console.log('Human detected.')}
            />
        </Container>
    )
}
