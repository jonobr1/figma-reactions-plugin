import React, { useEffect, useRef, useState } from 'react';
import "./action.less";

export default function Action(props) {

  const [counts, setCounts] = useState({
    ship: 0,
    massage: 0,
    reject: 0
  });

  useEffect(setup, [props.frame]);

  function setup() {
    if (props.frame.tally) {
      setCounts(props.frame.tally);
    }
  }

  function ship() {
    const tally = { ...counts };
    tally.ship++;
    if (props.onUpdate) {
      props.onUpdate(tally);
    }
  }

  function massage() {
    const tally = { ...counts };
    tally.massage++;
    if (props.onUpdate) {
      props.onUpdate(tally);
    }
  }

  function reject() {
    const tally = { ...counts };
    tally.reject++;
    if (props.onUpdate) {
      props.onUpdate(tally);
    }
  }

  return (
    <li className="action">
      <label className="label">{ props.frame.name }</label>
      <div className="reaction">
        <div className="icon-button" alt="Ship it" onClick={ ship }>
          🛳
        </div>
        <p>
          { counts.ship }
        </p>
      </div>
      <div className="reaction">
        <div className="icon-button" alt="Needs massaging" onClick={ massage }>
          💆‍♀️
        </div>
        <p>
          { counts.massage }
        </p>
      </div>
      <div className="reaction">
        <div className="icon-button" alt="No go" onClick={ reject }>
          🙅‍♂️
        </div>
        <p>
          { counts.reject }
        </p>
      </div>
    </li>
  );

}
