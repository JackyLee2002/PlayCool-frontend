import React from 'react';
import AppBar from '@mui/material/AppBar';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from './NavBar.module.css';
import PersonIcon from '@mui/icons-material/Person';
import playCoolLogo from '../../../pages/statics/playCoolLogo.png';
import Image from 'next/image';
import AccountMenu from "@/src/components/AccountMenu";


const NavBar = ({handleOpen}) => {
    const {user} = useContext(AuthContext);
    return (
        <AppBar position="static"
                style={{backgroundColor: 'transparent', boxShadow: 'none', zIndex: "10", position: 'absolute'}}>
            <Toolbar className={styles.toolbar}>
                <Link href="/" passHref>
                    <Image src={playCoolLogo} alt="PlayCool Logo" width={150} height={50}/>
                </Link>
                <div className={styles.navItems}>
                    <Link href="/song-list" passHref>
                        <Button className={styles.navButton} sx={{ 'color': 'white' }}>Song List</Button>
                    </Link>
                    <Link href="/my-tickets" passHref>
                        <Button className={styles.navButton} sx={{'color': 'white'}}>My Ticket</Button>
                    </Link>
                    <Link href="/create-order" passHref>
                        <Button className={styles.navButton} sx={{'color': 'white'}}>Create Order</Button>
                    </Link>
                    <Link href="/testing" passHref>
                        <Button className={styles.navButton} sx={{'color': 'white'}}>Testing</Button>
                    </Link>
                </div>
                {user ? (
                    <div>
                        <AccountMenu/>
                    </div>) : (

                    <Button variant="outlined" startIcon={<PersonIcon/>} onClick={handleOpen}>
                        Login / Register
                    </Button>)}

            </Toolbar>
        </AppBar>
    );
};

export default NavBar;