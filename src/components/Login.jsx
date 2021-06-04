import React, { useState, useEffect } from "react";
import styled from "styled-components";

import firebase from "../firebase";
import "firebase/firestore";

import { TextField, Button } from "@material-ui/core";
import App from "./App";

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
          helperText={this.props.error ? this.props.message : ""}
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
          helperText={this.props.error ? this.props.message : ""}
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

  const [passMessage, setPassMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const [valid, setValid] = useState(false);

  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [dept, setDept] = useState("");

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

    let hash = require("password-hash");

    users.forEach((useri) => {
      if (useri.username === username1) {
        toReturn.correctUsername = true;
        if (hash.verify(password1, useri.password)) {
          toReturn.correctPassword = true;
        }
      }
    });

    return toReturn;
  }

  function isUserAdmin(username) {
    let auxAdmin = false;
    users.forEach((useri) => {
      if (useri.username === username) {
        let idx = useri.id;
        if (idx.includes("admin")) {
          // console.log("Aici va returna true");
          auxAdmin = true;
        }
      }
    });
    return auxAdmin;
  }

  function getDept(username) {
    let auxDept = "";
    users.forEach((useri) => {
      if (useri.username === username) {
        auxDept = useri.department;
      }
    });

    return auxDept;
  }

  function onSubmit() {
    const aux1 = document.getElementById("usernameField").value,
      aux2 = document.getElementById("passwordField").value;

    if (aux1.length === 0) {
      setUserWrong(true);
      setUserMessage("Username cannot be empty");
      setPassWrong(false);
      setPassMessage("");
      return;
    } else {
      setUserWrong(false);
      setUserMessage("");
    }

    if (aux2.length === 0) {
      setPassWrong(true);
      setPassMessage("Password cannot be empty");
      return;
    }

    const result = verifyLoginData(aux1, aux2);

    const auxAdmin = isUserAdmin(aux1);
    // console.log(auxAdmin);
    setIsAdmin(auxAdmin);

    // let string = "1234";

    // let hash = require("password-hash");
    // let passhash = hash.generate(string);

    // console.log("pentru " + string + ":");
    // console.log(passhash);

    const auxDept = getDept(aux1);
    setDept(auxDept);

    if ((result.correctUsername === true) & (result.correctPassword === true)) {
      setPassWrong(false);
      setUserWrong(false);
      setValid(true);
      setUsername(aux1);
      console.log("Welcome, " + aux1 + "!");
    } else {
      if (
        (result.correctUsername === true) &
        (result.correctPassword === false)
      ) {
        setUserWrong(false);
        setUserMessage("");
        setPassWrong(true);
        setPassMessage("Password is incorrect");
        console.log("The password for " + aux1 + " is incorrect.");
      }
      if (
        (result.correctUsername === false) &
        (result.correctPassword === false)
      ) {
        setUserWrong(true);
        setUserMessage("Username does not exist");
        setPassWrong(false);
        setPassMessage("");
        console.log("There is nobody called " + aux1 + " in our DB.");
      }
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  // return true ? (
  //   <App
  //     username={"daniel.dumitru"}
  //     isAdmin={true}
  //     dept={"dept-1"}
  //     logout={setValid}
  //   />
  // ) : (
  return valid ? (
    <App username={username} isAdmin={isAdmin} dept={dept} logout={setValid} />
  ) : (
    <Wrapper>
      <TitleDiv>
        <div>Hello there! Welcome to our (MINE) tiny little app.</div>
      </TitleDiv>
      <form>
        <UsernameField error={userWrong} message={userMessage} />
        <PasswordField error={passWrong} message={passMessage} />

        <SubmitDiv>
          <Button
            style={{ background: "black", color: "white" }}
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
