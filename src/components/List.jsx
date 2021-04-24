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

  transition: background 0.3s linear;
  background: ${(props) => (props.isDraggingOver ? "steelblue" : "lightgrey")};

  display: grid;
`;

const TitleDiv = styled.div`
  align-self: end;
  margin: 10px;
  font-size: x-large;
  text-align: center;
`;

const CardsDiv = styled.div``;

const EmptyDiv = styled.div`
  padding: 10px;
  margin: 10px;
  text-align: center;
  color: grey;
  transition: color 0.2s ease;
`;

export default class List extends React.Component {
  numberOfCards = 0;

  emptyListFunction = () => {
    let text;
    if (this.props.cardIDs.length === 0) {
      this.props.state.lists.forEach((listele) => {
        if (listele.id === this.props.id) {
          text = listele.emptyText;
        }
      });
      return <EmptyDiv>{text}</EmptyDiv>;
    }
  };

  render() {
    let numarOite = this.props.id.replace(/^\D+/g, "");
    let titluLista = "#" + numarOite + ": " + this.props.title + " ";

    if (this.props.id !== "list-4") {
      for (let i = 1; i <= numarOite; i++) {
        titluLista = titluLista + "🐑";
      }
    } else {
      titluLista = titluLista + "👷🏻‍♀️⛔️";
    }

    return (
      <Droppable droppableId={this.props.id}>
        {(provided, snapshot) => (
          <ListStyled
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <CardsDiv>
              {this.props.cardIDs.map((IDCard, index) => {
                let UNIDMS, UNTITLUMS;
                this.props.state.cards.forEach((carduri) => {
                  if (IDCard === carduri.id) {
                    //console.log("cardul " + IDCard + " are indexul " + index + " in lista " + this.props.id + ".");
                    UNIDMS = carduri.id;
                    UNTITLUMS = carduri.title;
                    this.numberOfCards++;
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
              {this.emptyListFunction()}
              {provided.placeholder}
            </CardsDiv>

            <TitleDiv>{titluLista}</TitleDiv>
          </ListStyled>
        )}
      </Droppable>
    );
  }
}
