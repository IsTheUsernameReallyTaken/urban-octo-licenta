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
  Tooltip,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

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

  font-size: 1.2em;
`;

const ButtonsFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const ScrollDiv = styled.div`
  height: 45vh;
  width: 150%;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const SubmitDiv = styled.div`
  margin-top: 20px;
  padding: 5px;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PopUpList(props) {
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

  function getTime(date1) {
    let time = "",
      now = Date.now(),
      duration;

    duration = now / 1000 - date1.seconds;

    let secunde, minute, ore, zile;
    secunde = Math.floor(duration % 60);
    minute = Math.floor((duration / 60) % 60);
    ore = Math.floor(duration / 60 / 60);
    zile = Math.floor(duration / 60 / 60 / 24);

    if (zile > 0) {
      time = zile + "d " + (ore - zile * 24) + "h ago";
    } else {
      time = ore + "h " + minute + "m ago";
    }

    return time;
  }

  function showUsers() {
    let obj = {};

    obj = (
      <div>
        {users.map((useri) => {
          return (
            <TextFieldDiv>
              <Alert
                severity={
                  useri.online
                    ? "success"
                    : useri.lastOnline !== ""
                    ? "warning"
                    : "error"
                }
              >
                {useri.username} (D{useri.department.replace(/[^0-9]/g, "")}) -{" "}
                {useri.online
                  ? "online"
                  : useri.lastOnline !== ""
                  ? "last online " + getTime(useri.lastOnline)
                  : "never logged in"}
              </Alert>
            </TextFieldDiv>
          );
        })}
      </div>
    );

    return obj;
  }

  return props.show ? (
    <WrapperDiv>
      <form>
        {/* <TitleDiv>
          <div>Here you will see the users</div>
        </TitleDiv> */}

        <ScrollDiv>{showUsers()}</ScrollDiv>

        <CenterDiv>
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
        </CenterDiv>
      </form>
    </WrapperDiv>
  ) : (
    <div />
  );
}
