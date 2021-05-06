import React, { useState } from "react";
import List from "./List";
import WelcomeCard from "./WelcomeCard";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "../initialData";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function App() {
  const [state, setState] = useState(initialData);

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
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <WelcomeCard />
      <AppContainer>
        {state.order.map((listID) => {
          let titlu, cardIDs;
          state.lists.forEach((liste) => {
            if (liste.id === listID) {
              titlu = liste.title;
              cardIDs = liste.hasCards;
            }
          });
          return (
            <List
              key={listID}
              id={listID}
              title={titlu}
              state={state}
              cardIDs={cardIDs}
            />
          );
        })}
      </AppContainer>
    </DragDropContext>
  );
}
