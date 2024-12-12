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
        }}>
            <Toolbar className={styles.toolbar} style={{padding: '0px'}}>
                <Link href="/" passHref>
                    <Image src={playCoolLogo} alt="PlayCool Logo"
                           style={{ margin: "10px", minHeight: 20, midWidth: 250}}/>
                </Link>
                <div className={styles.navItems}>
                    <Link href="/song-list" passHref>
                        <Button className={styles.navButton} sx={{color: "white",
                            ":hover": {
                                scale: 1.2,
                            }}}>Song List</Button>
                    </Link>
                    <Link href="/concert" passHref>
                        <Button className={styles.navButton} sx={{color: "white",
                        ":hover": {
                            scale: 1.2,
                        }
                        }} >Concert</Button>
                    </Link>

                </div>
                {user ? (
                    <div>
                        <AccountMenu/>
                    </div>
                ) : (
                    <Button
                        variant="outlined"
                        startIcon={<PersonIcon/>}
                        onClick={handleOpen}
                        sx={{
                            marginRight: "25px",
                            marginLeft: "16px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            minWidth: "200px"
                        }}
                    >
                        Login / Register
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
