import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import {AuthContext} from "../../context/AuthContext";
import Toolbar from '@mui/material/Toolbar';
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
        <AppBar position="relative" style={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            zIndex: "1000",
            height: '50px',
            paddingRight: "25px"
        }}>
            <Toolbar className={styles.toolbar} style={{padding: '0px'}}>
                <Link href="/" passHref>
                    <Image src={playCoolLogo} alt="PlayCool Logo" width={150} height={50}
                           style={{ margin: "10px"}}/>
                </Link>
                <div className={styles.navItems}>
                    <Link href="/song-list" passHref>
                        <Button className={styles.navButton} sx={{color: "white"}}>Song List</Button>
                    </Link>
                    <Link href="/concert" passHref>
                        <Button className={styles.navButton} sx={{color: "white"}} >Concert</Button>
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
