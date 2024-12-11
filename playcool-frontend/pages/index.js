import { useContext, useState } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { Box, Modal } from "@mui/material";
import NavBar from "../src/components/NavBar";
import Banner from "../src/components/Banner";
import VideoMediaGroup from '../src/components/VideoMediaGroup';
import VotePoster from "@/src/components/VotePoster";
import '../styles/globals.css'; // Adjust the path as needed

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
        <Banner />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <VideoMediaGroup />
        </Box>
        <VotePoster />
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