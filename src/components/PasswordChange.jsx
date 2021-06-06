import React, { useState } from "react";
import styled from "styled-components";

import { Button, TextField, Checkbox } from "@material-ui/core";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;

  top: 0;
  left: 0;

  background: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitDiv = styled.div`
  margin-top: 20px;
  padding: 5px;
`;

const TextFieldDiv = styled.div`
  margin-top: 10px;
  padding: 5px;
`;

const TitleDiv = styled.div`
  margin-bottom: 20px;
  font-size: 1.2em;
`;

export default function PasswordChange(props) {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass3, setPass3] = useState("");

  const [pass1Error, setPass1Error] = useState(false);
  const [pass2Error, setPass2Error] = useState(false);
  const [pass3Error, setPass3Error] = useState(false);

  const [pass1Hidden, setPass1Hidden] = useState(true);
  const [pass2Hidden, setPass2Hidden] = useState(true);
  const [pass3Hidden, setPass3Hidden] = useState(true);

  return props.show ? (
    <Wrapper>
      <TitleDiv>Change your password</TitleDiv>
      <TextFieldDiv>
        <TextField
          error={pass1Error}
          helperText={pass1Error ? "Password cannot be empty" : ""}
          id="passwordField"
          variant="outlined"
          label="Password"
          type={pass1Hidden ? "password" : ""}
        />
        <Checkbox
          onChange={() => {
            setPass1Hidden(!pass1Hidden);
          }}
          id="passCheckBox"
          color="default"
        />
      </TextFieldDiv>
      <SubmitDiv>
        <Button
          style={{ background: "black", color: "white" }}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            props.showFunction(false);
          }}
        >
          EXIT
        </Button>
      </SubmitDiv>
    </Wrapper>
  ) : (
    <div />
  );
}
