import React, { useEffect, useRef, useState } from 'react';
import Action from './action.js';
import dom from 'react-dom';

import "figma-plugin-ds/dist/figma-plugin-ds.css"
import "./ui.less";

const domElement = document.createElement('div')
domElement.id = 'react';
document.body.appendChild(domElement);

const defaultFrames = [
  { name: 'Frame 1' },
  { name: 'Frame 2' }
];

function App(props) {

  const input = useRef();
  const [frames, setFrames] = useState(defaultFrames);

  useEffect(setup, []);

  function setup() {
    window.onmessage = function(e) {
      if (!e || !e.data || !e.data.pluginMessage) {
        return;
      }
      var message = e.data.pluginMessage;
      switch (message.type) {
        case 'frames':
          console.log('Show UI:', message.data);
          setFrames(message.data);
          break;
      }
    }
  }

  function reset() {
    const result = [];
    for (let i = 0; i < frames.length; i++) {
      const frame = frames[i];
      result[i] = {...frame};
      for (let reaction in result[i].tally) {
        result[i].tally[reaction] = 0;
      }
    }
    setFrames(result);
    parent.postMessage({
      pluginMessage: {
        type: 'reset'
      }
    }, '*');
  }

  function close() {
    parent.postMessage({
      pluginMessage: {
        type: 'cancel'
      }
    }, '*');
  }

  return (
    <div>
      <ol>
        {
          frames.map(function(frame, i) {

            return <Action key={ i } frame={ frame } onUpdate={ update } />;

            function update(tally) {

              const result = [...frames];
              result[i] = {...frame};
              result[i].tally = tally;

              setFrames(result);

              parent.postMessage({
                pluginMessage: {
                  type: 'update',
                  id: frame.id,
                  tally: tally
                }
              }, '*');

            }

          })
        }
      </ol>
      <div className="pivots">
        <div className="button button--secondary-destructive reset" onClick={ reset }>
          Reset
        </div>
        <div className="button button--secondary cancel" onClick={ close }>
          Close
        </div>
      </div>
    </div>
  );
}

dom.render(<App />, domElement);
