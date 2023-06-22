"use client";

const error = ({ error, reset }) => {
  return (
    <div>
      <h1>404</h1>
      <p>{error.message}</p>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default error;
