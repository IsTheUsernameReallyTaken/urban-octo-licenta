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

export default function PopUpUser(props) {
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [nameEmpty, setNameEmpty] = useState(false);
  const [surnameEmpty, setSurnameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);

  const [deptError, setDeptError] = useState(false);
  const [deptErrorMessage, setDeptErrorMessage] = useState("");

  const [adminRights, setAdminRights] = useState(false);
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
    let dept;
    let id;

    let foundTakenUsername = false;

    if (username.length === 0) {
      setUsernameError(true);
      setUsernameErrorMessage("Username cannot be empty");
      //
      setNameEmpty(false);
      setSurnameEmpty(false);
      setPasswordEmpty(false);
      setDeptError(false);
      setDeptErrorMessage("");
      return;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    users.forEach((useri) => {
      if (useri.username === username) {
        foundTakenUsername = true;
      }
    });

    if (foundTakenUsername == true) {
      setUsernameError(true);
      setUsernameErrorMessage("Username is already taken");
      //
      setNameEmpty(false);
      setSurnameEmpty(false);
      setPasswordEmpty(false);
      setDeptError(false);
      setDeptErrorMessage("");
      return;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }

    if (name.length === 0) {
      setNameEmpty(true);
      //
      setSurnameEmpty(false);
      setPasswordEmpty(false);
      setDeptError(false);
      setDeptErrorMessage("");
      return;
    } else {
      setNameEmpty(false);
    }

    if (surname.length === 0) {
      setSurnameEmpty(true);
      //
      setPasswordEmpty(false);
      setDeptError(false);
      setDeptErrorMessage("");
      return;
    } else {
      setSurnameEmpty(false);
    }

    if (password.length === 0) {
      setPasswordEmpty(true);
      //
      setDeptError(false);
      setDeptErrorMessage("");
      return;
    } else {
      setPasswordEmpty(false);
    }

    if (newDept === true) {
      dept = document.getElementById("deptField").value;
      if (dept.length === 0) {
        setDeptError(true);
        setDeptErrorMessage("Dept. ID cannot be empty");
        return;
      } else {
        if (dept.replace(/[^0-9]/g, "") != dept) {
          setDeptError(true);
          setDeptErrorMessage("Please only submit the ID number");
          return;
        } else {
          let departamentulExistaDeja = false;
          let sirDepartamente = getDepts();
          sirDepartamente.forEach((toateDepartamentele) => {
            if (toateDepartamentele === "dept-" + dept) {
              departamentulExistaDeja = true;
            }
          });
          if (departamentulExistaDeja) {
            setDeptError(true);
            setDeptErrorMessage("This deparment already exists");
            return;
          } else {
            setDeptError(false);
            setDeptErrorMessage("");
          }
        }
      }
    } else {
      if (selectedDept === "") {
        setDeptError(true);
        setDeptErrorMessage("");
        return;
      } else {
        setDeptError(false);
        setDeptErrorMessage("");
      }
    }

    if (adminRights) {
      id = "admin-" + (users.length + 1);
    } else {
      id = "user-" + (users.length + 1);
    }

    let finalDept = "";

    if (newDept) {
      dept = "dept-" + dept;
      finalDept = dept;
    } else {
      finalDept = selectedDept;
    }

    console.log("username: " + username);
    console.log("id:" + id);
    console.log("name: " + name);
    console.log("surname: " + surname);
    console.log("password: " + password);
    console.log("dept: " + finalDept);
  }

  function getDepts() {
    let departamente = [];

    for (let i = 0; i < users.length; i++) {
      departamente[departamente.length] = users[i].department;
    }

    departamente = Array.from(new Set(departamente));

    //console.log("Departamentele sunt ");
    //console.log(departamente);

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
            error={usernameError}
            helperText={usernameError ? usernameErrorMessage : ""}
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

        {!newDept ? (
          <TextFieldDiv>
            <FormControl
              style={{ minWidth: "62%" }}
              variant="outlined"
              error={deptError}
            >
              <InputLabel id="deptSelect">Department</InputLabel>
              <Select
                labelId="deptSelect"
                id="select"
                label="Department"
                onChange={(event) => {
                  //console.log("Ati ales valoarea ");
                  //console.log(event.target.value);
                  setSelectedDept(event.target.value);
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
            <Checkbox
              onChange={() => {
                setNewDept(!newDept);
              }}
              id="newDeptCheckbox1"
              color="default"
            />
          </TextFieldDiv>
        ) : (
          <div />
        )}

        {newDept ? (
          <TextFieldDiv>
            <TextField
              error={deptError}
              helperText={deptError ? deptErrorMessage : ""}
              id="deptField"
              variant="outlined"
              label="New Department"
            />
            <Checkbox
              onChange={() => {
                setNewDept(!newDept);
              }}
              id="newDeptCheckbox2"
              color="default"
            />
          </TextFieldDiv>
        ) : (
          <div />
        )}
        <TextFieldDiv>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => {
                  setAdminRights(!adminRights);
                }}
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
