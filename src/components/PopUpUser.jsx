import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { TextField, Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";

import firebase from "../firebase";
import "firebase/firestore";

const WrapperDiv = styled.div`
  position: fixed;
  top: 10%;
  left: 10%;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

  width: 80%;
  height: 80vh;

  background: white;

  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.div`
  margin-bottom: 20px;
  font-size: 1.2em;
`;

const TextFieldDiv = styled.div`
  margin-top: 10px;
  padding: 5px;
`;

const ButtonsFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubmitDiv = styled.div`
  margin-top: 20px;
  padding: 5px;
`;

class TextFieldCompt extends React.Component {
  render() {
    return (
      <TextFieldDiv>
        <TextField
          error={this.props.error}
          helperText={this.props.error ? "No department with this ID" : ""}
          id="deptID"
          variant="outlined"
          label="Department"
        />
      </TextFieldDiv>
    );
  }
}

export default function PopUpUser(props) {
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [surnameEmpty, setSurnameEmpty] = useState(false);
  const [deptEmpty, setDeptEmpty] = useState(false);
  const [nonExistentDept, setNonExistentDept] = useState(false);

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

  function onUserAdd() {
    const username = document.getElementById("usernameField").value;
    const name = document.getElementById("nameField").value;
    const surname = document.getElementById("surnameField").value;
    const dept = document.getElementById("deptField").value;

    let foundTakenUsername = false;

    if (username.length === 0) {
      setUsernameEmpty(true);
    } else {
      setUsernameEmpty(false);
    }

    users.forEach((useri) => {
      if (useri.username === username) {
        setUsernameTaken(true);
        foundTakenUsername = true;
      }
    });

    if (foundTakenUsername != true) {
      setUsernameTaken(false);
    }

    if (name.length === 0) {
      setNameEmpty(true);
    } else {
      setNameEmpty(false);
    }

    if (surname.length === 0) {
      setSurnameEmpty(true);
    } else {
      setSurnameEmpty(false);
    }

    if (dept.length === 0) {
      setDeptEmpty(true);
    } else {
      setDeptEmpty(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return props.show ? (
    <WrapperDiv>
      <form>
        <TitleDiv>
          <div>Insert the details of the person you'd like to add.</div>
        </TitleDiv>
        <TextFieldDiv>
          <TextField
            error={usernameEmpty || usernameTaken}
            helperText={
              usernameEmpty
                ? "Username cannot be empty"
                : usernameTaken
                ? "Username is already taken"
                : ""
            }
            id="usernameField"
            variant="outlined"
            label="Username"
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={nameEmpty}
            helperText={nameEmpty ? "Name cannot be empty" : ""}
            id="nameField"
            variant="outlined"
            label="Name"
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={surnameEmpty}
            helperText={surnameEmpty ? "Surname cannot be empty" : ""}
            id="surnameField"
            variant="outlined"
            label="Surname"
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={deptEmpty}
            helperText={deptEmpty ? "Department ID cannot be empty" : ""}
            id="deptField"
            variant="outlined"
            label="Department ID"
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <FormControlLabel
            control={<Checkbox id="adminCheckbox" color="default" />}
            label="Administrator rights?"
          />
        </TextFieldDiv>

        <ButtonsFlexDiv>
          <SubmitDiv>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                onUserAdd();
              }}
            >
              ADD USER
            </Button>
          </SubmitDiv>

          <SubmitDiv>
            <Button
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
        </ButtonsFlexDiv>
      </form>
    </WrapperDiv>
  ) : (
    <div />
  );
}
