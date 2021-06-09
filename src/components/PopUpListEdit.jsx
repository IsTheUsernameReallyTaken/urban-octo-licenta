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

import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

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

const HelpIconDiv = styled.div`
  margin: 10px;
`;

export default function PopUpListEdit(props) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedList, setSelectedList] = useState("");
  const [selectedListError, setSelectedListError] = useState(false);

  const [emptyTitle, setEmptyTitle] = useState(false);

  const refUsers = firebase.firestore().collection("usernames");
  const refLists = firebase.firestore().collection("lists");
  const refCards = firebase.firestore().collection("cards");

  const [selectedListID, setSelectedListID] = useState("");
  const [selectedListTitle, setSelectedListTitle] = useState("");
  const [selectedListEmptyText, setSelectedListEmptyText] = useState("");

  const [newListTitle, setNewListTitle] = useState("");
  const [newEmptyText, setNewEmptyText] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [identicalError, setIdenticalError] = useState(false);

  const [disabledDept, setDisabledDept] = useState(false);

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

  function addCard(newCard) {
    refCards
      .doc(newCard.id)
      .set(newCard)
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

  function updateCard(updatedCard) {
    refCards
      .doc(updatedCard.id)
      .update(updatedCard)
      .catch((err) => {
        console.error(err);
      });
  }

  function onListEdit() {
    const oldList = {
      id: selectedListID,
      title: selectedListTitle,
      emptyText: selectedListEmptyText,
    };

    const newList = {
      id: selectedListID,
      title: newListTitle,
      emptyText: newEmptyText,
    };

    console.log(oldList);
    console.log(newList);

    if (newListTitle.length === 0) {
      setEmptyTitle(true);
      return;
    } else {
      setEmptyTitle(false);
    }

    if (
      newList.title === oldList.title &&
      newList.emptyText === oldList.emptyText
    ) {
      setIdenticalError(true);
      return;
    } else {
      setIdenticalError(false);
    }

    updateList(newList);
    setEmptyTitle(false);
    setSelectedListError(false);
    setIdenticalError(false);

    setEditMode(false);
    props.showFunction(false);
  }

  function getListTitleAndEmptyText() {
    lists.forEach((listele) => {
      if (listele.id === selectedList) {
        setSelectedListID(listele.id);
        setSelectedListTitle(listele.title);
        if (listele.emptyText === "List is empty") {
          setSelectedListEmptyText("");
        } else {
          setSelectedListEmptyText(listele.emptyText);
        }

        setNewListTitle(listele.title);
        if (listele.emptyText === "List is empty") {
          setNewEmptyText("");
        } else {
          setNewEmptyText(listele.emptyText);
        }
      }
    });
  }

  useEffect(() => {
    getLists();
  }, []);

  return props.show ? (
    editMode === false ? (
      <WrapperDiv>
        <form>
          <TitleDiv>
            <div>Choose the list you'd like to edit</div>
          </TitleDiv>

          <TextFieldDiv>
            <FormControl
              style={{ minWidth: "72.5%" }}
              variant="outlined"
              error={selectedListError}
            >
              <InputLabel>Lists</InputLabel>
              <Select
                label="Lists"
                disabled={lists.length === 0}
                onChange={(event) => {
                  setSelectedList(event.target.value);
                  setSelectedListError(false);
                }}
              >
                {lists.map((listele) => {
                  return (
                    <MenuItem key={listele.id} value={listele.id}>
                      List #{listele.id.replace(/[^0-9]/g, "")} -{" "}
                      {listele.title}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {selectedListError ? "Please select a list" : ""}
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
                  if (selectedList === "") {
                    setSelectedListError(true);
                    return;
                  } else {
                    setSelectedListError(false);
                  }
                  setEditMode(true);
                  getListTitleAndEmptyText(selectedList);
                  setSelectedListID(selectedList);
                }}
              >
                EDIT LIST
              </Button>
            </SubmitDiv>

            <SubmitDiv>
              <Button
                style={{ background: "black", color: "white" }}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  setSelectedList("");
                  setSelectedListError(false);
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
              Edit the chosen list (list #{selectedList.replace(/[^0-9]/g, "")})
            </div>
          </TitleDiv>

          <TextFieldDiv>
            <TextField
              error={emptyTitle || identicalError}
              helperText={
                emptyTitle
                  ? "You need to add a title description."
                  : identicalError
                  ? "No changes were made"
                  : ""
              }
              id="editListTitleField"
              variant="outlined"
              label="List Title"
              value={newListTitle}
              onChange={(event) => {
                setNewListTitle(event.target.value);
              }}
            />
          </TextFieldDiv>

          <TextFieldDiv>
            <TextField
              multiline
              rows={4}
              style={{ minWidth: "82.4%" }}
              error={identicalError}
              id="editListEmptyTextField"
              variant="outlined"
              label="Empty Text"
              value={newEmptyText}
              onChange={(event) => {
                setNewEmptyText(event.target.value);
              }}
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
                  onListEdit();
                }}
              >
                Save
              </Button>
            </SubmitDiv>

            <SubmitDiv>
              <Button
                style={{ background: "black", color: "white" }}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  setSelectedList("");
                  setSelectedListTitle("");

                  setSelectedListError(false);
                  setEmptyTitle(false);

                  setEditMode(false);
                }}
              >
                Back
              </Button>
            </SubmitDiv>

            <SubmitDiv>
              <Button
                style={{ background: "black", color: "white" }}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  setSelectedList("");
                  setSelectedListError(false);
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
