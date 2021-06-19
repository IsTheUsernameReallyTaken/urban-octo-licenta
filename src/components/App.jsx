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

  let order = [];

  lists.forEach((listele) => {
    order[order.length] = listele.id;
  });

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

  function updateCard(updatedCard) {
    refCards
      .doc(updatedCard.id)
      .update(updatedCard)
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
      //drag dintr-o lista, drop in aceeasi lista
      let listToUpdate = {};
      lists.forEach((listele) => {
        if (destination.droppableId === listele.id) {
          listToUpdate = listele;
          listToUpdate.hasCards.splice(source.index, 1);
          listToUpdate.hasCards.splice(destination.index, 0, draggableId);
        }
      });
      updateList(listToUpdate);
    }

    if (destination.droppableId !== source.droppableId) {
      //drag dintr-o lista, drop in alta lista
      let firstListToUpdate,
        secondListToUpdate = {};

      let copy;
      cards.forEach((carduri) => {
        if (carduri.id === draggableId) {
          copy = carduri;
        }
      });

      let cardToUpdate,
        found = false;

      if (destination.droppableId === "list-1") {
        found = true;

        cardToUpdate = {
          id: copy.id,
          title: copy.title,
          department: copy.department,
          by: "",
          startTime: "",
          endTime: "",
          problemStart: "",
          problemEnd: "",
        };
      }

      if (destination.droppableId === "list-2") {
        found = true;

        cardToUpdate = {
          id: copy.id,
          title: copy.title,
          department: copy.department,
          by: copy.by ? copy.by : props.username,
          startTime: copy.startTime ? copy.startTime : new Date(),
          endTime: "",
          problemStart: copy.problemStart,
          problemEnd: copy.problemEnd
            ? copy.problemEnd
            : copy.problemStart && !copy.problemEnd
            ? new Date()
            : "",
        };
      }

      if (destination.droppableId === "list-3") {
        if (!copy.startTime) {
          return;
        }
        found = true;

        cardToUpdate = {
          id: copy.id,
          title: copy.title,
          department: copy.department,
          by: copy.by,
          startTime: copy.startTime,
          endTime: new Date(),
          problemStart: copy.problemStart ? copy.problemStart : "",
          problemEnd: copy.problemEnd
            ? copy.problemEnd
            : copy.problemStart
            ? new Date()
            : "",
        };
      }

      if (destination.droppableId === "list-4m") {
        if (!copy.startTime) {
          return;
        }
        found = true;

        cardToUpdate = {
          id: copy.id,
          title: copy.title,
          department: copy.department,
          by: copy.by,
          startTime: copy.startTime,
          endTime: "",
          problemStart: new Date(),
          problemEnd: "",
        };
      }

      if (found === false) {
        cardToUpdate = {
          id: copy.id,
          title: copy.title,
          department: copy.department,
          by: props.username,
          startTime: copy.startTime,
          endTime: copy.endTime,
          problemStart: copy.problemStart,
          problemEnd: copy.problemEnd,
        };
      }

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
      updateCard(cardToUpdate);

      return;
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

  let emergencies = 0;
  lists.forEach((listele) => {
    if (listele.id === "list-4m") {
      if (listele.hasCards.length !== 0) {
        emergencies = listele.hasCards.length;
      }
    }
  });

  useEffect(() => {
    getLists();
    getCards();
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <WelcomeCard
        username={props.username}
        isAdmin={props.isAdmin}
        logout={props.logout}
        emergencies={emergencies}
      />

      {/* {console.log(props.dept)} */}

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
              username={props.username}
              isAdmin={props.isAdmin}
              dept={props.dept}
            />
          );
        })}
      </AppContainer>
    </DragDropContext>
  );
}
