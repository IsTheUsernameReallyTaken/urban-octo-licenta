import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PopUpUser(props) {
  const classes = useStyles();
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [surnameEmpty, setSurnameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  //const [deptEmpty, setDeptEmpty] = useState(false);
  const [nonExistentDept, setNonExistentDept] = useState(false);

  const [selectedDept, setSelectedDept] = useState("");
  const [newDept, setNewDept] = useState(false);
  const [hiddenPass, setHiddenPass] = useState(true);

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
    const password = document.getElementById("passwordField").value;
    //const dept = document.getElementById("deptField").value;

    let foundTakenUsername = false;

    if (username.length === 0) {
      setUsernameEmpty(true);
      return;
    } else {
      setUsernameEmpty(false);
    }

    users.forEach((useri) => {
      if (useri.username === username) {
        foundTakenUsername = true;
      }
    });

    if (foundTakenUsername == true) {
      setUsernameTaken(true);
      return;
    } else {
      setUsernameTaken(false);
    }

    if (name.length === 0) {
      setNameEmpty(true);
      return;
    } else {
      setNameEmpty(false);
    }

    if (surname.length === 0) {
      setSurnameEmpty(true);
      return;
    } else {
      setSurnameEmpty(false);
    }

    if (password.length === 0) {
      setPasswordEmpty(true);
      return;
    } else {
      setPasswordEmpty(false);
    }

    {
      /*
      if (dept.length === 0) {
        setDeptEmpty(true);
        return;
      } else {
        setDeptEmpty(false);
      }
    */
    }
  }

  function getDepts() {
    let departamente = [];

    for (let i = 0; i < users.length; i++) {
      departamente[departamente.length] = users[i].department;
    }

    departamente = Array.from(new Set(departamente));

    console.log("Departamentele sunt ");
    console.log(departamente);

    return departamente;
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
            error={passwordEmpty}
            helperText={passwordEmpty ? "Password cannot be empty" : ""}
            id="passwordField"
            variant="outlined"
            label="Password"
            type={hiddenPass ? "password" : ""}
          />
          <Checkbox
            onChange={() => {
              setHiddenPass(!hiddenPass);
            }}
            id="passCheckBox"
            color="default"
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <FormControl style={{ minWidth: "62%" }} variant="outlined">
            <InputLabel id="deptSelect">Department</InputLabel>
            <Select
              labelId="deptSelect"
              id="select"
              label="Department"
              onChange={(event) => {
                console.log("Ati ales valoarea ");
                console.log(event.target.value);
              }}
            >
              {getDepts().map((departamente) => {
                return (
                  <MenuItem key={departamente} value={departamente}>
                    {departamente}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </TextFieldDiv>
        {/*
            <FormControlLabel
              control={
                <Checkbox onChange={() => {}} id="newDeptID" color="default" />
              }
              label="New department?"
            />
            */}

        {/*
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        */}

        {/*
          <TextFieldDiv>
            <TextField
              error={deptEmpty}
              helperText={deptEmpty ? "Department ID cannot be empty" : ""}
              id="deptField"
              variant="outlined"
              label="Department ID"
            />
          </TextFieldDiv>
        */}
        <TextFieldDiv>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => {}}
                id="adminCheckbox"
                color="default"
              />
            }
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
