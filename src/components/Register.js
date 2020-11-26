import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Container, Button, CssBaseline, TextField, Typography, Select, MenuItem, InputLabel } from '@material-ui/core';
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
    const [firstName, setFirstName] = useState('Charlie');
    const [lastName, setLastName] = useState('Rao');
    const [email, setEmail] = useState('Charlie@qq.com');
    const [phone, setPhone] = useState('111-222-3333');
    const [username, setUsername] = useState('JavaScript Json');
    const [password, setPassword] = useState('123456789');
    const [admin, setAdmin] = useState("false");
    let recaptcha = null;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (recaptcha) {
            recaptcha.execute(reCAPTCHA_site_key, { action: 'register' })
                .then((captcha) => {
                    handleRegister(captcha)
                });
        }

    }

    const handleRegister = (captcha) => {
        let data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            username: username,
            password: password,
            admin: admin,
            captcha: captcha
        }
        fetch('http://localhost:8000/auth/employee/register', {
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
                        Register
                    </Typography>
                </div>
                <div className={classes.form}>
                    <form>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth

                            id="firstName"
                            label="First Name"
                            name="firstName"

                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth

                            id="lastName"
                            label="Last Name"
                            name="lastName"

                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth

                            id="email"
                            label="Email"
                            name="email"
                            type="email"

                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth

                            id="phone"
                            label="Phone"
                            name="phone"
                            type="tel"

                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
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
                        <InputLabel id="type-label">Admin</InputLabel>
                        <Select
                            labelId="type-label"
                            id="admin"
                            value={admin}
                            onChange={(event) => setAdmin(event.target.value)}
                        >
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false" selected>No</MenuItem>
                        </Select>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                        <Link to="/" variant="body2">
                            {"Already have an account? Log in"}
                        </Link>
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
