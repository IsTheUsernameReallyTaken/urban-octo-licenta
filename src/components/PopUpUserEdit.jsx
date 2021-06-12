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

  const [newUserID, setNewUserID] = useState("");
  const [newUserUsername, setNewUserUsername] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserSurname, setNewUserSurname] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserDept, setNewUserDept] = useState("");

  //edit mode stuff that I took from PopUpUser.jsx

  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [nameEmpty, setNameEmpty] = useState(false);
  const [surnameEmpty, setSurnameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);

  const [emailEmpty, setEmailEmpty] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);

  const [deptError, setDeptError] = useState(false);
  const [deptErrorMessage, setDeptErrorMessage] = useState("");

  const [adminRights, setAdminRights] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [newDept, setNewDept] = useState(false);
  const [hiddenPass, setHiddenPass] = useState(true);

  const [checkboxValue, setCheckboxValue] = useState(false);

  function getDepts() {
    let departamente = [];

    for (let i = 0; i < users.length; i++) {
      departamente[departamente.length] = users[i].department;
    }

    departamente = Array.from(new Set(departamente));

    return departamente;
  }

  function addUser(userToAdd) {
    refUsers
      .doc(userToAdd.id)
      .set(userToAdd)
      .catch((err) => {
        console.error(err);
      });
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

  function updateUser(updatedUser) {
    refUsers
      .doc(updatedUser.id)
      .update(updatedUser)
      .catch((err) => {
        console.error(err);
      });
  }

  function onUserEdit() {
    const username = document.getElementById("usernameField").value;
    const name = document.getElementById("nameField").value;
    const surname = document.getElementById("surnameField").value;
    // const password = document.getElementById("passwordField").value;
    const email = document.getElementById("emailField").value;
    let dept;
    let id = selectedUserID;

    let foundTakenUsername = false;

    // let exemplu = "exemplu@gmail.com";
    // console.log(exemplu);
    // console.log(exemplu.endsWith("@gmail.com"));

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
      if (useri.username === username && username !== selectedUserUsername) {
        foundTakenUsername = true;
      }
    });

    if (foundTakenUsername === true) {
      setUsernameError(true);
      setUsernameErrorMessage("Username is already taken");
      //
      setNameEmpty(false);
      setSurnameEmpty(false);
      setPasswordEmpty(false);
      setEmailEmpty(false);
      setEmailInvalid(false);
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
      setEmailEmpty(false);
      setEmailInvalid(false);
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
      setEmailEmpty(false);
      setEmailInvalid(false);
      setDeptError(false);
      setDeptErrorMessage("");
      return;
    } else {
      setSurnameEmpty(false);
    }

    if (email.length === 0) {
      setEmailEmpty(true);
      //
      setEmailInvalid(false);
      setDeptError(false);
      setDeptErrorMessage("");
      return;
    } else {
      setEmailEmpty(false);
    }

    console.log(email);

    if (
      email.endsWith("@firma.com") === false &&
      email.endsWith("@gmail.com") === false &&
      email.endsWith("@yahoo.com") === false
    ) {
      setEmailInvalid(true);
      //
      setDeptError(false);
      setDeptErrorMessage("");
      return;
    } else {
      setEmailInvalid(false);
    }
    if (newDept === true) {
      dept = document.getElementById("deptField").value;
      if (dept.length === 0) {
        setDeptError(true);
        setDeptErrorMessage("Dept. ID cannot be empty");
        return;
      } else {
        if (dept.replace(/[^0-9]/g, "") !== dept) {
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
      if (newUserDept === "") {
        setDeptError(true);
        setDeptErrorMessage("");
        return;
      } else {
        setDeptError(false);
        setDeptErrorMessage("");
      }
    }

    const oldUser = {
      id: selectedUserID,
      username: selectedUserUsername,
      name: selectedUserName,
      surname: selectedUserSurname,
      department: selectedUserDept,
      email: selectedUserEmail,
    };

    let finalID = "";

    if (!selectedUserID.includes("admin") && checkboxValue === true) {
      finalID = "admin-" + selectedUserID.replace(/[^0-9]/g, "");
    } else {
      finalID = selectedUserID;
    }

    let finalDept = "";

    if (newDept) {
      dept = "dept-" + dept;
      finalDept = dept;
    } else {
      finalDept = newUserDept;
    }

    const newUser = {
      id: finalID,
      username: username,
      name: name,
      surname: surname,
      email: email,
      department: finalDept,
    };

    console.log(oldUser);
    console.log(newUser);

    if (
      oldUser.id === newUser.id &&
      oldUser.username === newUser.username &&
      oldUser.name === newUser.name &&
      oldUser.surname === newUser.surname &&
      oldUser.department === newUser.department &&
      oldUser.email === newUser.email
    ) {
      console.log("Nu s-a modificat nimic");
      setUsernameError(true);
      setUsernameErrorMessage("No changes have been made");
      return;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
      console.log("Au avut loc modificari");
    }

    if (!selectedUserID.includes("admin") && finalID.includes("admin")) {
      deleteUser(selectedUserID);
      addUser(newUser);
    } else {
      updateUser(newUser);
    }

    setEditMode(false);
    setNewDept(false);
    setSelectedUser("");
    props.showFunction(false);
  }

  function getUserInfo(id) {
    users.forEach((useri) => {
      if (useri.id === id) {
        setSelectedUserID(id);
        setSelectedUserUsername(useri.username);
        setSelectedUserName(useri.name);
        setSelectedUserSurname(useri.surname);
        setSelectedUserDept(useri.department);
        setSelectedUserEmail(useri.email);

        setNewUserID(id);
        setNewUserUsername(useri.username);
        setNewUserName(useri.name);
        setNewUserSurname(useri.surname);
        setNewUserDept(useri.department);
        setNewUserEmail(useri.email);

        setCheckboxValue(useri.id.includes("admin"));
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
                {selectedUserError ? "Please select a user" : ""}
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
            <div>
              Edit the details of user #{selectedUserID.replace(/[^0-9]/g, "")}{" "}
              - {selectedUserUsername}
            </div>
          </TitleDiv>
          <TextFieldDiv>
            <TextField
              error={usernameError}
              helperText={usernameError ? usernameErrorMessage : ""}
              id="usernameField"
              variant="outlined"
              label="Username"
              value={newUserUsername}
              onChange={(event) => {
                setNewUserUsername(event.target.value);
              }}
            />
          </TextFieldDiv>
          <TextFieldDiv>
            <TextField
              error={nameEmpty}
              helperText={nameEmpty ? "Name cannot be empty" : ""}
              id="nameField"
              variant="outlined"
              label="Name"
              value={newUserName}
              onChange={(event) => {
                setNewUserName(event.target.value);
              }}
            />
          </TextFieldDiv>
          <TextFieldDiv>
            <TextField
              error={surnameEmpty}
              helperText={surnameEmpty ? "Surname cannot be empty" : ""}
              id="surnameField"
              variant="outlined"
              label="Surname"
              value={newUserSurname}
              onChange={(event) => {
                setNewUserSurname(event.target.value);
              }}
            />
          </TextFieldDiv>
          <TextFieldDiv>
            <TextField
              error={emailEmpty || emailInvalid}
              helperText={
                emailEmpty
                  ? "Email cannot be empty"
                  : emailInvalid
                  ? "Mail is invalid"
                  : ""
              }
              id="emailField"
              variant="outlined"
              label="Email"
              value={newUserEmail}
              onChange={(event) => {
                setNewUserEmail(event.target.value);
              }}
              //   type={hiddenPass ? "password" : ""}
            />
            {/* <Checkbox
              onChange={() => {
                setHiddenPass(!hiddenPass);
              }}
              id="passCheckBox"
              color="default"
            /> */}
          </TextFieldDiv>

          {!newDept ? (
            <TextFieldDiv>
              <FormControl
                style={{ minWidth: "70.5%" }}
                variant="outlined"
                error={deptError}
              >
                <InputLabel id="deptSelect">Department</InputLabel>
                <Select
                  labelId="deptSelect"
                  id="select"
                  label="Department"
                  defaultValue={newUserDept}
                  onChange={(event) => {
                    //console.log("Ati ales valoarea ");
                    //console.log(event.target.value);
                    setNewUserDept(event.target.value);
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
                  checked={checkboxValue}
                  disabled={selectedUserID.includes("admin")}
                  onChange={() => {
                    setCheckboxValue(!checkboxValue);
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

                  console.clear();
                  onUserEdit();
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
                  setNewDept(false);
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
                  setNewDept(false);
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
