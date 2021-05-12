import { React, useState } from "react";
import styled from "styled-components";

import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const Wrapper = styled.div`
  width: 600px;
  height: 275px;

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

const initialCredentials = {
  username: "",
  password: "",
};

export default function Login() {
  const [credentials, setCredentials] = useState(initialCredentials);

  function handleSextChangeHaha() {}

  return (
    <Wrapper>
      <TitleDiv>Hello there! Welcome to our (MINE) tiny little app.</TitleDiv>
      <form>
        <TextFieldDiv>
          <TextField
            variant="outlined"
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleSextChangeHaha}
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            variant="outlined"
            label="Password"
            name="password"
            value={credentials.password}
            onChange={handleSextChangeHaha}
          />
        </TextFieldDiv>

        <SubmitDiv>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={function () {
              console.log("AM APASAT BUTONUL");
              console.log("Textul din Username: " + credentials.username);
              console.log("Textul din Password: " + credentials.password);
            }}
          >
            LOGIN
          </Button>
        </SubmitDiv>
      </form>
    </Wrapper>
  );
}
