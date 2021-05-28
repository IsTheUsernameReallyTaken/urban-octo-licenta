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
  top: 30%;
  left: 30%;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

  width: 40%;
  height: 40vh;

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
      return;
    }

    if (selectedDept === "") {
      setDeptError(true);
      return;
    } else {
      setDeptError(false);
    }

    const cardID = "card-" + (cards.length + 1);

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
      by: "",
    };

    // console.log(newCard);

    addCard(newCard);
    updateList(listToUpdate);

    setEmptyTitle(false);
    setDeptError(false);
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
          <div>Insert a title for the card you'd like to add</div>
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
          />
        </TextFieldDiv>
        <TextFieldDiv>
          <FormControl
            style={{ minWidth: "72.5%" }}
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
