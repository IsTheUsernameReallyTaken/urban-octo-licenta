import React, { useState, useEffect } from "react";
import List from "./List";
import WelcomeCard from "./WelcomeCard";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

import firebase from "../firebase";
import "firebase/firestore";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function App() {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

  const refLists = firebase.firestore().collection("lists");
  const refCards = firebase.firestore().collection("cards");

  const order = ["list-1", "list-2", "list-3", "em-list-4"];

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

  function onDragEnd(result) {
    console.log("Drag and Drop Yay");
  }

  function onDragEndTODO(result) {
    /*
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) {
        return;
      }
    }

    if (destination.droppableId === source.droppableId) {
      let stateCopy = state;
      stateCopy.lists.forEach((listele) => {
        if (listele.id === source.droppableId) {
          listele.hasCards.splice(source.index, 1);
          listele.hasCards.splice(destination.index, 0, draggableId);
        }
      });
      setState(stateCopy);
    } else {
      let stateCopy = state;
      stateCopy.lists.forEach((listele) => {
        if (listele.id === source.droppableId) {
          listele.hasCards.splice(source.index, 1);
        }
        if (listele.id === destination.droppableId) {
          listele.hasCards.splice(destination.index, 0, draggableId);
        }
      });
      setState(stateCopy);
    }
    */
  }

  useEffect(() => {
    getLists();
    getCards();
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <WelcomeCard />
      <AppContainer>
        {order.map((listID) => {
          let titlu;
          lists.forEach((liste) => {
            if (liste.id === listID) {
              titlu = liste.title;
            }
          });

          return (
            <List
              key={listID}
              id={listID}
              title={titlu}
              lists={lists}
              cards={cards}
            />
          );
        })}
      </AppContainer>
    </DragDropContext>
  );
}
