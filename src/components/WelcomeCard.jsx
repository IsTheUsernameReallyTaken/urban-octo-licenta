import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  padding: 1em;
  background: papayawhip;
  border-radius: 10px;
  border-style: solid;
  border-width: thin;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const welcome = "Welcome to our humble little app. ";
const actually = "(it's just mine, but oh well)";

export default class WelcomeCard extends React.Component {
  render() {
    return (
      <Wrapper>
        <Title>
          {welcome}
          {actually}
        </Title>
      </Wrapper>
    );
  }
}
