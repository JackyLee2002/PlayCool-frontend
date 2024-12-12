import { useContext, useState } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { Box, Modal } from "@mui/material";
import NavBar from "../src/components/NavBar";
import Banner from "../src/components/Banner";
import VideoMediaGroup from '../src/components/VideoMediaGroup';
import SouvenirSection from "../src/components/SouvenirSection";
import CarouselUI from "@/src/components/Carousel";
import SongRating from "@/src/components/SongRating";

export default function MainPage() {
    const [open, setOpen] = useState(false);
    const { loginOpen, openLogin } = useContext(AuthContext);

    const handleOpen = () => {
        setOpen(true);
        openLogin();
    };
    const handleClose = () => setOpen(false);

    return (
        <div>
            <CarouselUI />
            <Banner />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100vh', padding: 2 }}>
                <VideoMediaGroup />
                <SongRating />
            </Box>
            <SouvenirSection />
        </div>
    );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "20%",
  transform: "translate(-50%, -50%)",
  width: 700,
  boxShadow: 24,
  p: 4,
};