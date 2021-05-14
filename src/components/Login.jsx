import React, { useState, useEffect } from "react";
import styled from "styled-components";

import firebase from "../firebase";
import "firebase/firestore";

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

class UsernameField extends React.Component {
  render() {
    return (
      <TextFieldDiv>
        <TextField
          error={this.props.error}
          helperText={this.props.error ? "Username does not exist" : ""}
          id="usernameField"
          variant="outlined"
          label="Username"
        />
      </TextFieldDiv>
    );
  }
}

class PasswordField extends React.Component {
  render() {
    return (
      <TextFieldDiv>
        <TextField
          error={this.props.error}
          helperText={this.props.error ? "Incorrect Password" : ""}
          id="passwordField"
          variant="outlined"
          label="Password"
          type="password"
        />
      </TextFieldDiv>
    );
  }
}

export default function Login() {
  const [passWrong, setPassWrong] = useState(false);
  const [userWrong, setUserWrong] = useState(false);

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

  function verifyLoginData(username1, password1) {
    let toReturn = {
      correctUsername: false,
      correctPassword: false,
    };

    users.forEach((useri) => {
      if (useri.username === username1) {
        toReturn.correctUsername = true;
        if (useri.password === password1) {
          toReturn.correctPassword = true;
        }
      }
    });

    return toReturn;
  }

  function onSubmit() {
    const aux1 = document.getElementById("usernameField").value,
      aux2 = document.getElementById("passwordField").value;
    const result = verifyLoginData(aux1, aux2);

    if ((result.correctUsername === true) & (result.correctPassword === true)) {
      setPassWrong(false);
      setUserWrong(false);
      console.log("Welcome, " + aux1 + "!");
    } else {
      if (
        (result.correctUsername === true) &
        (result.correctPassword === false)
      ) {
        setUserWrong(false);
        setPassWrong(true);
        console.log("The password for " + aux1 + " is incorrect.");
      }
      if (
        (result.correctUsername === false) &
        (result.correctPassword === false)
      ) {
        setUserWrong(true);
        setPassWrong(false);
        console.log("There is nobody called " + aux1 + " in our DB.");
      }
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Wrapper>
      <TitleDiv>
        <div>Hello there! Welcome to our (MINE) tiny little app.</div>
      </TitleDiv>
      <form>
        <UsernameField error={userWrong} />
        <PasswordField error={passWrong} />

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
