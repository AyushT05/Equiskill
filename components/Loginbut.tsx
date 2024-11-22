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
    border: none;
    color: #fff;
    background-image: linear-gradient(30deg, #0400ff, #4ce3f7);
    border-radius: 50px; /* Set to a high value for fully rounded corners */
    background-size: 100% auto;
    font-family: inherit;
    font-size: 17px;
    padding: 0.6em 1.5em; /* Adjust padding for button size */
    cursor: pointer; /* Change cursor to pointer */
  }

  button:hover {
    background-position: right center;
    background-size: 200% auto;
    -webkit-animation: pulse 2s infinite;
    animation: pulse512 1.5s infinite;
  }

  @keyframes pulse512 {
    0% {
      box-shadow: 0 0 0 0 #05bada66;
    }

    70% {
      box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
    }

    100% {
      box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
    }
  }
`;

export default Loginbut;