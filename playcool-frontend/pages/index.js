import {useContext, useState} from "react";
import {AuthContext} from "../src/context/AuthContext";
import {Box, Modal} from "@mui/material";
import NavBar from '../src/components/NavBar';
import Banner from "../src/components/Banner";
import LoginPage from '../src/components/login';
import Footer from "@/src/components/Footer";
import ConcertList from "@/src/components/ConcertList";

export default function MainPage() {
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <NavBar handleOpen={handleOpen} />
            <Banner />
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ ...modalStyle }}>
                    <LoginPage />
                </Box>
            </Modal>
            <ConcertList />
            <Footer />
        </div>

    );
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    boxShadow: 24,
    p: 4,
};

{/*{user ? (*/}
{/*  <div>*/}
{/*    <p>Hello, {user.name}!</p>*/}
{/*    <Button variant="contained" color="primary" onClick={logout}>*/}
{/*      Logout*/}
{/*    </Button>*/}
{/*  </div>*/}
{/*) : (*/}
{/*  <div>*/}
{/*    <Link href="/login">*/}
{/*      <p>Login</p>*/}
{/*    </Link>*/}
{/*    <Link href="/register">*/}
{/*      <p>Register</p>*/}
{/*    </Link>*/}
{/*  </div>*/}
{/*)}*/}