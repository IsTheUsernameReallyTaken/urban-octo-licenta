import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  height: 100px;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 300px;

  margin: 20px;
  padding: 20px;

  margin-left: auto;
  margin-right: auto;

  background: darksalmon;
  text-align: center;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;
`;

export default class Login extends React.Component {
  render() {
    return (
      <Container>
        <Wrapper>
          <div>Hello there! Welcome to our (MINE) tiny little app.</div>

          <form></form>
        </Wrapper>
      </Container>
    );
  }
}
