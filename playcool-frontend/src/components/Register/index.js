// pages/register.js
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import Link from "next/link";

const RegisterPage = () => {
  const { register, error } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, email, password);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Music of the SPHERES World Tour
        </Typography>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        <Link href="/components/login">
          <Button color="secondary" sx={{ mt: 2 }}>
            Already have an account? Login
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default RegisterPage;
