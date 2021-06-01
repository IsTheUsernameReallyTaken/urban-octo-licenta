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

export default function PopUpUserDelete(props) {
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
  const [selectError, setSelectError] = useState(false);

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
      setSelectError(true);
      return;
    }

    deleteUser(selectedUser);
  }

  return props.show ? (
    <WrapperDiv>
      <form>
        <TitleDiv>
          <div>Choose the user you'd like to delete</div>
        </TitleDiv>

        <TextFieldDiv>
          <FormControl
            style={{ minWidth: "72.5%" }}
            variant="outlined"
            error={selectError}
          >
            <InputLabel>Users</InputLabel>
            <Select
              label="Users"
              disabled={users.length === 0}
              onChange={(event) => {
                setSelectedUser(event.target.value);
                setSelectError(false);
              }}
            >
              {users.map((useri) => {
                return (
                  <MenuItem
                    key={useri.id}
                    value={useri.id}
                    disabled={useri.id.includes("admin")}
                  >
                    User #{useri.id.replace(/[^0-9]/g, "")} - D
                    {useri.department.replace(/[^0-9]/g, "")}: {useri.name}{" "}
                    {useri.surname}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {selectError ? "Please select an user" : ""}
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
                onUserDelete();
              }}
            >
              DELETE USER
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
    <div />
  );
}
