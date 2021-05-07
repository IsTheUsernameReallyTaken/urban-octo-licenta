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
  font-family: "Georgia", serif;

  display: flex;
  flex-direction: column;

  transition: background 0.3s linear;
  background: ${(props) =>
    props.isDraggingOverList ? "lightsalmon" : "lightgrey"};

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
  transition: color 0.3s linear;
  color: ${(props) => (props.isDraggingOverEmptyList ? "lightsalmon" : "grey")};
`;

export default class List extends React.Component {
  numberOfCards = 0;
  listaCarduri = [];

  emptyListFunction = (isDraggingOverEmptyList) => {
    /*
    if (this.props.cardIDs.length === 0) {
      this.props.lists.forEach((listele) => {
        if (listele.id === this.props.id) {
          text = listele.emptyText;
        }
      });
      return (
        <EmptyDiv isDraggingOverEmptyList={isDraggingOverEmptyList}>
          {text}
        </EmptyDiv>
      );
    }
    */
    let text;
    this.props.lists.map((listele) => {
      if (listele.id === this.props.id) {
        if (listele.hasCards.length === 0) {
          text = listele.emptyText;
        }
      }
      return (
        <EmptyDiv isDraggingOverEmptyList={isDraggingOverEmptyList}>
          {text}
        </EmptyDiv>
      );
    });
  };

  getCardsOfThisList = () => {
    this.props.lists.map((liste) => {
      if (this.props.id === liste.id) {
        this.listaCarduri = liste.hasCards;
      }
    });
  };

  render() {
    let numarOite = this.props.id.replace(/^\D+/g, "");
    let titluLista = "#" + numarOite + ": " + this.props.title + " ";

    //let cond1EM = this.props.id[this.props.id.length - 2] === "e";
    //let cond2EM = this.props.id[this.props.id.length - 1] === "m";

    let cond1EM = this.props.id[0] === "e";
    let cond2EM = this.props.id[1] === "m";

    let condEM = cond1EM && cond2EM;

    if (condEM) {
      titluLista = titluLista + "👷🏻‍♀️⛔️";
    } else {
      for (let i = 1; i <= numarOite; i++) {
        titluLista = titluLista + "🐑";
      }
    }

    return (
      <Droppable droppableId={this.props.id}>
        {(provided, snapshot) => (
          <ListStyled
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOverList={snapshot.isDraggingOver}
          >
            <CardsDiv>
              {this.getCardsOfThisList()}
              {this.listaCarduri.map((IDCard, index) => {
                let ID, TITLU, INDEX;
                this.props.cards.map((carduri) => {
                  if (IDCard === carduri.id) {
                    ID = carduri.id;
                    TITLU = carduri.title;
                    INDEX = index;
                  }
                });

                return (
                  <Card
                    key={ID}
                    id={ID}
                    title={TITLU}
                    index={INDEX}
                    cards={this.props.cards}
                    lists={this.props.lists}
                  />
                );
              })}
              {this.emptyListFunction(snapshot.isDraggingOver)}
              {provided.placeholder}
            </CardsDiv>

            <TitleDiv>{titluLista}</TitleDiv>
          </ListStyled>
        )}
      </Droppable>
    );
  }
}
