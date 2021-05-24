import React, { useState } from "react";
import styled from "styled-components";
import PopUp from "./PopUp";

const Wrapper = styled.section`
  padding: 1em;
  background: papayawhip;
  border-radius: 10px;
  border-style: solid;
  border-width: thin;

  position: relative;
`;

const Title = styled.h1`
  font-size: 1.7em;
  text-align: center;
  color: palevioletred;
`;

const ButtonDiv = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  padding: 4px;
`;

export default function WelcomeCard(props) {
  const [buttonShow, setButtonShow] = useState(false);

  const welcome = "Welcome to our humble little app, " + props.username + ".";
  return (
    <Wrapper>
      <Title>{welcome}</Title>
      <ButtonDiv
        onClick={() => {
          setButtonShow(true);
        }}
      >
        Show puppy up
      </ButtonDiv>
      <PopUp show={buttonShow} showFunction={setButtonShow} />
    </Wrapper>
  );
}
