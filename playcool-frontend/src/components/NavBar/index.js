import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import { AuthContext } from "../../context/AuthContext";
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from './NavBar.module.css';
import PersonIcon from '@mui/icons-material/Person';
import playCoolLogo from '../../../pages/statics/playCoolLogo.png';
import Image from 'next/image';
import AccountMenu from "@/src/components/AccountMenu";
import useMediaQuery from '@mui/material/useMediaQuery';

const NavBar = ({ handleOpen }) => {
    const { user } = useContext(AuthContext);
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <AppBar position="relative" style={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            zIndex: "1000",
            height: '50px',
        }}>

            <Toolbar className={styles.toolbar} style={{ padding: '0px' }}>
                {!isMobile && <Link href="/" passHref>
                    <Image src={playCoolLogo} alt="PlayCool Logo"
                           style={{margin: "10px", minHeight: 20, maxHeight: 30, maxWidth: '100px', minWidth: isMobile ? "100px" : "150px"}}/>

                </Link>}
                <div className={styles.navItems} style={{ marginLeft: isMobile ? 'auto' : '60%' }}>
                    <Link href="/song-list" passHref>
                        <Button className={styles.navButton} sx={{
                            color: "white",
                            ":hover": {
                                scale: 1.2,
                            }
                        }}>Song List</Button>
                    </Link>
                    <Link href="/concert" passHref>
                        <Button className={styles.navButton} sx={{
                            color: "white",
                            ":hover": {
                                scale: 1.2,
                            }
                        }}>Concert</Button>
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
                       
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            minWidth: isMobile ? "50px" : "200px"
                        }}
                    >
                        {!isMobile ? "Login / Register" : "Login"}
                    </Button>
                )}

            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
