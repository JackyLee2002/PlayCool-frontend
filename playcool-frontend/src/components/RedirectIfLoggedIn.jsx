import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import { Box, Typography, CircularProgress } from "@mui/material";

const RedirectIfLoggedIn = (WrappedComponent) => {
  const WithRedirect = (props) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [counter, setCounter] = useState(5);

    useEffect(() => {
      if (user) {
        const timer = setInterval(() => {
          setCounter((prevCounter) => prevCounter - 1);
        }, 1000);

        if (counter === 0) {
          clearInterval(timer);
          router.push("/");
        }

        return () => clearInterval(timer);
      }
    }, [user, counter, router]);

    if (user) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <CircularProgress />
          <Typography variant="h6" align="center" marginTop={2}>
            You are already logged in. Redirecting in {counter} seconds...
          </Typography>
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithRedirect.displayName = `RedirectIfLoggedIn(${getDisplayName(
    WrappedComponent
  )})`;

  return WithRedirect;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default RedirectIfLoggedIn;
