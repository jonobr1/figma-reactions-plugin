import React, { useRef } from 'react';
import dom from 'react-dom';

import logo from "../assets/logo.svg";
import "./ui.css";

var domElement = document.createElement('div')
domElement.id = 'react';
document.body.appendChild(domElement);

function App(props) {

  const input = useRef();

  function onCreate() {
    const count = parseInt(input.current.value, 10);
    parent.postMessage({
      pluginMessage: {
        type: 'create-rectangles',
        count
      }
    }, '*');
  }

  function onCancel() {
    parent.postMessage({
      pluginMessage: {
        type: 'cancel'
      }
    }, '*');
  }

  return (
    <div>
      <h2>
        Rectangle Creator
      </h2>
      <p>
        Count: <input ref={ input } />
      </p>
      <button id="create" onClick={ onCreate }>
        Create
      </button>
      <button onClick={ onCancel }>
        Cancel
      </button>
    </div>
  );
}

dom.render(<App />, domElement);
