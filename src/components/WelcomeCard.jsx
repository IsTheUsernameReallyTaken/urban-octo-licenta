import React, { useState } from "react";
import styled from "styled-components";
import PopUp from "./PopUp";

const Wrapper = styled.section`
  padding: 1em;
  background: papayawhip;
  border-radius: 10px;
  border-style: solid;
  border-width: thin;
`;

const Title = styled.h1`
  font-size: 1.7em;
  text-align: center;
  color: palevioletred;
`;

export default function WelcomeCard(props) {
  const [buttonShow, setButtonShow] = useState(false);

  const welcome = "Welcome to our humble little app, " + props.username + ".";
  return (
    <Wrapper>
      <Title>{welcome}</Title>
      <button
        onClick={() => {
          setButtonShow(true);
          console.log("Something");
        }}
      >
        Show puppy up
      </button>
      <PopUp show={buttonShow} showFunction={setButtonShow} />
    </Wrapper>
  );
}
