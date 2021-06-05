import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import firebase from "../firebase";
import "firebase/firestore";

const WrapperDiv = styled.div`
  position: fixed;
  top: 20%;
  left: 20%;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

  width: 60%;
  height: 60vh;

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

export default function PopUpUserEdit(props) {
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

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserError, setSelectedUserError] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [selectedUserID, setSelectedUserID] = useState("");
  const [selectedUserUsername, setSelectedUserUsername] = useState("");
  const [selectedUserPassword, setSelectedUserPassword] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedUserSurname, setSelectedUserSurname] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [selectedUserDept, setSelectedUserDept] = useState("");

  //edit mode stuff that I took from PopUpUser.jsx

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

  function getDepts() {
    let departamente = [];

    for (let i = 0; i < users.length; i++) {
      departamente[departamente.length] = users[i].department;
    }

    departamente = Array.from(new Set(departamente));

    return departamente;
  }

  function deleteUser(id) {
    refUsers
      .doc(id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  function onUserDelete() {
    if (selectedUser === "") {
      setSelectedUserError(true);
      return;
    }

    deleteUser(selectedUser);
    props.showFunction(false);
  }

  function onUserEdit() {
    console.log("Edit");
  }

  function getUserInfo(id) {
    users.forEach((useri) => {
      if (useri.id === id) {
        setSelectedUserID(id);
        setSelectedUserUsername(useri.username);
        setSelectedUserName(useri.name);
        setSelectedUserSurname(useri.surname);
        setSelectedUserDept(useri.dept);
        setSelectedUserEmail(useri.email);
      }
    });
  }

  return props.show ? (
    editMode === false ? (
      <WrapperDiv>
        <form>
          <TitleDiv>
            <div>Choose the user you'd like to edit</div>
          </TitleDiv>

          <TextFieldDiv>
            <FormControl
              style={{ minWidth: "72.5%" }}
              variant="outlined"
              error={selectedUserError}
            >
              <InputLabel>Users</InputLabel>
              <Select
                label="Users"
                disabled={users.length === 0}
                onChange={(event) => {
                  setSelectedUser(event.target.value);
                  setSelectedUserError(false);
                }}
              >
                {users.map((useri) => {
                  return (
                    <MenuItem
                      key={useri.id}
                      value={useri.id}
                      // disabled={useri.id.includes("admin")}
                    >
                      User #{useri.id.replace(/[^0-9]/g, "")} - D
                      {useri.department.replace(/[^0-9]/g, "")}: {useri.name}{" "}
                      {useri.surname}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {selectedUserError ? "Please select an user" : ""}
              </FormHelperText>
            </FormControl>
          </TextFieldDiv>

          <ButtonsFlexDiv>
            <SubmitDiv>
              <Button
                style={{ background: "black", color: "white" }}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  // console.log(selectedUser);
                  if (selectedUser === "") {
                    setSelectedUserError(true);
                    return;
                  } else {
                    setSelectedUserError(false);
                  }

                  console.log(selectedUser);
                  getUserInfo(selectedUser);
                  setEditMode(true);
                }}
              >
                EDIT USER
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
          </ButtonsFlexDiv>
        </form>
      </WrapperDiv>
    ) : (
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
                <FormHelperText>
                  {deptError ? "Please select a department" : ""}
                </FormHelperText>
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
                style={{ background: "black", color: "white" }}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  //   onUserAdd();
                }}
              >
                EDIT USER
              </Button>
            </SubmitDiv>

            <SubmitDiv>
              <Button
                style={{ background: "black", color: "white" }}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  setSelectedUser("");
                  setEditMode(false);
                }}
              >
                BACK
              </Button>
            </SubmitDiv>

            <SubmitDiv>
              <Button
                style={{ background: "black", color: "white" }}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  setSelectedUser("");
                  setEditMode(false);
                  props.showFunction(false);
                }}
              >
                EXIT
              </Button>
            </SubmitDiv>
          </ButtonsFlexDiv>
        </form>
      </WrapperDiv>
    )
  ) : (
    <div />
  );
}
