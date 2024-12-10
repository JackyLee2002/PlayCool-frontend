import NavBar from "@/src/components/NavBar";
import StepperBar from "@/src/components/StepperBar";
import Footer from "@/src/components/Footer";
import ConfirmOrder from "@/src/components/ConfirmOrder";
import OrderDetail from "@/src/components/OrderDetail";
import {useContext, useState} from "react";
import {AuthContext} from "@/src/context/AuthContext";
import {Box, Modal} from "@mui/material";
import LoginPage from "@/src/components/Login";

const CreateOrder = () => {
    const [open, setOpen] = useState(false);
    const { loginOpen, openLogin } = useContext(AuthContext);

    const handleOpen = () => {
        setOpen(true);
        openLogin();
    };
    const handleClose = () => setOpen(false);


    return (
        <div>
            {/*<NavBar handleOpen={handleOpen} />*/}
            {/*<Modal open={open && loginOpen} onClose={handleClose}>*/}
            {/*    <Box sx={{ ...modalStyle }}>*/}
            {/*        <LoginPage />*/}
            {/*    </Box>*/}
            {/*</Modal>*/}
            <StepperBar/>
            <OrderDetail/>
            <ConfirmOrder/>
            <Footer/>
        </div>
    );
}

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    boxShadow: 24,
    p: 4,
};

export default CreateOrder;