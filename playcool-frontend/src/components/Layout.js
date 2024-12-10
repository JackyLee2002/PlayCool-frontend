import React, {useContext, useState} from 'react';
import NavBar from './NavBar';
import {AuthContext} from "@/src/context/AuthContext";
import {Box, Modal} from "@mui/material";
import LoginPage from "@/src/components/Login";
import Footer from "@/src/components/Footer";

const Layout = ({ children }) => {
    const [open, setOpen] = useState(false);
    const { loginOpen, openLogin } = useContext(AuthContext);

    const handleOpen = () => {
        setOpen(true);
        openLogin();
    };
    const handleClose = () => setOpen(false);

    return (
        <div>
            <NavBar handleOpen={handleOpen} />
            <Modal open={open && loginOpen} onClose={handleClose}>
                <Box sx={{ ...modalStyle }}>
                    <LoginPage />
                </Box>
            </Modal>
            {children}
            <Footer />
        </div>
    );
};

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    boxShadow: 10,
    p: 3
};

export default Layout;