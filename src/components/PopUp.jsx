import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { TextField, Button } from "@material-ui/core";

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

export default function PopUp(props) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

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

  function addCard(cardID, cardTitle) {
    const newCard = {
      id: cardID,
      title: cardTitle,
      startTime: "",
      endTime: "",
      by: "",
    };

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

  function onAddCard() {
    const cardTitle = document.getElementById("cardTitleField").value;

    if (cardTitle.length == 0) {
      return;
    }

    const cardID = "card-" + (cards.length + 1);

    let listToUpdate = {};
    lists.forEach((listele) => {
      if (listele.id === "list-1") {
        listToUpdate = listele;
        console.log(listele);
      }
    });

    listToUpdate.hasCards[listToUpdate.hasCards.length] = cardID;
    console.log(listToUpdate);

    addCard(cardID, cardTitle);
    updateList(listToUpdate);
  }

  useEffect(() => {
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
            id="cardTitleField"
            variant="outlined"
            label="Card Title"
          />
        </TextFieldDiv>

        <ButtonsFlexDiv>
          <SubmitDiv>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                onAddCard();
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
