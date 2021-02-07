import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Card, Form, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    Navbar,
    NavbarBrand,
    Nav,
    Button,
    NavItem,
    NavLink
} from "shards-react";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Navibar = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [ShowSignIn, setShowSignIn] = React.useState(true);
    const [IsSignedIn, setIsSignedIn] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuth();
    const { login } = useAuth();
    const history = useHistory();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');
            await login(emailRef.current.value, passwordRef.current.value).then(() => {
                setIsSignedIn(true)
            });
            history.push("/");
        } catch (error) {
            setError(error)
        }
        setLoading(false);
    }

    const SignUpSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match!');
        }
        try {
            setLoading(true);
            setError('');
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch (error) {
            setError(error)
        }
        setLoading(false);
    }

    return (
        <div>
            <Navbar type="dark" theme="primary" expand="md">
                <NavbarBrand>THE BOOKSHELF</NavbarBrand>
                <div style={{ flex: 'auto' }} />
                <NavItem>
                    {IsSignedIn ? <div>
                        <Button theme="light">profile</Button>
                    </div> : <div>
                            <Button theme="light" onClick={handleOpen}>Sign In</Button>
                        </div>}

                </NavItem>
            </Navbar>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "20vh", width: "400px", padding: 0 }}>
                            {ShowSignIn ? <div className='w-100' style={{ maxWidth: "400px" }}>
                                <Card>
                                    <Card.Body>
                                        <h2 className='text-center mb-4'>Log in</h2>
                                        {error ? <Alert variant='danger'>{JSON.stringify(error)}</Alert> : ""}
                                        <Form onSubmit={handleSubmit}>

                                            <Form.Group id='email'>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control ref={emailRef} type='email' required />
                                            </Form.Group>
                                            <Form.Group id='password'>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control ref={passwordRef} type='password' required />
                                            </Form.Group>

                                            <Button disabled={loading} className='w-100' type='submit'>Log In</Button>
                                        </Form>
                                        <div className='w-100 text-center mt-2'>
                                            Don't Have an Account?<Button style={{ color: "#007BFF", padding: "0 5px 0 5px", backgroundColor: "white", border: 0 }}
                                                onClick={() => {
                                                    setShowSignIn(false)
                                                }}>SignUp</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div> : <div className='w-100' style={{ maxWidth: "400px" }}>
                                    <Card>
                                        <Card.Body>
                                            <h2 className='text-center mb-4'>Sign Up</h2>
                                            {error ? <Alert variant='danger'>{JSON.stringify(error)}</Alert> : ""}
                                            <Form onSubmit={SignUpSubmit}>
                                                <Form.Group id='name'>
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control ref={nameRef} type='text' required />
                                                </Form.Group>
                                                <Form.Group id='email'>
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control ref={emailRef} type='email' required />
                                                </Form.Group>
                                                <Form.Group id='password'>
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control ref={passwordRef} type='password' required />
                                                </Form.Group>
                                                <Form.Group id='confirm-password'>
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control ref={confirmPasswordRef} type='password' required />
                                                </Form.Group>
                                                <Button disabled={loading} className='w-100' type='submit'>Sign Up</Button>
                                            </Form>
                                            <div className='w-100 text-center mt-2'>
                                                Already Have an Account?<Button style={{ color: "#007BFF", padding: "0 5px 0 5px", backgroundColor: "white", border: 0 }}
                                                    onClick={() => {
                                                        setShowSignIn(true)
                                                    }}>Sign In</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>}
                        </Container>
                    </Fade>
                </Modal>
            </div>
        </div>
    )
}

export default Navibar;