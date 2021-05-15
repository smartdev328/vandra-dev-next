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

function MyApp({ Component, pageProps }) {
  useEffect(() => TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTMID }), []);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="/fonts/OperatorMono/fontface.css" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
