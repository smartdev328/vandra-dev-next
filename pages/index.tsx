import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import profile from '../config/profile';
import Modal from 'react-modal';
import { useSetState } from '@ervandra/use-setstate';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Pulse from 'react-reveal/Pulse';
import Flash from 'react-reveal/Flash';
import Bounce from 'react-reveal/Bounce';
import Accordion from '../components/molecules/Accordion/Accordion';

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
          setState({ success: true, name: '', email: '' });
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
        <meta name="description" content={profile.intro} key="sitedesc" />
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
      </Head>
      <div
        id="app-container"
        className={`${isReady ? 'is-ready' : ''} ${isMenuOpen ? 'is-menu-open' : ''}`}>
        <Bounce top duration={100}>
          <header
            id="header"
            className={`${isMenuOpen ? '' : 'sticky top-0'} shadow py-2`}
            style={{ backdropFilter: 'blur(5px)' }}>
            <div className="container-fluid container mx-auto">
              <div className="row">
                <div className="col-12">
                  <div className="flex items-center justify-between mx-5 md:mx-0">
                    <Zoom right duration={300}>
                      <div className="logo text-black h-10 my-2">
                        <Image
                          src="/images/logo-5.svg"
                          alt="Ervandra Halim"
                          width="40"
                          height="40"
                          layout="intrinsic"
                          className="block"
                        />
                      </div>
                    </Zoom>
                    <nav id="mainmenu">
                      <div className="hidden md:flex justify-end items-center">
                        <ul className="m-0 mr-4 flex">
                          <li className="block ml-4 md:ml-10">
                            <Fade left duration={100}>
                              <a className="text-decoration-none" href="#about">
                                About
                              </a>
                            </Fade>
                          </li>

                          <li className="block ml-4 md:ml-10">
                            <Fade left delay={100} duration={100}>
                              <a className="text-decoration-none" href="#experience">
                                Experience
                              </a>
                            </Fade>
                          </li>
                          <li className="block ml-4 md:ml-10">
                            <Fade left delay={200} duration={100}>
                              <a className="text-decoration-none" href="#testimonial">
                                Testimonial
                              </a>
                            </Fade>
                          </li>
                          <li className="block ml-4 md:ml-10">
                            <Fade left delay={300} duration={100}>
                              <a className="text-decoration-none" href="#contact">
                                Contact
                              </a>
                            </Fade>
                          </li>
                        </ul>
                        <Zoom delay={300} duration={100}>
                          <button
                            className="ml-4 p-2 px-4 rounded bg-black text-white"
                            onClick={() => setState({ isOpen: true })}>
                            Get In Touch
                            <span className="animate-pulse ml-2">⚡️</span>
                          </button>
                        </Zoom>
                      </div>
                      <div className="block md:hidden">
                        <Zoom delay={300}>
                          <button
                            className="btn bg-transparent text-2xl text-primary"
                            onClick={() => setState({ isMenuOpen: !isMenuOpen })}
                            style={{ width: '48px', height: '48px' }}>
                            {isMenuOpen ? <span>×</span> : <span className="ehicon-menu" />}
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

        <section id="content" className="px-5 md:px-0 relative overflow-hidden md:-mt-18">
          <div
            id="hero"
            className="py-4 md:py-10 bg-opacity-10 relative wide:min-h-screen min-h-[50vw] flex flex-col justify-center">
            <div className="container mx-auto">
              <div className="py-4 md:py-20 lg:w-1/2">
                <div className="py-3 py-md-5">
                  <Fade duration={100}>
                    <h2 className="text-base text-gray-900 mb-4">
                      <span
                        className="mr-2 inline-block text-2xl animate-bounce relative"
                        role="emoji">
                        👋🏻
                      </span>{' '}
                      Hi, i am Ervandra Halim.
                    </h2>
                  </Fade>
                  <Fade duration={500}>
                    {/* <h1 className="text-5xl xl:text-7xl font-extrabold mb-8">
                    Software Engineer | Technology Expert
                  </h1> */}
                    <h1 className="text-3xl xl:text-6xl font-extrabold mb-4">
                      Software Engineer & Technology Specialist
                    </h1>
                  </Fade>
                  <Fade delay={100} duration={100}>
                    {/* <h2 className="mb-3 mb-md-5 fs-4 fw-bold">{profile.mission}.</h2> */}
                    <h2 className="mb-4 font-bold text-lg md:text-2xl text-gray-900 md:mb-8">
                      {/* Are you looking for a technopreneur that can help you and your business to
                      thrive in the modern digital world? Let me help you. */}
                      Bring successful technology advancement closer to you.
                    </h2>
                    {/* <h2 className="mb-3 mb-md-5 fs-4 fw-bold">
                          Technology Enthusiast & Consultant
                        </h2> */}
                  </Fade>
                  <Fade delay={100} duration={100}>
                    <p className="mb-8 text-base md:text-xl text-gray-900">
                      I'd love to discuss about ideas, and my hard-earned experiences + insights
                      will help you in many ways. Let's get in touch!
                    </p>
                    {/* <p className="mb-3 fs-5">
                             I help people, startup/company to achieve their business goal faster
                              through technology-based solution.
                            </p>
                            <p className="mb-5 fs-5">
                              I want to add value for you, download this case study below:
                            </p> */}
                    {/* <p className="mb-5">
                              Get my thoughts twice a month in a bite size tech news called the{' '}
                              <strong className="text-warning">Tech-a-break</strong>, where i cover
                              about latest technologies, programming tips and modern business.
                            </p> */}
                  </Fade>

                  <div className="button-container">
                    <Zoom delay={300} duration={100}>
                      {/* <Pulse forever={true} delay={1500} duration={2000}> */}
                      <div className="flex items-center">
                        {/* <input
                          type="text"
                          className="p-2 px-4 rounded border mr-2 max-w-xs flex-1 border-gray-500"
                          placeholder="Enter your email"
                        /> */}
                        <button
                          className="btn btn-outline-success p-3 px-4 md:p-4 md:px-8 font-bold text-base md:text-lg bg-black text-white rounded uppercase w-full md:w-auto"
                          onClick={() => setState({ isOpen: true })}>
                          Get In Touch
                          <span className="animate-pulse ml-2">⚡️</span>
                        </button>
                      </div>
                      {/* </Pulse> */}
                    </Zoom>
                  </div>
                </div>
                <Modal
                  isOpen={isOpen}
                  onRequestClose={() => setState({ success: false, isOpen: false })}
                  contentLabel="Modal"
                  className="reveal p-3 center small"
                  ariaHideApp={false}>
                  <div className="md:p-3 md:pt-4">
                    {success ? (
                      <div className="p-0 text-center">
                        <h3 className="text-xl font-bold mb-2">
                          <span
                            className="mr-2 inline-block text-2xl animate-bounce relative"
                            role="emoji">
                            👍🏻
                          </span>{' '}
                          Thank you!
                        </h3>
                        <p className="text-gray-500 mb-4">
                          I will sending you my onboarding document, so you can get the most of my
                          expertise and leveraging them to your needs
                        </p>
                        <div className="flex justify-center mt-8">
                          <button
                            className="btn bg-gray-100 text-black p-2 px-6 mb-0 border-gray-200 border"
                            onClick={() => {
                              setState({ isOpen: false, success: false });
                            }}>
                            Close
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="px-0 px-md-3">
                        <Fade cascade top collapse delay={100}>
                          <div>
                            <h5 className="text-center mb-2 text-xl font-bold">
                              Let's Connect{' '}
                              <span
                                role="emoji"
                                className="animate-bounce text-xl inline-block ml-2">
                                👇🏻
                              </span>
                            </h5>
                            <p className="text-center mb-8 text-gray-500 md:px-6">
                              I wanna connect with you properly, then we can set tech call to
                              discuss some ideas.
                            </p>
                            <div className="form-group mb-4">
                              <input
                                type="text"
                                className="form-control p-2 px-4 rounded border mb-0 w-full"
                                placeholder="Your Name:"
                                value={name}
                                disabled={isLoading}
                                onChange={e => setState({ name: e.target.value })}
                              />
                            </div>
                            <div className="form-group mb-6">
                              <input
                                type="email"
                                className="form-control p-2 px-4 rounded border mb-0 w-full"
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
                                className="bg-gray-500 text-white cursor-not-allowed opacity-50 animate-pulse w-full rounded p-2 px-4 uppercase">
                                Submitting..
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="font-bold w-full p-2 px-4 rounded uppercase text-white bg-black">
                                Get in Touch <span role="emoji animate-pulse ml-2">⚡️</span>
                              </button>
                            )}
                            <p className="text-center text-xs mt-4 text-gray-500 md:px-6">
                              You will also receive my latest <u>portfolio</u> and <u>workflow</u>{' '}
                              blueprint sent directly to your inbox.
                            </p>
                            <p className="mb-0 text-muted text-center mt-4 text-gray-500">
                              Your privacy is protected
                            </p>
                          </div>
                        </Fade>
                      </form>
                    )}
                  </div>

                  <button
                    className="btn btn-close close-reveal"
                    onClick={() => setState({ success: false, isOpen: false })}>
                    <span className=" text-lg ehicon-close"></span>
                  </button>
                </Modal>
              </div>
            </div>
          </div>
          <div id="about" className="py-5 md:py-20 -mt-20 md:mt-0">
            <div className="container">
              <div className="row justify-center pt-20 md:pt-0">
                <div className="col-12 col-lg-10">
                  <div className="py-3 py-md-5">
                    <div className="row md:max-w-7xl mx-auto flex flex-wrap justify-between">
                      <div className="col-12 col-md-3 order-md-2 text-end w-full md:w-3/12">
                        <div className="w-1/2 md:w-full mx-auto mb-5 md:mb-0">
                          <Zoom right fraction={0.5}>
                            <div className="rounded-full mb-3 mx-auto">
                              <Image
                                src="/images/ervan.png"
                                alt="Ervandra Halim"
                                width="300"
                                height="300"
                                layout="responsive"
                                className="rounded-full"
                              />
                            </div>
                          </Zoom>
                        </div>
                      </div>
                      <div className="col-12 col-md-7 w-full md:w-8/12">
                        <Zoom top duration={300}>
                          <h2 className="font-bold mb-4 text-2xl md:text-4xl">
                            <span role="emoji" className="animate-bounce inline-block">
                              🧑🏻‍💻
                            </span>{' '}
                            About Me
                          </h2>
                        </Zoom>
                        <Fade delay={300}>
                          <p className="mb-4 lg:text-lg">
                            As software engineer & technology specialist who enjoy crafting things
                            that live on the heart of many people, i always love to bring technology
                            solution that is intersecting with creativity.
                          </p>

                          <p className="mb-4 lg:text-lg">
                            I'm now dedicated myself as{' '}
                            <span className="underline font-bold">Technology Lead</span> at{' '}
                            <a
                              href="https://www.rga.com"
                              target="_blank"
                              className="font-bold inline-flex items-center hover:underline"
                              rel="noopener noreferrer">
                              <span
                                className="inline-flex w-4 h-4 mr-1"
                                style={{ background: 'red' }}></span>
                              R/GA
                            </a>
                          </p>

                          <p className="mb-2 lg:text-lg">
                            Here are a few technologies I've been worked on recently:
                          </p>
                          <div className="flex flex-wrap mb-4">
                            {profile.recentSkills.map((skill, index) => (
                              <div key={skill + index} className="text-warning w-full md:w-1/2">
                                <Fade delay={index * 100 + 300}>
                                  <div>
                                    <span
                                      className={`mr-1 text-gray-300 animate-spin inline-block relative`}
                                      style={{
                                        animationDelay: `${index * 250}ms`,
                                        animationDuration: '3s',
                                      }}>
                                      ✦
                                    </span>{' '}
                                    {skill}
                                  </div>
                                </Fade>
                              </div>
                            ))}
                          </div>
                          {/* <p className="mb-2">And my other experiences:</p>
                          <div className="mb-4 text-gray-500 flex flex-wrap">
                            {profile.allSkills.map((skill, index) => (
                              <p
                                key={skill + index}
                                className="text-base px-1 rounded bg-gray-100 mr-1 mb-1 border border-gray-300">
                                {skill}
                              </p>
                            ))}
                          </div> */}
                        </Fade>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="experience" className="py-5 md:py-20 -mt-20 md:mt-0">
            <div className="container">
              <div className="row justify-center md:max-w-7xl mx-auto pt-20 md:pt-0">
                <div className="col-12 col-lg-10">
                  <div className="py-3 py-md-5">
                    <Zoom top duration={300}>
                      <h2 className="font-bold mb-8 text-2xl md:text-4xl">
                        <span role="emoji" className="animate-bounce inline-block">
                          🌟
                        </span>{' '}
                        Where I'm Contributing
                      </h2>
                    </Zoom>
                    <Fade duration={300}>
                      <div className="row flex justify-between flex-wrap">
                        <div className="col-12 col-md-3 col-lg-2 w-full md:w-1/4 lg:w-1/6 md:pr-8">
                          <div
                            className="nav flex-md-column nav-pills me-0 md:mb-8 mb-3 experience-menu md:flex-col flex w-full"
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
                                      className="nav-link text-center md:text-left p-2 px-4 text-nowrap whitespace-nowrap lg:text-lg active border-l-2 w-full border-l-black bg-black bg-opacity-10"
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
                                    className="nav-link text-center md:text-left p-2 px-4 border-l-2 w-full whitespace-nowrap lg:text-lg border-l-black hover:bg-black hover:bg-opacity-5"
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
                        <div className="col-12 col-md-9 col-lg-10 w-full md:w-3/4 lg:w-5/6">
                          <div className="tab-content">
                            {profile.experiences.map((exp, index) => {
                              const active = index === workTab;
                              return (
                                <div
                                  className={`tab-pane ${
                                    active ? 'block active show fade' : 'hidden'
                                  }`}
                                  role="tabpanel"
                                  key={exp.company + index}>
                                  <Accordion
                                    data={exp.promotion}
                                    company={exp.company}
                                    currentJob={index === 0}
                                  />
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

          <div id="testimonial" className="py-5 md:py-20 -mt-20">
            <div className="container">
              <div className="row justify-center">
                <div className="col">
                  <div className="py-3 pt-20 md:py-5">
                    <Fade delay={300}>
                      <h4 className="text-xl md:text-2xl mb-0 text-center relative">
                        Why'd they recommend to
                      </h4>

                      <Zoom top duration={300}>
                        <h2 className="text-2xl md:text-4xl mb-8 text-center font-bold text-warning">
                          <span
                            className="mr-2 inline-block text-2xl animate-bounce relative"
                            role="emoji">
                            👍🏻
                          </span>{' '}
                          Work With Ervan?
                        </h2>
                      </Zoom>
                      <p className="md:text-xl mb-8 text-center">
                        My partner and valuable clients will tell you their experiences to work with
                        me.
                      </p>
                    </Fade>
                    <div id="client-testimony">
                      <div className="row justify-center grid gap-10 grid-cols-1 md:grid-cols-3">
                        <div className="col-12 ">
                          <Fade duration={300}>
                            <div className="testimony-item mb-3">
                              <div className="card rounded bg-white bg-opacity-50 filter backdrop-blur-lg shadow-lg border">
                                <div className="card-body p-5">
                                  <div className="flex items-end">
                                    <div
                                      className=" shadow rounded-full mr-4"
                                      style={{ width: '72px', flexBasis: '72px', flexShrink: 0 }}>
                                      <Image
                                        src="/images/testimonials/donny-riantori.jpg"
                                        alt="Donny Riantori"
                                        width="72"
                                        height="72"
                                        layout="responsive"
                                        className="rounded-full"
                                      />
                                    </div>
                                    <div className="flex-auto">
                                      <h3 className="mb-0 fw-bold text-lg">Donny Riantori</h3>
                                      <h4 className="mb-0 text-sm text-gray-700">
                                        CTO - Gomodo Technologies Pte Ltd
                                      </h4>
                                    </div>
                                  </div>

                                  <p className="leading-tight lg:text-lg text-gray-700 mb-0 mt-4">
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
                            <div className="testimony-item mb-3 mt-0 mt-lg-4">
                              <div className="card rounded border bg-white bg-opacity-50 filter backdrop-blur-lg shadow-lg">
                                <div className="card-body p-4">
                                  <div className="flex items-end">
                                    <div
                                      className="shadow rounded-full mr-4"
                                      style={{ width: '72px', flexBasis: '72px', flexShrink: 0 }}>
                                      <Image
                                        src="/images/testimonials/erick-liemarga.jpg"
                                        alt="Erick Liemarga"
                                        width="72"
                                        height="72"
                                        layout="responsive"
                                        className="rounded-full"
                                      />
                                    </div>
                                    <div className="flex-auto">
                                      <h3 className="mb-0 text-lg font-bold">Erick Liemarga</h3>
                                      <h4 className="mb-0 text-sm text-gray-700">
                                        Chief Product Officer - LABABOOK
                                      </h4>
                                    </div>
                                  </div>

                                  <p className="leading-tight lg:text-lg text-gray-700 mb-0 mt-4">
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
                              <div className="card rounded bg-white bg-opacity-50 filter backdrop-blur-lg shadow-lg border">
                                <div className="card-body p-4">
                                  <div className="flex items-end">
                                    <div
                                      className="shadow rounded-full mr-4"
                                      style={{ width: '72px', flexBasis: '72px', flexShrink: 0 }}>
                                      <Image
                                        src="/images/testimonials/jussi-hurmola.jpg"
                                        alt="Jussi Hurmola"
                                        width="72"
                                        height="72"
                                        layout="responsive"
                                        className="rounded-full"
                                      />
                                    </div>
                                    <div className="flex-auto">
                                      <h3 className="mb-0 text-lg font-bold">Jussi Hurmola</h3>
                                      <h4 className="text-sm text-gray-700 mb-0">
                                        CEO - LifeLearn Holdings Pte Ltd
                                      </h4>
                                    </div>
                                  </div>

                                  <p className="leading-tight lg:text-lg text-gray-700 mb-0 mt-4">
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

          <div id="contact" className="py-5 md:py-20">
            <div className="container">
              <div className="row justify-center">
                <div className="col-12 md:max-w-3xl mx-auto">
                  <div className="py-3 py-md-5">
                    <div className="text-center">
                      <h4 className="text-xl md:text-2xl">What's next?</h4>
                      <h2 className="text-2xl md:text-4xl mb-8 text-center font-bold">
                        <Zoom cascade top duration={300}>
                          Get In Touch
                        </Zoom>
                      </h2>
                      <p className="mb-8 md:text-lg text-center">
                        I would love to hear from you, connect and discussing ideas with you, and
                        potentially sharing my expertise to help you getting advance in technology.
                      </p>
                      <Zoom delay={300} duration={300}>
                        {/* <a
                          href="mailto:hi@ervandra.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-black border-2 border-black p-4 px-8 rounded">
                          <span className="mr-2">👋🏻</span> Say Hello
                        </a> */}
                        <button
                          className="btn btn-outline-success p-3 md:p-4 px-8 font-bold text-base md:text-lg bg-black text-white rounded uppercase"
                          onClick={() => setState({ isOpen: true })}>
                          Get In Touch
                          <span className="animate-pulse ml-2">⚡️</span>
                        </button>
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
                  <ul className="social-list m-0 p-0 flex justify-center py-2 mb-3">
                    {profile.socialLinks.map((social, index) => (
                      <li className="block px-3" key={social.icon + index}>
                        <Fade delay={index * 200} duration={500}>
                          <a
                            href={`${social.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={social.id}>
                            <span className={`ehicon-${social.icon}`} />
                          </a>
                        </Fade>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center copyright">
                  <Fade>
                    <p className="mb-0 small flex items-center justify-center">
                      <span>&copy;2012-{new Date().getFullYear()}</span>
                      <strong className="flex items-center justify-center mx-2">
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

        <div className="side-elements left">
          <Bounce left delay={300} duration={300}>
            <ul className="social-list side-element-item">
              {profile.socialLinks.map((social, index) => (
                <li key={social.icon + index}>
                  <Fade delay={index * 200 + 300} duration={300}>
                    <a
                      href={`${social.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.id}>
                      <span className={`ehicon-${social.icon}`} />
                    </a>
                  </Fade>
                </li>
              ))}
            </ul>
          </Bounce>
        </div>

        <div className="side-elements right">
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
              className="btn-container flex justify-end items-center p-2 mb-0"
              style={{ margin: '-1em' }}>
              <button
                aria-label="Close"
                className="btn btn-transparent p-0 text-center lh-1"
                style={{ width: '40px', height: '40px' }}
                onClick={() => setState({ isMenuOpen: false })}>
                <span className="ehicon-close" />
              </button>
            </div>
            <ul
              className="m-0 p-0 block mb-5 fw-bold"
              onClick={() => setState({ isMenuOpen: false })}>
              <li className="block mb-4">
                <Fade when={isMenuOpen} bottom delay={0} duration={300}>
                  <a className="text-decoration-none block" href="#about">
                    About
                  </a>
                </Fade>
              </li>
              <li className="block mb-4">
                <Fade when={isMenuOpen} bottom delay={300} duration={300}>
                  <a className="text-decoration-none block" href="#experience">
                    Experience
                  </a>
                </Fade>
              </li>
              <li className="block mb-4">
                <Fade when={isMenuOpen} bottom delay={600} duration={300}>
                  <a className="text-decoration-none block" href="#testimonial">
                    Testimonial
                  </a>
                </Fade>
              </li>
              <li className="block mb-4">
                <Fade when={isMenuOpen} bottom delay={900} duration={300}>
                  <a className="text-decoration-none block" href="#contact">
                    Contact
                  </a>
                </Fade>
              </li>
            </ul>
            <Zoom bottom when={isMenuOpen} delay={1200} duration={500}>
              {/* <Pulse forever={true} delay={1500} duration={2000}> */}
              <button
                className="btn p-3 px-4 w-full bg-black uppercase text-white font-bold"
                onClick={() => setState({ isOpen: true })}>
                Get In Touch{' '}
                <span className="animate-pulse ml-2" role="emoji">
                  ⚡️
                </span>
              </button>
              {/* </Pulse> */}
            </Zoom>
          </div>
        </div>
      </div>
    </div>
  );
}
