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

  function showUsers() {
    let obj = {};

    obj = (
      <div>
        <ul>
          {users.map((useri) => {
            return <li>{useri.username}</li>;
          })}
        </ul>
      </div>
    );

    return obj;
  }

  return props.show ? (
    <WrapperDiv>
      <form>
        <TitleDiv>
          <div>Here you will see the users</div>
        </TitleDiv>

        {showUsers()}

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
      </form>
    </WrapperDiv>
  ) : (
    <div />
  );
}
