import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/navbar/Navbar";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
