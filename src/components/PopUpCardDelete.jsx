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

export default function PopUpCardDelete(props) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState("");
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

  function deleteCard(id) {
    refCards
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

  function onCardDelete() {
    if (selectedCard === "") {
      setSelectError(true);
      return;
    }

    let theList, theIndex;

    // console.log("Doriti sa stergeti cardul " + selectedCard);

    lists.forEach((liste) => {
      if (liste.hasCards.includes(selectedCard)) {
        theList = liste;
      }
    });

    // console.log("Cardul se gaseste in lista " + theList.id);
    // console.log(theList.hasCards);

    theList.hasCards.forEach((cardID, index) => {
      if (cardID === selectedCard) {
        theIndex = index;
      }
    });

    theList.hasCards.splice(theIndex, 1);

    let listToUpdate = {
      id: theList.id,
      hasCards: theList.hasCards,
    };

    deleteCard(selectedCard);
    updateList(listToUpdate);
  }

  function onDeleteAllCards() {
    setSelectError(false);

    cards.forEach((carduri) => {
      deleteCard(carduri.id);
    });
    lists.forEach((liste) => {
      updateList({ id: liste.id, hasCards: [] });
    });
  }

  useEffect(() => {
    getCards();
    getLists();
  }, []);

  return props.show ? (
    <WrapperDiv>
      <form>
        <TitleDiv>
          <div>Choose the card you'd like to delete</div>
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
                    {carduri.department.replace(/[^0-9]/g, "")}: {carduri.title}
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
                onCardDelete();
              }}
            >
              DELETE CARD
            </Button>
          </SubmitDiv>

          <SubmitDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                onDeleteAllCards();
              }}
            >
              DELETE ALL
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
