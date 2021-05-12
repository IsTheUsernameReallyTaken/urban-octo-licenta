import { React, useState, useEffect } from "react";
import styled from "styled-components";

import { TextField, Button } from "@material-ui/core";

const Wrapper = styled.div`
  width: 600px;

  margin: 20px;
  padding: 20px;

  margin-left: auto;
  margin-right: auto;

  background: GhostWhite;
  text-align: center;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;
`;

const TitleDiv = styled.div`
  margin-bottom: 20px;
  font-size: 1.2em;
`;

const TextFieldDiv = styled.div`
  margin-top: 10px;
  padding: 5px;
`;

const SubmitDiv = styled.div`
  margin-top: 20px;
  padding: 5px;
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);

  function verifyLoginData(username, password) {
    if (username === "danieml") {
      if (password === "parola") {
        return true;
      } else return false;
    } else return false;
  }

  function onSubmit() {
    const aux1 = document.getElementById("usernameField").value,
      aux2 = document.getElementById("passwordField").value;

    if (verifyLoginData(aux1, aux2) === true) {
      console.log("Welcome, " + aux1 + "!");
    } else {
      console.log("Login was NOT successful!");
      console.log("username: " + aux1 + ", parola: " + aux2);
    }
  }

  return (
    <Wrapper>
      <TitleDiv>
        <div>Hello there! Welcome to our (MINE) tiny little app.</div>
      </TitleDiv>
      <form>
        <TextFieldDiv>
          <TextField id="usernameField" variant="outlined" label="Username" />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            id="passwordField"
            variant="outlined"
            label="Password"
            type="password"
          />
        </TextFieldDiv>

        <SubmitDiv>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onSubmit}
          >
            LOGIN
          </Button>
        </SubmitDiv>
      </form>
    </Wrapper>
  );
}
