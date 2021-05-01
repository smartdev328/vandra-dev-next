import Head from 'next/head';
// import 'bootstrap/dist/css/bootstrap.css'
import '../styles/global.scss';
import '../styles/app.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
