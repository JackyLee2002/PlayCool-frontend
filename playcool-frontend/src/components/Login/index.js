import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import  styles from "../ConcertHomePageSection/ConcertHomePageSection.module.css";

const Login = () => {
    const { login, register, error } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!username) formErrors.username = "Username is required";
        if (!password) formErrors.password = "Password is required";
        if (isRegister && !email) formErrors.email = "Email is required";

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        if (isRegister) {
            await register(username, email, password);
        } else {
            await login(username, password);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                className={styles.ConcertHomePageSection}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 4,
                    mb: 4,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "rgb(115,151,232)",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    {isRegister ? "Register" : "Login"}
                </Typography>
                {error && (
                    <Typography color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <>
                            <TextField
                                label="Email *"
                                type="email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </>
                    )}
                    <TextField
                        label="Username *"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <TextField
                        label="Password *"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{mt: 2}}
                    >
                        {isRegister ? "Register" : "Login"}
                    </Button>
                </form>
<Button color="secondary" sx={{mt: 2, textTransform: 'none', color: 'white'}}
        onClick={() => setIsRegister(!isRegister)}>
    {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
</Button>
                <div className={styles.stars} style={{zIndex: "0", pointerEvents: "none"}}>
                    {[...Array(900)].map((_, i) => (
                        <div key={i} className={styles.star} style={{
                            top: `${Math.random() * 200}%`,
                            left: `${Math.random() * 200}%`,
                            animationDuration: `${Math.random() * 2 + 1}s`
                        }}></div>
                    ))}
                </div>
            </Box>
        </Container>
    );
};

export default Login;