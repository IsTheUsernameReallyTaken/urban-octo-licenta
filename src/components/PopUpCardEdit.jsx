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

export default function PopUpCardEdit(props) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);

  const [deptError, setDeptError] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");

  const [selectedCard, setSelectedCard] = useState("");
  const [selectedCardError, setSelectedCardError] = useState(false);

  const [emptyTitle, setEmptyTitle] = useState(false);

  const refUsers = firebase.firestore().collection("usernames");
  const refLists = firebase.firestore().collection("lists");
  const refCards = firebase.firestore().collection("cards");

  const [selectedCardID, setSelectedCardID] = useState("");
  const [selectedCardTitle, setSelectedCardTitle] = useState("");
  const [selectedCardDept, setSelectedCardDept] = useState("");

  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDept, setNewCardDept] = useState("");

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

  function onCardEdit() {
    const oldCard = {
      id: selectedCardID,
      title: selectedCardTitle,
      department: selectedCardDept,
    };

    const cardTitle = document.getElementById("editCardTitleField").value;

    if (cardTitle.length === 0) {
      setEmptyTitle(true);
      setDeptError(false);
      return;
    } else {
      setEmptyTitle(false);
    }

    const newCard = {
      id: selectedCardID,
      title: newCardTitle,
      department: newCardDept,
    };

    // console.log("old card: ");
    // console.log(oldCard);
    // console.log("new card: ");
    // console.log(newCard);

    if (
      newCard.title === oldCard.title &&
      newCard.department === oldCard.department
    ) {
      setIdenticalError(true);
      return;
    } else {
      setIdenticalError(false);
    }

    updateCard(newCard);

    setEmptyTitle(false);
    setSelectedCardError(false);
    setIdenticalError(false);
    setDeptError(false);

    setEditMode(false);
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

  function getIsDeptDisabled(id) {
    cards.forEach((carduri) => {
      if (carduri.id === id) {
        if (lists[0].hasCards.includes(id)) {
          setDisabledDept(false);
        } else {
          //   console.log(carduri.id);
          let username = carduri.by;
          users.forEach((useri) => {
            if (useri.username === username) {
              if (useri.id.includes("admin")) {
                setDisabledDept(false);
              } else {
                setDisabledDept(true);
              }
            }
          });
        }
      }
    });

    // console.log("disabled dept: " + disabledDept);
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

        setNewCardTitle(carduri.title);
        setNewCardDept(carduri.department);
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
              error={selectedCardError}
            >
              <InputLabel>Cards</InputLabel>
              <Select
                label="Cards"
                disabled={cards.length === 0}
                onChange={(event) => {
                  setSelectedCard(event.target.value);
                  setSelectedCardError(false);
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
                {selectedCardError ? "Please select a card" : ""}
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
                    setSelectedCardError(true);
                    return;
                  } else {
                    setSelectedCardError(false);
                  }
                  setEditMode(true);
                  getCardTitleAndDept(selectedCard);
                  setSelectedCardID(selectedCard);
                  getIsDeptDisabled(selectedCard);
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
                  setSelectedCardError(false);
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
              Edit the chosen card (card #{selectedCard.replace(/[^0-9]/g, "")})
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
              id="editCardTitleField"
              variant="outlined"
              label="Card Title"
              value={newCardTitle}
              onChange={(event) => {
                setNewCardTitle(event.target.value);
              }}
            />
          </TextFieldDiv>

          <TextFieldDiv>
            <ButtonsFlexDiv>
              <FormControl
                style={{ minWidth: "82.5%" }}
                variant="outlined"
                error={deptError}
              >
                <InputLabel id="deptSelect">Department</InputLabel>
                <Select
                  labelId="deptSelect"
                  id="select"
                  label="Department"
                  defaultValue={newCardDept}
                  disabled={disabledDept}
                  onChange={(event) => {
                    //console.log("Ati ales valoarea ");
                    //console.log(event.target.value);
                    setNewCardDept(event.target.value);
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

              <HelpIconDiv>
                <Tooltip
                  title="If a non-admin user has already started working, there is no way to change the department"
                  placement="right"
                >
                  <HelpOutlineIcon />
                </Tooltip>
              </HelpIconDiv>
            </ButtonsFlexDiv>
          </TextFieldDiv>

          <ButtonsFlexDiv>
            <SubmitDiv>
              <Button
                style={{ background: "black", color: "white" }}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  onCardEdit();
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
                  setSelectedCardTitle("");
                  setSelectedDept("");
                  setSelectedCard("");

                  setDeptError(false);
                  setSelectedCardError(false);
                  setEmptyTitle(false);

                  setIdenticalError(false);

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
                  setSelectedCardError(false);
                  setEditMode(false);

                  setIdenticalError(false);

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
