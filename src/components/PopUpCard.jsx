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

export default function PopUpCard(props) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);

  const [deptError, setDeptError] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");

  const [emptyTitle, setEmptyTitle] = useState(false);
  const [emptyTitleMessage, setEmptyTitleMessage] = useState("");

  const refUsers = firebase.firestore().collection("usernames");
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
      setEmptyTitleMessage("You need to add a title description");
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

    let titleFound = false;
    cards.forEach((carduri) => {
      if (carduri.title === cardTitle && carduri.department === selectedDept) {
        titleFound = true;
      }
    });

    if (titleFound === true) {
      setEmptyTitle(true);
      setEmptyTitleMessage("Dept. already has this card");
      return;
    } else {
      setEmptyTitle(false);
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

  return props.show ? (
    <WrapperDiv>
      <form>
        <TitleDiv>
          <div>Insert the title and dept. for the card you'd like to add</div>
        </TitleDiv>
        <TextFieldDiv>
          <TextField
            error={emptyTitle}
            helperText={emptyTitle ? emptyTitleMessage : ""}
            id="cardTitleField"
            variant="outlined"
            label="Card Title"
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
              ADD CARD
            </Button>
          </SubmitDiv>

          <SubmitDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                setEmptyTitle(false);
                setDeptError(false);
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
