import Head from 'next/head';
import Image from 'next/image';
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
                  <div className="py-3 py-md-5">
                    <div className="row justify-content-center">
                      <div className="col-12">
                        <h1 className="text-center mb-4 display-3 fw-bold  lh-sm">
                          <strong className="highlight ">2021 Update!</strong> Upgrade{' '}
                          <strong>Your First (or Next) Website</strong> into{' '}
                          <strong>Sales Funnel..</strong>{' '}
                          <strong>
                            <u>Today!</u>
                          </strong>
                        </h1>
                        <h3 className="text-center text-danger">
                          <em>
                            Trusted by 19+ companies from Indonesia, Singapore, US, and Finland!
                          </em>
                        </h3>
                      </div>
                    </div>
                    <div className="hero-image text-center mb-5">
                      <Image
                        src="/images/hero-showcase.png"
                        alt="Showcase"
                        layout="responsive"
                        width="1447"
                        height="682"
                      />
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-12 col-md-8">
                        <div className="sponsors mb-5 text-center">
                          <Image
                            src="/images/sponsors.png"
                            alt="Sponsored"
                            width="1200"
                            height="75"
                            layout="responsive"
                            className="img-grayscale"
                          />
                        </div>
                        <h5 className="text-center mb-5">
                          For 10+ years building <strong>website</strong> for{' '}
                          <strong>companies</strong> and <strong>clients</strong> (
                          <em>just like you</em>), we have found that <strong>Sales Funnel</strong>{' '}
                          is the principal key to <strong>generate</strong> more{' '}
                          <strong>profits for all of businesses!</strong>
                        </h5>
                      </div>
                    </div>

                    <div className="button-container text-center">
                      <button
                        className="btn btn-primary btn-lg shadow-lg border-3 fw-bold p-3 px-5 text-uppercase fs-3"
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
          </div>
          <div id="top-testimony" className="py-5">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-12 col-md-auto">
                  <div className="align-items-center mb-3 text-center">
                    <div
                      className="img-thumbnail rounded-circle mb-2 d-inline-block"
                      style={{ width: '90px', height: '90px' }}>
                      <Image
                        src="/images/jussi-hurmola.jpg"
                        alt="Jussi Hurmola"
                        width="80"
                        className="rounded-circle m-0 d-block"
                        height="80"
                        layout="fixed"
                      />
                    </div>
                    <div className="testimony-header">
                      <h6 className="mb-0 fw-bold text-uppercase">Jussi Hurmola</h6>
                      <h6 className="mb-0 small">CEO & Founder Lifelearn Platform</h6>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-auto">
                  <div className="testimony-content p-3 bg-gradient rounded-pill px-4 shadow-lg mb-0 position-relative">
                    <span
                      className="position-absolute h1 text-danger"
                      style={{ top: '-.5rem', left: '.5rem' }}>
                      &ldquo;
                    </span>
                    <p className="mb-0 fw-bold">
                      <em>
                        We decided to trust Ervan for his crazy strategies, and we never regret it!
                        <br />I never thought sales funnel strategy could grow my new business in
                        just several months
                      </em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="what-you-get" className="py-5">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="py-3 py-md-5">
                    <h2 className="mb-3 ">
                      What You'll <strong>GET</strong> During This{' '}
                      <strong>Free Strategy Session</strong>
                    </h2>
                    <p className="mb-5 fs-5">
                      I understand that both of our <strong>time</strong> are very{' '}
                      <strong>valuable</strong>, so i wouldn't waste any of your time as mine also
                      precious.
                      <br />I will break down our call into these <strong>3-easy steps</strong> that
                      will help you to realize that your business need a better{' '}
                      <strong>sales funnel</strong>:
                    </p>
                    <div id="easy-steps" className="py-3">
                      <div className="row">
                        <div className="col-12 col-md-4">
                          <h3 className="mb-3 fw-bold fs-4  border-bottom pb-3 border-2 border-success">
                            1️⃣ Preparation
                          </h3>
                          <p>
                            Before we're going on call, you can prepare your website information,
                            conversion rate, and business model as we're going through the deepest
                            factor of your business: your sales funnel.
                          </p>
                        </div>
                        <div className="col-12 col-md-4">
                          <h3 className="mb-3 fw-bold fs-4  border-bottom pb-3 border-2 border-success">
                            2️⃣ Consultation
                          </h3>
                          <p>
                            While we're on call, we will talk about your current situation and your
                            desired outcome that you want from us. I will help to simulate your
                            goals and insight within this call.
                          </p>
                        </div>
                        <div className="col-12 col-md-4">
                          <h3 className="mb-3 fw-bold fs-4  border-bottom pb-3 border-2 border-success">
                            3️⃣ Complete Review
                          </h3>
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
          </div>
          <div id="about-ervan" className="py-5" style={{ background: 'rgba(0,0,0,.9)' }}>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="py-3 py-md-5 text-center">
                    <div className="about-ervan-image mb-3">
                      <div
                        className="img-thumbnail d-inline-block rounded-circle shadow"
                        style={{ width: '120px', height: '120px' }}>
                        <Image
                          src="/images/ervan.png"
                          alt="Ervandra Halim"
                          className="rounded-circle"
                          width="110"
                          height="110"
                          layout="responsive"
                        />
                      </div>
                    </div>
                    <h2 className="mb-3">About Ervandra Halim</h2>
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

          <div id="recommended" className="py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col">
                  <div className="py-3 py-md-5">
                    <h2 className="mb-5 text-center">
                      Why'd They Recommend <br />
                      <strong>Work With Ervan?</strong>
                    </h2>
                    <p className="fs-5 mb-5 text-center">
                      My partner and valuable clients will tell you their experiences work with me.
                    </p>

                    <div id="client-testimony">
                      <div className="row">
                        <div className="col-12 col-md-4">
                          <div className="testimony-item">
                            <div className="card shadow-lg rounded-3">
                              <div className="card-body p-3">
                                <div className="row">
                                  <div className="col-3">
                                    <img
                                      src="https://www.ervandra.com/wp-content/uploads/2021/03/1595011353248-150x150.jpeg"
                                      alt=""
                                      className="img-thumbnail rounded-circle"
                                    />
                                  </div>
                                  <div className="col-9">
                                    <h6 className="mb-1 fw-bold">Donny Riantori</h6>
                                    <h6 className="small mb-0">
                                      Co-founder & Chief Technology Officer - Gomodo Technologies
                                      Pte Ltd
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
