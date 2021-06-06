import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Button, TextField, Checkbox } from "@material-ui/core";

import firebase from "../firebase";
import "firebase/firestore";

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
  margin-bottom: 7px;
  font-size: 1.2em;
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
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

  const [pass1Message, setPass1Message] = useState("");
  const [pass2Message, setPass2Message] = useState("");
  const [pass3Message, setPass3Message] = useState("");

  const [users, setUsers] = useState([]);

  const refUsers = firebase.firestore().collection("usernames");

  function getUsers() {
    refUsers.onSnapshot((querySnapshot) => {
      const userItems = [];
      querySnapshot.forEach((document) => {
        userItems.push(document.data());
      });
      setUsers(userItems);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  function updateUser(updatedUser) {
    refUsers
      .doc(updatedUser.id)
      .update(updatedUser)
      .catch((err) => {
        console.error(err);
      });
  }

  function onPasswordChange() {
    // console.log(props.username);
    const parola1 = document.getElementById("password1Field").value;
    const parola2 = document.getElementById("password2Field").value;
    const parola3 = document.getElementById("password3Field").value;

    if (parola1.length === 0) {
      setPass1Error(true);
      setPass1Message("Field cannot be empty");
      setPass2Error(false);
      setPass3Error(false);
      return;
    } else {
      setPass1Error(false);
    }

    if (parola2.length === 0) {
      setPass2Error(true);
      setPass2Message("Field cannot be empty");
      setPass3Error(false);
      return;
    } else {
      setPass2Error(false);
    }

    if (parola3.length === 0) {
      setPass3Error(true);
      setPass3Message("Field cannot be empty");
      return;
    } else {
      setPass3Error(false);
    }

    let hash = require("password-hash");
    let mismatch = false;
    let id;

    users.forEach((useri) => {
      if (useri.username === props.username) {
        id = useri.id;
        if (hash.verify(parola1, useri.password) === false) {
          mismatch = true;
        }
      }
    });

    if (mismatch === true) {
      setPass1Error(true);
      setPass1Message("Password is incorrect");

      setPass2Error(false);
      setPass3Error(false);
      return;
    } else {
      setPass1Error(false);
    }

    if (parola2 !== parola3) {
      setPass2Error(true);
      setPass3Error(true);

      setPass2Message("");
      setPass3Message("Passwords do not match");
      return;
    } else {
      setPass2Error(false);
      setPass3Error(false);
    }

    if (parola1 === parola2) {
      setPass3Error(true);
      setPass3Message("New password is identical");
      return;
    } else {
      setPass3Error(false);
    }

    let newpass = parola2;
    let passhash = hash.generate(newpass);

    let newUser = {
      id: id,
      password: passhash,
    };

    // console.log(newUser);
    // console.log(newpass);

    updateUser(newUser);
    props.showFunction(false);
  }

  return props.show ? (
    <Wrapper>
      <ColumnFlex>
        <TitleDiv>Change your password</TitleDiv>

        <TextFieldDiv>
          <TextField
            error={pass1Error}
            helperText={pass1Error ? pass1Message : ""}
            id="password1Field"
            variant="outlined"
            label="Old Password"
            type={pass1Hidden ? "password" : ""}
          />
          <Checkbox
            onChange={() => {
              setPass1Hidden(!pass1Hidden);
            }}
            id="pass1CheckBox"
            color="default"
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={pass2Error}
            helperText={pass2Error ? pass2Message : ""}
            id="password2Field"
            variant="outlined"
            label="New Password"
            type={pass2Hidden ? "password" : ""}
          />
          <Checkbox
            onChange={() => {
              setPass2Hidden(!pass2Hidden);
            }}
            id="pass2CheckBox"
            color="default"
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={pass3Error}
            helperText={pass3Error ? pass3Message : ""}
            id="password3Field"
            variant="outlined"
            label="Confirm Password"
            type={pass3Hidden ? "password" : ""}
          />
          <Checkbox
            onChange={() => {
              setPass3Hidden(!pass3Hidden);
            }}
            id="pass3CheckBox"
            color="default"
          />
        </TextFieldDiv>

        <RowFlex>
          <SubmitDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                onPasswordChange();
              }}
            >
              Save changes
            </Button>
          </SubmitDiv>

          <SubmitDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                setPass1Error(false);
                setPass2Error(false);
                setPass3Error(false);
                props.showFunction(false);
              }}
            >
              EXIT
            </Button>
          </SubmitDiv>
        </RowFlex>
      </ColumnFlex>
    </Wrapper>
  ) : (
    <div />
  );
}
