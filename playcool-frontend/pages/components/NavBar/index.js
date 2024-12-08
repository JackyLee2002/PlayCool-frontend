import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from './NavBar.css';

const NavBar = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Toolbar className="toolbar">
                <Typography variant="h6" className="logo">
                    Word-like Logo
                </Typography>
                <div className="navItems">
                    <Link href="/events" passHref>
                        <Button className="navButton">Vote Song List</Button>
                    </Link>
                    <Link href="/my-tickets" passHref>
                        <Button className="navButton">My Ticket</Button>
                    </Link>
                </div>
                <Button className="loginButton">Login/Register</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;