import { useContext, useState } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { Box, Modal } from "@mui/material";
import NavBar from "../src/components/NavBar";
import Banner from "../src/components/Banner";

import Login from "../src/components/Login";
import Footer from "@/src/components/Footer";
import ConcertList from "@/src/components/ConcertList";
import VotePoster from "@/src/components/VotePoster";
import OrderDetail from "@/src/components/OrderDetail";
import CarouselUI from "@/src/components/Carousel";

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
      {/* <ConcertList /> */}
      <VotePoster />
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
