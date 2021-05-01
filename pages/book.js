import Head from 'next/head';
import profile from '../config/profile';
import { useSetState } from '@ervandra/use-setstate';
import { InlineWidget } from 'react-calendly';

export default function Home() {
  const initialState = {
    isOpen: false,
  };
  const { state, setState } = useSetState(initialState);

  return (
    <div>
      <Head>
        <title>
          {profile.name} - {profile.title}
        </title>
        <link
          rel="icon"
          href={`https://via.placeholder.com/64/${
            profile.color
          }/FFFFFF?text=${profile.name.substring(0, 1)}`}
        />
        <meta name="author" content={profile.name} />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="@ervandracom" key="twhandle" />
        <meta
          property="og:image"
          content={
            profile.cover !== ''
              ? profile.cover
              : `https://via.placeholder.com/1200x628/${profile.color}/FFFFFF?text=Resume:+${profile.name}+-+${profile.title}`
          }
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content={`${profile.name} - ${profile.title}`}
          key="ogsitename"
        />
        <meta
          property="og:title"
          content={`Resume: ${profile.name} - ${profile.title}`}
          key="ogtitle"
        />
        <meta property="og:description" content={profile.about} key="ogdesc" />
      </Head>
      <div id="app-container">
        <section id="content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col">
                <div className="text-center pt-md-5 pt-3">
                  <h1 className="display-6 display-md-3 text-primary fw-bold mb-3 border-bottom d-inline-block border-3 border-danger">
                    Book your Free Strategy session now
                  </h1>
                  <InlineWidget url="https://calendly.com/ervandra/free-strategy" prefill={{}} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
