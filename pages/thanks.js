import Head from 'next/head';
import profile from '../config/profile';
import Modal from 'react-modal';
import { useSetState } from '@ervandra/use-setstate';

import { subscribeForm } from '../libs/apis';

export default function Home() {
  const initialState = {
    isOpen: false,
    name: '',
    email: '',
    isLoading: false,
    isError: false,
    success: false,
  };
  const { state, setState } = useSetState(initialState);
  const { isOpen, name, email, isLoading, isError, success } = state;
  const handleSubmit = async e => {
    e.preventDefault();
    setState({ isLoading: true, isError: false, success: false });
    const payload = {
      lists: process.env.NEXT_PUBLIC_KE_LIST_ID,
      email,
      full_name: name,
      tags: 'free-strategy, via-api',
    };
    await subscribeForm(payload)
      .then(resp => {
        if (resp.status === 200) {
          setState({ success: true });
        }
      })
      .catch(err => {
        console.log('errors,', err);
        setState({ isError: true });
      })
      .finally(() => setState({ isLoading: false }));
  };
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
        <div id="top" className="top-bar bg-dark py-2 shadow-sm">
          <div className="container">
            <div className="row">
              <div className="col">
                <h6 className="m-0 text-center text-light">
                  <strong className="text-warning">Attention</strong>&nbsp; Small Business Owners,
                  CEO(s), Entrepreneurs, Consultants
                </h6>
              </div>
            </div>
          </div>
        </div>
        <section id="content">
          <div id="hero" className="py-5">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h1 className="text-center mb-4 text-primary lh-sm">
                    <strong className="highlight text-primary">2021 Update!</strong> Upgrade{' '}
                    <strong>Your First (or Next) Website</strong> into{' '}
                    <strong>Sales Funnel..</strong>{' '}
                    <strong>
                      <u>Today!</u>
                    </strong>
                  </h1>
                  <h3 className="text-center text-danger">
                    <em>Trusted by 19+ companies from Indonesia, Singapore, US, and Finland!</em>
                  </h3>
                  <div className="hero-image text-center mb-3">
                    <img
                      src="https://www.ervandra.com/wp-content/uploads/2020/12/showcase-gradient.png"
                      alt=""
                    />
                  </div>
                  <div className="sponsors mb-4 text-center">
                    <img
                      src="https://www.ervandra.com/wp-content/uploads/2021/03/logo-sponsors-1024x64.png"
                      alt=""
                      style={{
                        filter: 'grayscale(100%)',
                        opacity: '0.5',
                      }}
                    />
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                      <h5 className="text-center mb-5 text-muted">
                        For 10+ years building <strong>website</strong> for{' '}
                        <strong>companies</strong> and <strong>clients</strong> (
                        <em>just like you</em>), we have found that <strong>Sales Funnel</strong> is
                        the principal key to <strong>generate</strong> more{' '}
                        <strong>profits for all of businesses!</strong>
                      </h5>
                    </div>
                  </div>

                  <div className="button-container text-center">
                    <button
                      className="btn btn-success btn-lg shadow-lg fw-bold p-3 px-5 text-uppercase text-light fs-3"
                      onClick={() => setState({ isOpen: true })}>
                      Claim Your Free Strategy Call
                    </button>
                  </div>
                  <Modal
                    isOpen={isOpen}
                    onRequestClose={() => setState({ isOpen: false })}
                    contentLabel="Modal"
                    className="reveal p-3 center small"
                    ariaHideApp={false}>
                    <div className="p-3">
                      {success ? (
                        <div className="p-0 text-center">
                          <h3 className="mb-3">Success</h3>
                          <button className="btn btn-primary">Close</button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="px-0 px-md-3">
                          <h3 className="text-center mb-3 fw-bold">
                            Fill out form below and{' '}
                            <strong className="text-success">
                              Claim Your Free Strategy Session
                            </strong>{' '}
                            Now.
                          </h3>
                          <div className="form-group mb-3">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              placeholder="Your Name:"
                              value={name}
                              disabled={isLoading}
                              onChange={e => setState({ name: e.target.value })}
                            />
                          </div>
                          <div className="form-group mb-4">
                            <input
                              type="email"
                              className="form-control form-control-lg"
                              placeholder="Your Email:"
                              required
                              disabled={isLoading}
                              value={email}
                              onChange={e => setState({ email: e.target.value })}
                            />
                          </div>
                          {isLoading ? (
                            <button
                              type="button"
                              className="btn btn-lg btn-secondary text-uppercase fw-bold shadow w-100 text-light">
                              Submitting..
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-lg btn-success text-uppercase fw-bold shadow w-100 text-light">
                              Claim Free Strategy
                            </button>
                          )}
                          <p className="mb-0 text-muted text-center mt-4">
                            Your privacy is protected
                          </p>
                        </form>
                      )}
                    </div>

                    <button
                      className="btn btn-close close-reveal"
                      onClick={() => setState({ isOpen: false })}>
                      &times;
                    </button>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <div id="top-testimony" className="py-5 bg-white bg-gradient shadow">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 col-md-auto">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src="https://www.ervandra.com/wp-content/uploads/2021/03/jussi.jpeg"
                      alt=""
                      className="img-thumbnail rounded-circle me-2"
                      width="80"
                    />
                    <div className="testimony-header">
                      <h6 className="text-primary fw-bold text-uppercase">Jussi Hurmola</h6>
                      <h6 className="mb-0 text-muted small">CEO & Founder Lifelearn Platform</h6>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-auto">
                  <div className="testimony-content text-muted p-3 bg-light bg-gradient rounded shadow border border-2 mb-0">
                    <p>
                      We decided to trust Ervan for his crazy strategies, and we never regret it!
                    </p>
                    <p className="mb-0">
                      I never thought sales funnel strategy could grow my new business in just
                      several months
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="what-you-get" className="py-5 bg-light">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h2>
                    What You'll <strong>GET</strong> During This{' '}
                    <strong>Free Strategy Session</strong>
                  </h2>
                  <p>
                    I understand that both of our <strong>time</strong> are very{' '}
                    <strong>valuable</strong>, so i wouldn't waste any of your time as mine also
                    precious.
                  </p>
                  <p>
                    I will break down our call into these <strong>3-easy steps</strong> that will
                    help you to realize that your business need a better{' '}
                    <strong>sales funnel</strong>:
                  </p>
                  <div id="easy-steps">
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <h3>Preparation</h3>
                        <p>
                          Before we're going on call, you can prepare your website information,
                          conversion rate, and business model as we're going through the deepest
                          factor of your business: your sales funnel.
                        </p>
                      </div>
                      <div className="col-12 col-md-4">
                        <h3>Describe your situation and desired results</h3>
                        <p>
                          While we're on call, we will talk about your current situation and your
                          desired outcome that you want from us. I will help to simulate your goals
                          and insight within this call.
                        </p>
                      </div>
                      <div className="col-12 col-md-4">
                        <h3>Complete Review</h3>
                        <p>
                          At the end of the call, i will give your step-by-step Framework that you
                          can follow immediately to start upgrade your business, in this case your
                          website into brand new sales funnel that will generate profits and grow
                          your business to the next level.{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="about-ervan" className="py-5 bg-gradient bg-primary shadow-lg">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="text-light">
                    <div className="about-ervan-image text-center mb-3">
                      <img
                        src="https://www.ervandra.com/wp-content/uploads/2020/12/ervan-round-300x300.png"
                        alt=""
                        className="img-thumbnail rounded-circle shadow"
                        width="120"
                      />
                    </div>
                    <h2>About Ervandra Halim</h2>
                    <p>
                      Ervan has helped his valuable partners and client across the globe for 10+
                      years in Website & Apps Development and Digital Marketing Strategies.
                    </p>

                    <p>
                      Currently he's on a mission to help small business to leverage Sales Funnel to
                      grow their business and reach the next level.
                    </p>

                    <p>
                      He's a very technical-guy, and his solution will always work at a higher level
                      of implementation, he will be your first (or next) Tech Lead Consultant.
                    </p>

                    <p>
                      His clients admire him for his innovative and proactive way to deliver
                      results.
                    </p>

                    <p>And yes, he's always #overdeliver!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
