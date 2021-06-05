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

export default function PopUpCardEdit(props) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);

  const [deptError, setDeptError] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");

  const [selectedCard, setSelectedCard] = useState("");
  const [selectError, setSelectError] = useState(false);

  const [emptyTitle, setEmptyTitle] = useState(false);

  const refUsers = firebase.firestore().collection("usernames");
  const refLists = firebase.firestore().collection("lists");
  const refCards = firebase.firestore().collection("cards");

  const [selectedCardTitle, setSelectedCardTitle] = useState("");
  const [selectedCardDept, setSelectedCardDept] = useState("");

  const [editMode, setEditMode] = useState(false);

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

  function onCardAdd() {
    const cardTitle = document.getElementById("cardTitleField").value;

    if (cardTitle.length === 0) {
      setEmptyTitle(true);
      setDeptError(false);
      return;
    } else {
      setEmptyTitle(false);
    }

    if (selectedDept === "") {
      setDeptError(true);
      return;
    } else {
      setDeptError(false);
    }

    let maxID = 0;

    cards.forEach((carduri) => {
      if (carduri.id.replace(/[^0-9]/g, "") > maxID) {
        maxID = parseInt(carduri.id.replace(/[^0-9]/g, ""));
      }
    });

    const cardID = "card-" + (maxID + 1);

    // console.log(cardID);

    let listToUpdate = {};
    lists.forEach((listele) => {
      if (listele.id === "list-1") {
        listToUpdate = listele;
        // console.log(listele);
      }
    });

    listToUpdate.hasCards[listToUpdate.hasCards.length] = cardID;

    // console.log("cardul are id-ul " + cardID);
    // console.log("cardul are titlul " + cardTitle);
    // console.log("cardul are dept-ul " + selectedDept);

    // console.log(listToUpdate);

    const newCard = {
      id: cardID,
      title: cardTitle,
      department: selectedDept,
      startTime: "",
      endTime: "",
      problemStart: "",
      problemEnd: "",
      by: "",
    };

    // console.log(newCard);

    addCard(newCard);
    updateList(listToUpdate);

    setEmptyTitle(false);
    setDeptError(false);

    props.showFunction(false);
  }

  function getDepts() {
    let departamente = [];

    for (let i = 0; i < users.length; i++) {
      departamente[departamente.length] = users[i].department;
    }

    departamente = Array.from(new Set(departamente));

    return departamente;
  }

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
    getCards();
    getLists();
  }, []);

  function getCardTitleAndDept(id) {
    cards.forEach((carduri) => {
      if (carduri.id === id) {
        setSelectedCardTitle(carduri.title);
        setSelectedCardDept(carduri.department);
      }
    });
  }

  return props.show ? (
    editMode === false ? (
      <WrapperDiv>
        <form>
          <TitleDiv>
            <div>Choose the card you'd like to edit</div>
          </TitleDiv>

          <TextFieldDiv>
            <FormControl
              style={{ minWidth: "72.5%" }}
              variant="outlined"
              error={selectError}
            >
              <InputLabel>Cards</InputLabel>
              <Select
                label="Cards"
                disabled={cards.length === 0}
                onChange={(event) => {
                  setSelectedCard(event.target.value);
                  setSelectError(false);
                }}
              >
                {cards.map((carduri) => {
                  return (
                    <MenuItem key={carduri.id} value={carduri.id}>
                      Card #{carduri.id.replace(/[^0-9]/g, "")} - D
                      {carduri.department.replace(/[^0-9]/g, "")}:{" "}
                      {carduri.title}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {selectError ? "Please select a card" : ""}
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
                  if (selectedCard === "") {
                    setSelectError(true);

                    return;
                  } else {
                    setSelectError(false);
                  }
                  setEditMode(true);
                  getCardTitleAndDept(selectedCard);
                  console.log(selectedCardTitle);
                  console.log(selectedCardDept);
                }}
              >
                EDIT CARD
              </Button>
            </SubmitDiv>

            <SubmitDiv>
              <Button
                style={{ background: "black", color: "white" }}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  setSelectedCard("");
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
      <WrapperDiv>
        <form>
          <TitleDiv>
            <div>Edit the chosen card</div>
          </TitleDiv>
          <TextFieldDiv>
            <TextField
              error={emptyTitle}
              helperText={
                emptyTitle ? "You need to add a title description." : ""
              }
              id="cardTitleField"
              variant="outlined"
              label="Card Title"
              value={selectedCardTitle}
              onChange={(event) => {
                setSelectedCardTitle(event.target.value);
              }}
            />
          </TextFieldDiv>

          <TextFieldDiv>
            <FormControl
              style={{ minWidth: "56%" }}
              variant="outlined"
              error={deptError}
            >
              <InputLabel id="deptSelect">Department</InputLabel>
              <Select
                labelId="deptSelect"
                id="select"
                label="Department"
                defaultValue={selectedCardDept}
                onChange={(event) => {
                  //console.log("Ati ales valoarea ");
                  //console.log(event.target.value);
                  setSelectedDept(event.target.value);
                  setDeptError(false);
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
          </TextFieldDiv>

          <ButtonsFlexDiv>
            <SubmitDiv>
              <Button
                style={{ background: "black", color: "white" }}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  onCardAdd();
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
                  setSelectedCard("");
                  setSelectError(false);
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
