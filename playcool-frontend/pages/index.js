import { useContext, useState } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { Box, Modal } from "@mui/material";
import NavBar from "../src/components/NavBar";
import Banner from "../src/components/Banner";

import LoginPage from "../src/components/Login";
import Footer from "@/src/components/Footer";
import ConcertList from "@/src/components/ConcertList";
import VotePoster from "@/src/components/VotePoster";
import OrderDetail from "@/src/components/OrderDetail";

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

{
  /*{user ? (*/
}
{
  /*  <div>*/
}
{
  /*    <p>Hello, {user.name}!</p>*/
}
{
  /*    <Button variant="contained" color="primary" onClick={logout}>*/
}
{
  /*      Logout*/
}
{
  /*    </Button>*/
}
{
  /*  </div>*/
}
{
  /*) : (*/
}
{
  /*  <div>*/
}
{
  /*    <Link href="/login">*/
}
{
  /*      <p>Login</p>*/
}
{
  /*    </Link>*/
}
{
  /*    <Link href="/register">*/
}
{
  /*      <p>Register</p>*/
}
{
  /*    </Link>*/
}
{
  /*  </div>*/
}
{
  /*)}*/
}
