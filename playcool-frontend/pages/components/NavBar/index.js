import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import './NavBar.css';
import PersonIcon from '@mui/icons-material/Person';
import playCoolLogo from '../../statics/playCoolLogo.png';
import Image from 'next/image';
const NavBar = () => {
    return (
        <AppBar  position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' , zIndex: "10", position: 'absolute'}}>
            <Toolbar className="toolbar">
                <Image src={playCoolLogo} alt="PlayCool Logo" width={150} height={50} />
                <div className="navItems">
                    <Link href="/events" passHref>
                        <Button className="navButton" sx={{'color' :'white'}}>Vote Song List</Button>
                    </Link>
                    <Link href="/my-tickets" passHref>
                        <Button className="navButton" sx={{'color' :'white'}}>My Ticket</Button>
                    </Link>
                </div>
                <Button variant="outlined" startIcon={<PersonIcon />}>
                    Login / Register
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;