import { useEffect } from 'react';
import Head from 'next/head';
import TagManager from 'react-gtm-module';
import '../styles/global.scss';
import '../styles/app.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config, library } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import {
  faGithub,
  faFacebook,
  faInstagram,
  faYoutube,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
library.add(faGithub, faFacebook, faInstagram, faYoutube, faLinkedinIn);
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if(!router.query.noscript) {
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTMID })
    }
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link
          rel="preload"
          href="/fonts/OperatorMono/OperatorMonoBook.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link
          rel="preload"
          href="/fonts/OperatorMono/OperatorMonoBold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link href="/fonts/OperatorMono/fontface.css" rel="stylesheet" /> */}
        {/* <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.facebook.com" /> */}
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
