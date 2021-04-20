import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

const ListStyled = styled.div`
  width: 350px;

  background: lightgrey;

  padding: 1em;
  margin: 1em;

  border-style: dashed;
  border-width: medium;

  font-weight: bold;

  display: flex;
  flex-direction: column;

  transition: background 0.2s ease;
  background: ${(props) => (props.isDraggingOver ? "powderblue" : "lightgrey")};
`;

const TitleDiv = styled.div`
  margin-bottom: 25px;
`;

const CardsDiv = styled.div``;

export default class List extends React.Component {
  render() {
    let numarOite = this.props.id.replace(/^\D+/g, "");
    let titluLista = "#" + numarOite + ": " + this.props.title + " ";

    for (let i = 1; i <= numarOite; i++) {
      titluLista = titluLista + "🐑";
    }

    return (
      <Droppable droppableId={this.props.id}>
        {(provided, snapshot) => (
          <ListStyled
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <TitleDiv>{titluLista}</TitleDiv>
            <CardsDiv>
              {this.props.cardIDs.map((IDCard, index) => {
                let UNIDMS, UNTITLUMS;
                this.props.state.cards.forEach((carduri) => {
                  if (IDCard === carduri.id) {
                    //console.log("cardul " + IDCard + " are indexul " + index + " in lista " + this.props.id + "." );
                    UNIDMS = carduri.id;
                    UNTITLUMS = carduri.title;
                  }
                });
                return (
                  <Card
                    key={UNIDMS}
                    id={UNIDMS}
                    title={UNTITLUMS}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </CardsDiv>
          </ListStyled>
        )}
      </Droppable>
    );
  }
}
