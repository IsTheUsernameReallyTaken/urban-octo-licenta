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

export default function PopUpListDelete(props) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

  const [selectedList, setSelectedList] = useState("");
  const [selectError, setSelectError] = useState(false);

  const refLists = firebase.firestore().collection("lists");
  const refCards = firebase.firestore().collection("cards");

  function getLists() {
    refLists.onSnapshot((querySnapshot) => {
      const listItems = [];
      querySnapshot.forEach((document) => {
        listItems.push(document.data());
      });
      setLists(listItems);
    });
  }

  function getCards() {
    refCards.onSnapshot((querySnapshot) => {
      const cardItems = [];
      querySnapshot.forEach((document) => {
        cardItems.push(document.data());
      });
      setCards(cardItems);
    });
  }

  function deleteList(id) {
    refLists
      .doc(id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  function updateList(updatedList) {
    refLists
      .doc(updatedList.id)
      .update(updatedList)
      .catch((err) => {
        console.error(err);
      });
  }

  function onListDelete() {
    // console.log(selectedList);

    if (selectedList === "") {
      setSelectError(true);
      return;
    } else {
      setSelectError(false);
    }

    deleteList(selectedList);
    props.showFunction(false);
  }

  useEffect(() => {
    getCards();
    getLists();
  }, []);

  function isDisabled(listID) {
    if (
      listID === "list-1" ||
      listID === "list-2" ||
      listID === "list-3" ||
      listID === "list-4m"
    ) {
      return true;
    }
    return false;
  }

  return props.show ? (
    <WrapperDiv>
      <form>
        <TitleDiv>
          <div>Choose the list you'd like to delete</div>
        </TitleDiv>

        <TextFieldDiv>
          <FormControl
            style={{ minWidth: "72.5%" }}
            variant="outlined"
            error={selectError}
          >
            <InputLabel>Lists</InputLabel>
            <Select
              label="Lists"
              disabled={lists.length === 0}
              onChange={(event) => {
                setSelectedList(event.target.value);
                setSelectError(false);
              }}
            >
              {lists.map((listele) => {
                return (
                  <MenuItem
                    key={listele.id}
                    value={listele.id}
                    disabled={isDisabled(listele.id)}
                  >
                    List #{listele.id.replace(/[^0-9]/g, "")} - {listele.title}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {selectError ? "Please select a list" : ""}
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
                onListDelete();
              }}
            >
              Delete List
            </Button>
          </SubmitDiv>

          <SubmitDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                setSelectError(false);
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
