import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../contexts/auth/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Toaster />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
