import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Button, TextField, Checkbox } from "@material-ui/core";

import firebase from "../firebase";
import "firebase/firestore";

const Wrapper = styled.div`
  position: fixed;
  width: 64%;
  height: 64vh;

  top: 18%;
  left: 18%;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

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

export default function AccountSettings(props) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurrnameError] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

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

  function onSaveChanges() {
    let id;
    users.forEach((useri) => {
      if (useri.username === props.username) {
        id = useri.id;
      }
    });

    const oldUser = {
      id: id,
      username: username,
      name: name,
      surname: surname,
      email: email,
    };

    let newUsername = document.getElementById("usernameField").value;

    const newUser = {
      id: id,
      username: newUsername,
      name: newName,
      surname: newSurname,
      email: newEmail,
    };

    console.log(oldUser);
    console.log(newUser);
  }

  function getInfo(username) {
    users.forEach((useri) => {
      if (useri.username === username) {
        setUsername(useri.username);
        setName(useri.name);
        setSurname(useri.surname);
        setEmail(useri.email);

        setNewUsername(useri.username);
        setNewName(useri.name);
        setNewSurname(useri.surname);
        setNewEmail(useri.email);
      }
    });
  }

  return props.show ? (
    <Wrapper>
      {/* {getInfo(props.username)} */}
      <ColumnFlex>
        <TitleDiv>Account Information for {props.username}</TitleDiv>
        {/* {getInfo(props.username)} */}
        <TextFieldDiv>
          <TextField
            error={usernameError}
            helperText={usernameError ? usernameErrorMessage : ""}
            id="usernameField"
            variant="outlined"
            label="Username"
            value={newUsername}
            onChange={(event) => {
              console.log(event.target.value);
              setNewUsername(event.target.value);
            }}
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={nameError}
            helperText={nameError ? "Name cannot be empty" : ""}
            id="nameField"
            variant="outlined"
            label="Name"
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={surnameError}
            helperText={surnameError ? "Surname cannot be empty" : ""}
            id="surnameField"
            variant="outlined"
            label="Surname"
            value={newSurname}
            onChange={(event) => {
              setNewSurname(event.target.value);
            }}
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={emailError}
            helperText={emailError ? emailErrorMessage : ""}
            id="emailField"
            variant="outlined"
            label="Email"
            value={newEmail}
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
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
                onSaveChanges();
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
