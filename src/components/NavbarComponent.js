import React from 'react';
import { FaSearch } from "react-icons/fa";
import {
    Navbar,
    NavbarBrand,
    Nav,
    Button,
    NavItem,
    NavLink
} from "shards-react";

const Navibar = () => {
    return (
        <Navbar type="dark" theme="primary" expand="md">
            <NavbarBrand>THE BOOKSHELF</NavbarBrand>
            <div style={{ flex: 'auto' }} />
            <NavItem>
                <Button theme="light">Sign In</Button>
            </NavItem>
        </Navbar>
    )
}

export default Navibar;