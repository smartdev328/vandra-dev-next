import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import profile from '../config/profile';
import Modal from 'react-modal';
import { useSetState } from '@ervandra/use-setstate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Pulse from 'react-reveal/Pulse';
import Flash from 'react-reveal/Flash';
import Bounce from 'react-reveal/Bounce';

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
    isMenuOpen: false,
    isReady: false,
  };
  const { state, setState } = useSetState(initialState);
  const { isOpen, name, email, isLoading, isMenuOpen, success, workTab, isReady } = state;
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
  useEffect(() => {
    setTimeout(() => {
      setState({ isReady: true });
    }, 100);
  }, []);
  return (
    <div>
      <Head>
        <title>
          {profile.name} | {profile.mission}
        </title>
        <meta name="author" content={profile.name} />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="@ervandracom" key="twhandle" />
        <meta property="og:image" content="/images/cover.png" key="ogimage" />
        <meta
          property="og:site_name"
          content={`${profile.name} | ${profile.mission}`}
          key="ogsitename"
        />
        <meta property="og:title" content={`${profile.name} - ${profile.mission}`} key="ogtitle" />
        <meta property="og:description" content={profile.intro} key="ogdesc" />
        <meta name="description" content={profile.intro} key="sitedesc" />
      </Head>
      <div
        id="app-container"
        className={`${isReady ? 'is-ready' : ''} ${isMenuOpen ? 'is-menu-open' : ''}`}>
        {/* <Image src="/images/bg-dust.png" layout="fixed" width="1920" height="1080" /> */}
        <Bounce top duration={100}>
          <header
            id="header"
            className={`${isMenuOpen ? '' : 'sticky-top'} shadow py-2`}
            style={{ backdropFilter: 'blur(2px)' }}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-between">
                    <Zoom right duration={300}>
                      <div className="logo">
                        <Image
                          src="/images/logo.svg"
                          alt="Ervandra Halim"
                          width="48"
                          height="48"
                          layout="intrinsic"
                          className="d-block"
                        />
                      </div>
                    </Zoom>
                    <nav id="mainmenu">
                      <div className="d-none d-md-flex justify-content-end align-items-center">
                        <ul className="m-0 d-flex">
                          <li className="d-block ms-4">
                            <Fade left duration={100}>
                              <a className="text-decoration-none" href="#about">
                                About
                              </a>
                            </Fade>
                          </li>

                          <li className="d-block ms-4">
                            <Fade left delay={100} duration={100}>
                              <a className="text-decoration-none" href="#experience">
                                Experience
                              </a>
                            </Fade>
                          </li>
                          <li className="d-block ms-4">
                            <Fade left delay={200} duration={100}>
                              <a className="text-decoration-none" href="#testimonial">
                                Testimonial
                              </a>
                            </Fade>
                          </li>
                          <li className="d-block ms-4">
                            <Fade left delay={300} duration={100}>
                              <a className="text-decoration-none" href="#contact">
                                Contact
                              </a>
                            </Fade>
                          </li>
                        </ul>
                        <Zoom delay={300} duration={100}>
                          <button
                            className="ms-4 btn rounded border-2 rounded-3 fw-bold shadow btn-outline-primary btn-sm"
                            onClick={() => setState({ isOpen: true })}>
                            Join Tech-a-break
                          </button>
                        </Zoom>
                      </div>
                      <div className="d-block d-md-none">
                        <Zoom delay={300}>
                          <button
                            className="btn bg-transparent fs-4 text-primary"
                            onClick={() => setState({ isMenuOpen: !isMenuOpen })}
                            style={{ width: '46px', height: '46px' }}>
                            {isMenuOpen ? <span>×</span> : <span>☰</span>}
                          </button>
                        </Zoom>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </Bounce>

        <section id="content" className="px-3 px-md-0 position-relative overflow-hidden">
          <div id="hero" className="py-3 py-md-5 vh-90">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-12 col-lg-10">
                  <div className="py-3 py-md-5 text-light">
                    <div className="py-3 py-md-5">
                      <Fade duration={100}>
                        <h2 className="text-light fs-6">
                          <span className="me-2" role="emoji">
                            👋🏻
                          </span>{' '}
                          Hi, my name is
                        </h2>
                      </Fade>
                      <h1 className="display-3 text-warning fw-bold" style={{ fontWeight: '900' }}>
                        <Zoom cascade top duration={500}>
                          Ervandra Halim.
                        </Zoom>
                      </h1>
                      <Fade delay={100} duration={100}>
                        <h2 className="mb-3 mb-md-5 fs-4 fw-bold">{profile.mission}.</h2>
                      </Fade>
                      <Fade delay={100} duration={100}>
                        <div className="row">
                          <div className="col-12 col-md-8">
                            <p className="mb-5">
                              Get my thoughts twice a month in a bite size tech news called the{' '}
                              <strong className="text-warning">Tech-a-break</strong>, where i cover
                              about latest technologies, programming tips and modern business.
                            </p>
                          </div>
                        </div>
                      </Fade>

                      <div className="button-container">
                        <Zoom delay={300} duration={100}>
                          <Pulse forever={true} delay={1500} duration={2000}>
                            <button
                              className="btn btn-outline-success shadow border-2 fw-bold btn-lg fs-6"
                              onClick={() => setState({ isOpen: true })}>
                              Join Tech-a-break ⚡️
                            </button>
                          </Pulse>
                        </Zoom>
                      </div>
                    </div>
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={() => setState({ isOpen: false })}
                      contentLabel="Modal"
                      className="reveal p-3 center small"
                      ariaHideApp={false}>
                      <div className="p-3 pt-4">
                        {success ? (
                          <div className="p-0 text-center">
                            <h3 className="mb-3">Success</h3>
                            <button className="btn btn-primary">Close</button>
                          </div>
                        ) : (
                          <form onSubmit={handleSubmit} className="px-0 px-md-3">
                            <Fade cascade top collapse delay={100}>
                              <div>
                                <h5 className="text-center mb-4 fw-bold">
                                  Fill out form below and{' '}
                                  <strong className="text-success">
                                    Claim Your Free Tech-a-break
                                  </strong>{' '}
                                  Now.
                                </h5>
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
                                    className="btn fs-6 btn-success text-uppercase fw-bold shadow w-100">
                                    Join Tech-a-break <span role="emoji">⚡️</span>
                                  </button>
                                )}
                                <p className="mb-0 text-muted text-center mt-4">
                                  Your privacy is protected
                                </p>
                              </div>
                            </Fade>
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
          <div id="about" className="p-3 py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <div className="py-3 py-md-5">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-12 col-md-3 order-md-2 text-center">
                        <Zoom right fraction={0.5}>
                          <div className="rounded-circle about-img img-thumbnail shadow-lg mb-3 mx-auto">
                            <Image
                              src="/images/ervan.jpg"
                              alt="Ervandra Halim"
                              width="300"
                              height="300"
                              layout="responsive"
                              className="rounded-circle"
                            />
                          </div>
                        </Zoom>
                      </div>
                      <div className="col-12 col-md-7">
                        <Zoom top duration={300}>
                          <h2 className="fw-bold mb-4 fs-1">🧑🏻‍💻 About Me</h2>
                        </Zoom>
                        <Fade delay={300}>
                          <p>
                            As a software engineer who enjoys crafting things that live on the
                            internet. I develop exceptional websites and web apps that provide
                            intuitive, pixel-perfect user interfaces with efficient and modern
                            infrastructures.
                          </p>
                          <p>
                            Currently, I'm a Senior Software Engineer, Web Platforms at{' '}
                            <a
                              href="https://www.rga.com"
                              target="_blank"
                              className="fw-bold"
                              rel="noopener noreferrer">
                              R/GA
                            </a>
                          </p>
                          <p>Here are a few technologies I've been working with recently:</p>

                          <div className="d-flex flex-wrap">
                            {profile.recentSkills.map((skill, index) => (
                              <div key={skill + index} className="text-warning w-100 w-md-50">
                                <Fade delay={index * 100 + 300}>
                                  <div>
                                    <span className="me-1 fst-normal">✦</span> {skill}
                                  </div>
                                </Fade>
                              </div>
                            ))}
                          </div>
                        </Fade>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="experience" className="py-3 py-md-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <div className="py-3 py-md-5">
                    <Zoom top duration={300}>
                      <h2 className="fw-bold mb-5 fs-1">🌟 Where I've Contributing</h2>
                    </Zoom>
                    <Fade duration={300}>
                      <div className="row">
                        <div className="col-12 col-md-3 col-lg-2">
                          <div
                            className="nav flex-md-column nav-pills me-0 me-md-5 mb-3 experience-menu"
                            role="tablist"
                            aria-orientation="vertical">
                            {profile.experiences.map((exp, index) => {
                              const active = index === workTab;
                              if (active)
                                return (
                                  <Zoom
                                    left
                                    key={exp.company + index}
                                    delay={index * 200 + 300}
                                    duration={300}>
                                    <button
                                      key={exp.company + index}
                                      className="nav-link rounded-0 text-nowrap text-start active bg-dark text-primary border-start border-2 border-success"
                                      type="button"
                                      role="tab">
                                      {exp.company}
                                    </button>
                                  </Zoom>
                                );
                              return (
                                <Zoom
                                  left
                                  key={exp.company + index}
                                  delay={index * 200 + 300}
                                  duration={300}>
                                  <button
                                    key={exp.company + index}
                                    className="nav-link rounded-0 text-nowrap text-start text-muted border-start border-2 border-secondary"
                                    type="button"
                                    onClick={() => setState({ workTab: index })}
                                    role="tab">
                                    {exp.company}
                                  </button>
                                </Zoom>
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
                                  <div
                                    className="tab-pane fade show active"
                                    role="tabpanel"
                                    key={exp.company + index}>
                                    <div className="workplace-content">
                                      <h3 className="mb-1 fw-bold fs-5">
                                        {exp.title}{' '}
                                        <span className="text-primary">@ {exp.company}</span>
                                      </h3>
                                      <h4 className="text-muted fs-6 mb-3">
                                        <small>{exp.year}</small>
                                      </h4>
                                      <Fade cascade>
                                        <div className="job-desc">
                                          {exp.summary.map((sum, idx) => (
                                            <h6 className="small my-3 d-flex" key={sum + idx}>
                                              <span className="text-warning me-3">⌲</span>
                                              <span>{sum}</span>
                                            </h6>
                                          ))}
                                        </div>
                                      </Fade>
                                    </div>
                                  </div>
                                );
                              return (
                                <div
                                  className="tab-pane "
                                  role="tabpanel"
                                  key={exp.company + index}>
                                  <div className="workplace-content py-3">
                                    <h3 className="mb-1 fw-bold fs-5">
                                      {exp.title}{' '}
                                      <span className="text-primary">@ {exp.company}</span>
                                    </h3>
                                    <h4 className="text-muted fs-6 mb-3">
                                      <small>{exp.year}</small>
                                    </h4>
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
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="testimonial" className="py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col">
                  <div className="py-3 py-md-5">
                    <Fade cascade delay={300}>
                      <h4 className="fs-4 mb-0 text-center">Why'd they recommend to</h4>
                      <h2 className="fs-1 mb-5 text-center fw-bold text-warning">
                        <Zoom cascade top duration={300}>
                          Work With Ervan?
                        </Zoom>
                      </h2>
                      <p className="fs-5 mb-5 text-center">
                        My partner and valuable clients will tell you their experiences to work with
                        me.
                      </p>
                    </Fade>
                    <div id="client-testimony">
                      <div className="row justify-content-center">
                        <div className="col-12 col-md-6 col-lg-4">
                          <Fade duration={300}>
                            <div className="testimony-item mb-3">
                              <div className="card  bg-transparent bg-gradient shadow-lg border-2  rounded-3">
                                <div className="card-body p-4">
                                  <div className="d-flex align-items-center">
                                    <div
                                      className="img-thumbnail rounded-circle me-3"
                                      style={{ width: '72px', flexBasis: '72px', flexShrink: 0 }}>
                                      <Image
                                        src="/images/testimonials/donny-riantori.jpg"
                                        alt="Donny Riantori"
                                        width="72"
                                        height="72"
                                        layout="responsive"
                                        className="rounded-circle"
                                      />
                                    </div>
                                    <div className="flex-auto">
                                      <h3 className="mb-1 fs-6 fw-bold">Donny Riantori</h3>
                                      <h4 className=" mb-0 fs-6">
                                        <small>
                                          Co-founder & CTO - Gomodo Technologies Pte Ltd
                                        </small>
                                      </h4>
                                    </div>
                                  </div>

                                  <p className="lh-2 small mb-0 mt-3">
                                    <em>
                                      Ervandra is an extraordinary software engineer, he always
                                      comes with a great solution, practical and impactful for any
                                      result of his project, you will find "engineering thinking",
                                      lives on this very talented guy, not only on his work but also
                                      on every process that he takes.
                                    </em>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Fade>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <Fade duration={300}>
                            <div className="testimony-item mb-3 mt-0mt-lg-4">
                              <div className="card bg-transparent bg-gradient shadow-lg border-2 rounded-3">
                                <div className="card-body p-4">
                                  <div className="d-flex align-items-center">
                                    <div
                                      className="img-thumbnail rounded-circle me-3"
                                      style={{ width: '72px', flexBasis: '72px', flexShrink: 0 }}>
                                      <Image
                                        src="/images/testimonials/erick-liemarga.jpg"
                                        alt="Erick Liemarga"
                                        width="72"
                                        height="72"
                                        layout="responsive"
                                        className="rounded-circle"
                                      />
                                    </div>
                                    <div className="flex-auto">
                                      <h3 className="mb-1 fs-6 fw-bold">Erick Liemarga</h3>
                                      <h4 className="fs-6 mb-0">
                                        <small>Chief Product Officer - LABABOOK</small>
                                      </h4>
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
                          </Fade>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                          <Fade duration={300}>
                            <div className="testimony-item mb-3">
                              <div className="card bg-transparent bg-gradient shadow-lg border-2 rounded-3">
                                <div className="card-body p-4">
                                  <div className="d-flex align-items-center">
                                    <div
                                      className="img-thumbnail rounded-circle me-3"
                                      style={{ width: '72px', flexBasis: '72px', flexShrink: 0 }}>
                                      <Image
                                        src="/images/testimonials/jussi-hurmola.jpg"
                                        alt="Jussi Hurmola"
                                        width="72"
                                        height="72"
                                        layout="responsive"
                                        className="rounded-circle"
                                      />
                                    </div>
                                    <div className="flex-auto">
                                      <h3 className="mb-1 fs-6 fw-bold">Jussi Hurmola</h3>
                                      <h4 className="fs-6 mb-0">
                                        <small>
                                          Chief Executive Office - LifeLearn Holdings Pte Ltd
                                        </small>
                                      </h4>
                                    </div>
                                  </div>

                                  <p className="lh-2 small mb-0 mt-3">
                                    <em>
                                      Ervandra is a very special person for us. He always
                                      overdeliver his services, even without being asked! He saved
                                      us multiple times due to our primitive and outdated backend
                                      system, he provide quick and working solutions. Indeed, our
                                      most valuable person regarding to technology, especially web
                                      applications.
                                    </em>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Fade>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" className="py-5">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                  <div className="py-3 py-md-5">
                    <div className="text-center">
                      <h4 className="fs-4 mb-0">What's next?</h4>
                      <h2 className="fs-1 mb-5 text-center text-warning fw-bold">
                        <Zoom cascade top duration={300}>
                          Get In Touch
                        </Zoom>
                      </h2>
                      <p className="mb-5 text-center">
                        Although I'm not currently looking for any job opportunities, my inbox is
                        always open. Whether for a potential project or just to say hi, I'll try my
                        best to answer your email!
                      </p>
                      <Zoom delay={300} duration={300}>
                        <a
                          href="mailto:hi@ervandra.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary border-2 fw-bold">
                          <span>👋🏻</span> Say Hello
                        </a>
                      </Zoom>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer id="footer" className="py-3 bg-dark">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="social-footer">
                  <ul className="social-list m-0 p-0 d-flex justify-content-center py-2 mb-3">
                    {profile.socialLinks.map((social, index) => (
                      <li className="d-block px-3" key={social + index}>
                        <Fade delay={index * 200} duration={500}>
                          <a
                            href={`${social.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={social.id}>
                            <FontAwesomeIcon icon={['fab', social.icon]} />
                          </a>
                        </Fade>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center copyright">
                  <Fade>
                    <p className="mb-0 small d-flex align-items-center justify-content-center">
                      <span>&copy;2012-{new Date().getFullYear()}</span>
                      <strong className="d-flex align-items-center justify-content-center mx-2">
                        Ervandra Halim{' '}
                        <Flash delay={1000}>
                          <span className="ms-1">⚡️</span>
                        </Flash>
                      </strong>
                    </p>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className="side-elements left" orientation="left">
          <Bounce left delay={300} duration={300}>
            <ul className="social-list side-element-item">
              {profile.socialLinks.map((social, index) => (
                <li key={social + index}>
                  <Fade delay={index * 200 + 300} duration={300}>
                    <a
                      href={`${social.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.id}>
                      <FontAwesomeIcon icon={['fab', social.icon]} />
                    </a>
                  </Fade>
                </li>
              ))}
            </ul>
          </Bounce>
        </div>

        <div className="side-elements right" orientation="right">
          <Bounce right delay={300} duration={300}>
            <div className="email-link side-element-item">
              <a href="mailto:hi@ervandra.com" target="_blank" rel="noopener noreferrer">
                <Zoom top cascade delay={300} duration={300}>
                  hi@ervandra.com
                </Zoom>
              </a>
            </div>
          </Bounce>
        </div>

        {isMenuOpen && (
          <div className="menu-mobile-overlay" onClick={() => setState({ isMenuOpen: false })}>
            &nbsp;
          </div>
        )}

        <div id="menu-mobile" className={`${isMenuOpen ? 'active' : ''}`}>
          <div className="">
            <div
              className="btn-container d-flex justify-content-end align-items-center p-2 mb-0"
              style={{ margin: '-1em' }}>
              <button
                aria-label="Close"
                className="btn btn-transparent border-2 border-light text-light fs-6 p-0 text-center rounded-circle lh-1"
                style={{ width: '40px', height: '40px' }}
                onClick={() => setState({ isMenuOpen: false })}>
                <span>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </button>
            </div>
            <ul
              className="m-0 p-0 d-block mb-5 fw-bold"
              onClick={() => setState({ isMenuOpen: false })}>
              <li className="d-block mb-4">
                <Fade when={isMenuOpen} bottom delay={0} duration={300}>
                  <a className="text-decoration-none d-block" href="#about">
                    About
                  </a>
                </Fade>
              </li>
              <li className="d-block mb-4">
                <Fade when={isMenuOpen} bottom delay={300} duration={300}>
                  <a className="text-decoration-none d-block" href="#experience">
                    Experience
                  </a>
                </Fade>
              </li>
              <li className="d-block mb-4">
                <Fade when={isMenuOpen} bottom delay={600} duration={300}>
                  <a className="text-decoration-none d-block" href="#testimonial">
                    Testimonial
                  </a>
                </Fade>
              </li>
              <li className="d-block mb-4">
                <Fade when={isMenuOpen} bottom delay={900} duration={300}>
                  <a className="text-decoration-none d-block" href="#contact">
                    Contact
                  </a>
                </Fade>
              </li>
            </ul>
            <Zoom bottom when={isMenuOpen} delay={1200} duration={500}>
              <Pulse forever={true} delay={1500} duration={2000}>
                <button
                  className="btn rounded border-2 w-100 rounded-3 fw-bold shadow btn-outline-primary btn-sm"
                  onClick={() => setState({ isOpen: true })}>
                  Join Tech-a-break <span>⚡️</span>
                </button>
              </Pulse>
            </Zoom>
          </div>
        </div>
      </div>
    </div>
  );
}
