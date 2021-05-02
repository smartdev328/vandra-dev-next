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
    workTab: 0,
  };
  const { state, setState } = useSetState(initialState);
  const { isOpen, name, email, isLoading, isError, success, workTab } = state;
  const handleSubmit = async e => {
    e.preventDefault();
    setState({ isLoading: true, isError: false, success: false });
    const payload = {
      lists: process.env.NEXT_PUBLIC_KE_LIST_ID,
      email,
      full_name: name,
      tags: 'dev-strategy, via-api',
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
          {profile.name} | {profile.mission}
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
          content={`${profile.name} | ${profile.mission}`}
          key="ogsitename"
        />
        <meta property="og:title" content={`${profile.name} - ${profile.mission}`} key="ogtitle" />
        <meta property="og:description" content={profile.intro} key="ogdesc" />
      </Head>
      <div id="app-container">
        <div id="top" className="top-bar py-2 shadow-sm d-none">
          <div className="container">
            <div className="row">
              <div className="col">
                <h6 className="m-0 text-center text-light">
                  <strong className="text-warning">Attention</strong>&nbsp; Programmers, Creatives
                </h6>
              </div>
            </div>
          </div>
        </div>
        <section id="content">
          <div id="hero" className="p-3 py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-12 col-lg-10">
                  <div className="py-3 py-md-5 text-light">
                    <div className="py-3 py-md-5">
                      <h2 className="text-primary fs-5">Hi, my name is</h2>
                      <h1 className="display-3 text-warning mb-1" style={{ fontWeight: '900' }}>
                        Ervandra Halim.
                      </h1>
                      <h3 className="mb-5 fw-bold">{profile.mission}.</h3>
                      {/* <h2 className="mb-5 display-4 fw-bold">I build anything for the web.</h2> */}
                      {/* <h2 className="mb-5 fs-6">using technology for the human future</h2> */}
                      <div className="row">
                        <div className="col-12 col-md-7">
                          <p className="mb-5">{profile.intro}</p>
                        </div>
                      </div>

                      <div className="button-container">
                        <button
                          className="btn btn-outline-success shadow border-2 fw-bold btn-lg fs-6"
                          onClick={() => setState({ isOpen: true })}>
                          Claim Free Web Apps Starter
                        </button>
                      </div>
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
                            <h4 className="text-center mb-3 fw-bold">
                              Fill out form below and{' '}
                              <strong className="text-success">
                                Claim Your Free Web Apps Starter
                              </strong>{' '}
                              Now.
                            </h4>
                            <div className="form-group mb-3">
                              <input
                                type="text"
                                className="form-control "
                                placeholder="Your Name:"
                                value={name}
                                disabled={isLoading}
                                onChange={e => setState({ name: e.target.value })}
                              />
                            </div>
                            <div className="form-group mb-4">
                              <input
                                type="email"
                                className="form-control "
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
                                className="btn fs-6 fs-md-5 py-3 btn-success text-uppercase fw-bold shadow w-100">
                                Claim Free Web Apps Starter
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
          <div id="top-testimony" className=" d-none p-3 py-5 bg-dark text-light">
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
                  <div className="testimony-content p-3 mb-0 position-relative">
                    <span
                      className="position-absolute h1 text-success"
                      style={{ top: '-.5rem', left: '0' }}>
                      &ldquo;
                    </span>
                    <p className="mb-0 fw-bold">
                      <em>
                        We trust Ervan for his new strategies, and we've never regretted it!
                        <br />I never thought sales funnel could grow my new business in just
                        several months
                      </em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="about-me" className="p-3 py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <div className="py-3 py-md-5">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-12 col-md-3 order-md-2 text-center">
                        <div className="rounded-circle about-img img-thumbnail shadow-lg mb-3 mx-auto">
                          <Image
                            src="/images/ervan.png"
                            alt="Ervandra Halim"
                            width="300"
                            height="300"
                            layout="responsive"
                            className=""
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <h2 className="fw-bold mb-4">About Me</h2>
                        <p>
                          Hello! I'm Ervandra, a software engineer based in Jakarta, Indonesia who
                          enjoys building things that live on the internet. I develop exceptional
                          websites and web apps that provide intuitive, pixel-perfect user
                          interfaces with efficient and modern backends.
                        </p>
                        <p>
                          Currently, I'm a Senior Software Engineer, Web at{' '}
                          <a
                            href="https://www.rga.com"
                            target="_blank"
                            className="fw-bold"
                            rel="noopener noreferrer">
                            R/GA!
                          </a>
                        </p>
                        <p>Here are a few technologies I've been working with recently:</p>
                        <ul className="d-flex flex-wrap text-warning fst-italic">
                          <li className="w-100 w-md-50">Javascript (ES6+)</li>
                          <li className="w-100 w-md-50">HTML + CSS / SASS</li>
                          <li className="w-100 w-md-50">React.js (+Next.js)</li>
                          <li className="w-100 w-md-50">React Native</li>
                          <li className="w-100 w-md-50">Typescript</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="workplace" className="p-3 py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <div className="py-3 py-md-5">
                    <h2 className="fw-bold mb-5">Where I've Contributing</h2>
                    <div className="row">
                      <div className="col-12 col-md-3 col-lg-2">
                        <div
                          className="nav flex-md-column nav-pills me-0 me-md-5 mb-3 "
                          role="tablist"
                          aria-orientation="vertical">
                          {profile.experiences.map((exp, index) => {
                            const active = index === workTab;
                            if (active)
                              return (
                                <button
                                  key={exp.company + index}
                                  className="nav-link rounded-0 text-nowrap text-start active bg-dark text-primary border-start border-2 border-success"
                                  type="button"
                                  role="tab">
                                  {exp.company}
                                </button>
                              );
                            return (
                              <button
                                key={exp.company + index}
                                className="nav-link rounded-0 text-nowrap text-start text-muted border-start border-2 border-secondary"
                                type="button"
                                onClick={() => setState({ workTab: index })}
                                role="tab">
                                {exp.company}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="col-12 col-md-9 col-lg-10">
                        <div className="tab-content">
                          {profile.experiences.map((exp, index) => {
                            const active = index === workTab;
                            if (active)
                              return (
                                <div className="tab-pane fade show active" role="tabpanel">
                                  <div className="workplace-content">
                                    <h5 className="mb-1 fw-bold">
                                      {exp.title}{' '}
                                      <span className="text-primary">@ {exp.company}</span>
                                    </h5>
                                    <h6 className="text-muted small mb-3">{exp.year}</h6>
                                    <ul className="fst-italic">
                                      {exp.summary.map((sum, idx) => (
                                        <li key={sum + idx}>{sum}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              );
                            return (
                              <div className="tab-pane " role="tabpanel">
                                <div className="workplace-content py-3">
                                  <h5 className="mb-1 fw-bold">
                                    {exp.title}{' '}
                                    <span className="text-primary">@ {exp.company}</span>
                                  </h5>
                                  <h6 className="text-muted small mb-3">{exp.year}</h6>
                                  <ul className="fst-italic">
                                    {exp.summary.map((sum, idx) => (
                                      <li key={sum + idx}>{sum}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
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
                      <strong className="text-warning">Work With Ervan?</strong>
                    </h2>
                    <p className="fs-5 mb-5 text-center">
                      My partner and valuable clients will tell you their experiences to work with
                      me.
                    </p>

                    <div id="client-testimony">
                      <div className="row">
                        <div className="col-12 col-md-4">
                          <div className="testimony-item">
                            <div className="card  bg-transparent bg-gradient shadow-lg border-2  rounded-3">
                              <div className="card-body p-4">
                                <div className="row align-items-center">
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
                                      Co-founder & CTO - Gomodo Technologies Pte Ltd
                                    </h6>
                                  </div>
                                </div>
                                <p className="lh-2 small mb-0 mt-3">
                                  <em>
                                    Ervandra is an extraordinary software engineer, he always comes
                                    with a great solution, practical and impactful for any result of
                                    his project, you will find "engineering thinking", lives on this
                                    very talented guy, not only on his work but also on every
                                    process that he takes.
                                  </em>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="testimony-item mt-4">
                            <div className="card bg-transparent bg-gradient shadow-lg border-2 rounded-3">
                              <div className="card-body p-4">
                                <div className="row align-items-center">
                                  <div className="col-3">
                                    <img
                                      src="https://www.ervandra.com/wp-content/uploads/2021/03/1604991119630-150x150.jpeg"
                                      alt=""
                                      className="img-thumbnail rounded-circle"
                                    />
                                  </div>
                                  <div className="col-9">
                                    <h6 className="mb-1 fw-bold">Erick Liemarga</h6>
                                    <h6 className="small mb-0">Chief Product Officer - LABABOOK</h6>
                                  </div>
                                </div>
                                <p className="lh-2 small mb-0 mt-3">
                                  <em>
                                    If you're looking for a versatile frontend web developer I'll
                                    definitely recommend Ervandra right away. Several qualities of
                                    him that I could easily recommend are; Open minded, critical
                                    thinking, resourceful and always look for improvement. He's
                                    always work really hard to improve and expand his knowledge.
                                  </em>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="testimony-item">
                            <div className="card bg-transparent bg-gradient shadow-lg border-2 rounded-3">
                              <div className="card-body p-4">
                                <div className="row align-items-center">
                                  <div className="col-3">
                                    <img
                                      src="/images/jussi-hurmola.jpg"
                                      alt=""
                                      className="img-thumbnail rounded-circle"
                                    />
                                  </div>
                                  <div className="col-9">
                                    <h6 className="mb-1 fw-bold">Jussi Hurmola</h6>
                                    <h6 className="small mb-0">
                                      Chief Executive Office - LifeLearn Holdings Pte Ltd
                                    </h6>
                                  </div>
                                </div>
                                <p className="lh-2 small mb-0 mt-3">
                                  <em>
                                    Ervandra is a very special person for us. He always overdeliver
                                    his services, even without being asked! He saved us multiple
                                    times due to our primitive and outdated backend system, he
                                    provide quick and working solutions. Indeed, our most valuable
                                    person regarding to technology, especially web applications.
                                  </em>
                                </p>
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
