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
  font-size: 1.7em;
  text-align: center;
  color: palevioletred;
`;

export default class WelcomeCard extends React.Component {
  render() {
    const welcome =
      "Welcome to our humble little app, " + this.props.username + ".";
    return (
      <Wrapper>
        <Title>{welcome}</Title>
      </Wrapper>
    );
  }
}
