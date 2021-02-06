import React, {useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Card, Form, Alert, Container} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const history = useHistory();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            setLoading(true);
            setError('');
            await login(emailRef.current.value,passwordRef.current.value);
            history.push("/");
        }catch (error){
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
                    <Button theme="light" onClick={handleOpen}>Sign In</Button>
                </NavItem>
            </Navbar>

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
                    <Container className='d-flex align-items-center justify-content-center' style={{minHeight:"100vh"}}>
                        <div className='w-100' style={{maxWidth:"400px"}}>
                            <Card>
                                <Card.Body>
                                    <h2 className='text-center mb-4'>Log in</h2>
                                    {error? <Alert variant='danger'>{JSON.stringify(error)}</Alert>:""}
                                    <Form onSubmit={handleSubmit}>

                                        <Form.Group id='email'>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control ref = {emailRef} type='email' required />
                                        </Form.Group>
                                        <Form.Group id='password'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control ref = {passwordRef} type='password' required />
                                        </Form.Group>

                                        <Button disabled={loading} className='w-100' type='submit'>Log In</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                            <div className='w-100 text-center mt-2'>
                                Don't Have an Account?<Link to='/signup'>Sign Up!</Link>
                            </div>
                        </div>
                    </Container>
                </Fade>
            </Modal>
        </div>
    )
}

export default Navibar;