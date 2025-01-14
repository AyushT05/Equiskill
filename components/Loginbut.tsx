import React from 'react';
import styled from 'styled-components';

const Loginbut = () => {
  return (
    <StyledWrapper>
      <button>Login</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    --color: #003cb3;
    font-family: inherit;
    display: inline-block;
    width: 6em;
    height: 2.6em;
    line-height: 2.5em;
    overflow: hidden;
    cursor: pointer;
    margin: 20px;
    font-size: 17px;
    z-index: 1;
    color: var(--color);
    border: 2px solid var(--color);
    border-radius: 6px;
    position: relative;
  }

  @media (max-width: 768px) {
    button {
      width: 4em;      /* Reduced width */
      height: 2em;     /* Reduced height */
      line-height: 1.8em;
      margin: 10px;    /* Reduced margin */
      font-size: 14px; /* Smaller font */
    }
  }

  button::before {
    position: absolute;
    content: "";
    background: var(--color);
    width: 150px;
    height: 200px;
    z-index: -1;
    border-radius: 50%;
  }

  button:hover {
    color: white;
  }

  button:before {
    top: 100%;
    left: 100%;
    transition: 0.3s all;
  }

  button:hover::before {
    top: -30px;
    left: -30px;
  }
`;

export default Loginbut;
