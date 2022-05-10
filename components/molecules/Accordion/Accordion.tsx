import { useState } from 'react';
import Fade from 'react-reveal';

export default function Accordion({ data, company }) {
  const initialState = { activeAccordion: 0 };
  const [state, setMyState] = useState(initialState);
  const setState = newState => {
    setMyState(prevState => ({ ...prevState, ...newState }));
  };
  const { activeAccordion } = state;

  return (
    <div className="eh-accordion">
      {data.length &&
        data.map((work, index) => {
          const active = index === activeAccordion;
          return (
            <div className="workplace-content mb-8" key={work.year + index}>
              <div
                className={`eh-accordion__head cursor-pointer text-black ${
                  active ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
                onClick={() => setState({ activeAccordion: index })}>
                <h3 className="mb-0 text-xl leading-tight font-bold flex items-center flex-wrap">
                  {index > 0 && (
                    <span className="inline-block bg-gray-100 text-gray-500 rounded text-xs px-1 align-middle border border-gray-300 mr-2 animate-pulse uppercase">
                      Past role
                    </span>
                  )}
                  {work.title} <span className="text-grey-700 inline-block">@ {company}</span>
                </h3>
                <h4 className="text-lg mb-4 text-gray-700">
                  <small>{work.year}</small>
                </h4>
              </div>

              <div className={`eh-accordion__content ${active ? 'active' : 'hidden'}`}>
                <Fade cascade>
                  <div className="job-desc">
                    {work.summary.map((sum, idx) => (
                      <h6 className="font-light my-2 lg:text-lg flex" key={sum + idx}>
                        <span className="text-warning text-red-900 mr-4">⌲</span>
                        <span>{sum}</span>
                      </h6>
                    ))}
                  </div>
                </Fade>
              </div>
            </div>
          );
        })}
    </div>
  );
}
