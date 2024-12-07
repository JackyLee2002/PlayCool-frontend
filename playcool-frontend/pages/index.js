import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";
import Link from "next/link";
import { Button } from "@mui/material";

export default function MainPage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      {user ? (
        <div>
          <p>Hello, {user.name}!</p>
          <Button variant="contained" color="primary" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Link href="/login">
            <p>Login</p>
          </Link>
          <Link href="/register">
            <p>Register</p>
          </Link>
        </div>
      )}
    </div>
  );
}
