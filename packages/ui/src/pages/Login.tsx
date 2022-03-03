import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

import { Button, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { classicNameResolver } from "typescript";

const useStyles = makeStyles({
    root: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        backgroundColor: '#283ad9'
    },
    panelLeft: {
        width: '50%',
        background: 'url(https://images.pexels.com/photos/3206080/pexels-photo-3206080.jpeg?cs=srgb&dl=pexels-cottonbro-3206080.jpg&fm=jpg) no-repeat center center/cover',
    },
    panelRight: {
        width: '50%'
    },
    form: {
        position: 'relative',
        height: 320,
        width: 240,
        padding: 16
    },
    title: {
        marginBottom: 8
    },
    input: {
        margin: '8px 0'
    },
    submit: {
        position: 'absolute',
        bottom: 16,
        width: 240
    }
})

const LoginPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location:any = useLocation();
    const auth = useAuth();

    
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const from = location.state?.from.pathname || '/';

    const handleChange = (e:any) => {
        const { name, value } = e.target;

        setUser(user => ({
            ...user,
            [name]: value
        }));
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        auth.signin(user, async () => {
            console.log('signin');
            navigate(from, { replace: true });
        });
    }

    return (
        <div className={classes.root}>
            <div className={classes.panelLeft}></div>
            <div className={classes.panelRight}>
                <div style={{
                    display: 'flex',
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Paper
                        className={classes.form}
                        elevation={2}
                    >
                        <form
                            name="login-form"
                            style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            onSubmit={handleSubmit}
                        >
                            <Typography
                                className={classes.title}
                                variant="h3"
                            >
                                Login
                            </Typography>
                            <TextField
                                className={classes.input}
                                label="Email"
                                name="email"
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                className={classes.input}
                                label="Password"
                                name="password"
                                onChange={handleChange}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                className={classes.submit}
                                variant="outlined"
                            >
                                Login
                            </Button>
                        </form>
                        {/* {error && (
                            <div>
                                <span>Error: {error.name}</span>
                                <br />
                                <span>
                                    {error.message}
                                </span>
                                <Button
                                    onClick={() => reset()}
                                >
                                    Dismiss
                                </Button>
                            </div>
                        )} */}
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;