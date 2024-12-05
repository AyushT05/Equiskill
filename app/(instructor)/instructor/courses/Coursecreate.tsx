"use client"
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const CourseCreate = () => {
  const router = useRouter(); // Initialize the router

  const handleButtonClick = () => {
    router.push('create-course'); // Redirect to /create-course
  };

  return (
    <StyledWrapper>
      <button onClick={handleButtonClick}> Create new course </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    padding: 1.3em 3em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
  }

  button:hover {
    background-color: #003cb3; /* Changed hover color to #003cb3 */
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

  button:active {
    transform: translateY(-1px);
  }
`;

export default CourseCreate;