import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../contexts/auth/AuthProvider";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css"
        ></link>
      </Head>
      <AuthProvider>
        <Navbar />
        <Toaster />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
