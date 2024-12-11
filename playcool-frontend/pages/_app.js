import { AuthProvider } from "../src/context/AuthContext";
import "../styles/globals.css";
import Layout from '../src/components/Layout';

function MyApp({ Component, pageProps }) {
    const styles ={
        
    }
  return (
      <AuthProvider>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </AuthProvider>
  );
}

export default MyApp;
