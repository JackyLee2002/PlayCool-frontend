import { useContext, useState } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { Box, Modal } from "@mui/material";
import NavBar from "../src/components/NavBar";
import Banner from "../src/components/Banner";
import RankingPreview from '../src/components/RankingPreview';

import Login from "../src/components/Login";
import Footer from "@/src/components/Footer";
import ConcertList from "@/src/components/ConcertList";
import VotePoster from "@/src/components/VotePoster";
import OrderDetail from "@/src/components/OrderDetail";

export default function MainPage() {
  const [open, setOpen] = useState(false);
  const { loginOpen, openLogin } = useContext(AuthContext);

  const sampleRankings = [
    { title: 'Song 1', artist: 'Artist 1', coverImage: 'https://via.placeholder.com/150' },
    { title: 'Song 2', artist: 'Artist 2', coverImage: 'https://via.placeholder.com/150' },
    // Add more items as needed
  ];
  const handleOpen = () => {
    setOpen(true);
    openLogin();
  };
  const handleClose = () => setOpen(false);

  return (
    <div >
      <Banner />
      {/* <ConcertList /> */}
      <RankingPreview rankings={sampleRankings} />
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
