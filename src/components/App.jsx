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

export default function App(props) {
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

  function updateList(updatedList) {
    refLists
      .doc(updatedList.id)
      .update(updatedList)
      .catch((err) => {
        console.error(err);
      });
  }

  function onDragEnd(result) {
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
      let listToUpdate = {};
      lists.forEach((listele) => {
        if (destination.droppableId === listele.id) {
          listToUpdate = listele;
          listToUpdate.hasCards.splice(source.index, 1);
          listToUpdate.hasCards.splice(destination.index, 0, draggableId);
        }
      });
      updateList(listToUpdate);
    } else {
      let firstListToUpdate,
        secondListToUpdate = {};
      lists.forEach((listele) => {
        if (source.droppableId === listele.id) {
          firstListToUpdate = listele;
          firstListToUpdate.hasCards.splice(source.index, 1);
        }
        if (destination.droppableId === listele.id) {
          secondListToUpdate = listele;
          secondListToUpdate.hasCards.splice(destination.index, 0, draggableId);
        }
      });
      updateList(firstListToUpdate);
      updateList(secondListToUpdate);
    }
  }

  function oldOnDragEnd(result) {
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
      <WelcomeCard username={props.username} />
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
