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

export default function PopUpList(props) {
  const [lists, setLists] = useState([]);

  const [titleError, setTitleError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");

  const [emptyTextError, setEmptyTextError] = useState(false);

  const refLists = firebase.firestore().collection("lists");

  function getLists() {
    refLists.onSnapshot((querySnapshot) => {
      const listItems = [];
      querySnapshot.forEach((document) => {
        listItems.push(document.data());
      });
      setLists(listItems);
    });
  }

  function addList(newList) {
    refLists
      .doc(newList.id)
      .set(newList)
      .catch((err) => {
        console.error(err);
      });
  }

  function onListAdd() {
    const listTitle = document.getElementById("listTitleField").value;
    const listEmptyText = document.getElementById("emptyTextField").value;

    if (listTitle.length === 0) {
      setTitleError(true);
      setTitleErrorMessage("Title cannot be empty");
      return;
    } else {
      setTitleError(false);
    }

    let maxID = 0;

    lists.forEach((listele) => {
      if (listele.id.replace(/[^0-9]/g, "") > maxID) {
        maxID = parseInt(listele.id.replace(/[^0-9]/g, ""));
      }
    });

    const listID = "list-" + (maxID + 1);

    const newList = {
      id: listID,
      title: listTitle,
      //   emptyText: listEmptyText.length === 0 ? "List is empty" : listEmptyText,
      emptyText: listEmptyText,
      hasCards: [],
    };

    console.log(newList);
    addList(newList);

    setTitleError(false);
    setEmptyTextError(false);
    props.showFunction(false);
  }

  useEffect(() => {
    getLists();
  }, []);

  return props.show ? (
    <WrapperDiv>
      <form>
        <TitleDiv>
          <div>Insert the title for the list you'd like to add</div>
        </TitleDiv>
        <TextFieldDiv>
          <TextField
            error={titleError}
            helperText={titleError ? titleErrorMessage : ""}
            id="listTitleField"
            variant="outlined"
            label="List Title"
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={emptyTextError}
            helperText={emptyTextError ? "" : ""}
            id="emptyTextField"
            variant="outlined"
            label="List Empty Text (optional)"
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
                onListAdd();
              }}
            >
              ADD LIST
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
