import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../Components/Layout";
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>dealing </title>
    </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

//we wrap all application in layouts
// so in layout.js so each indiviual component recive in chindren as a props and show after  <Navbar>


// amma aapde inidviual component recive karie and return karie
// _app aa name ni badlay.

/**
 import '../styles/globals.css'
 funtion MyApp({Component,pageProps})
 {
   return <Component  {...pageProps} />
  }
 }
 export default MyApp
 */