import React, { memo } from 'react';
import './Chart.css';

/**
 * Button component for incrementing and decrementing a state value.
 * 
 * This component provides two buttons for incrementing and decrementing a numeric state value.
 * It is memoized using React.memo to prevent unnecessary re-renders.
 * 
 * @param {Object} props - The props object.
 * @param {number} props.state - The current state value.
 * @param {function} props.setState - The function to update the state value.
 * 
 * @returns {JSX.Element} The rendered button component.
 */
const Button = memo(({ state, setState }) => {
  return (
    <div>
      <button
        className="button"
        disabled={state === 5}
        onClick={() => setState(state - 1)}
      >
        -
      </button>
      <span>{state}</span>
      <button
        className="button"
        disabled={state === 12}
        onClick={() => setState(state + 1)}
      >
        +
      </button>
      <span> &nbsp; &nbsp; </span>
    </div>
  );
});

export default Button;
