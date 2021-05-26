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

  /*
  border-radius: 7px;
  border-style: solid;
  border-width: thin;
  */
`;

export default class List extends React.Component {
  numberOfCards = 0;
  listaCarduri = [];
  emptyText = "";

  getEmptyText = () => {
    this.props.lists.forEach((listele) => {
      if (listele.id === this.props.id) {
        this.emptyText = listele.emptyText;
      }
    });
  };

  getCardsOfThisList = () => {
    this.props.lists.forEach((liste) => {
      if (this.props.id === liste.id) {
        this.listaCarduri = liste.hasCards;
      }
    });
  };

  render() {
    let numarOite = this.props.id.replace(/^\D+/g, "");
    let titluLista = "#" + numarOite + ": " + this.props.title + " ";

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
                this.props.cards.forEach((carduri) => {
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
                    username={this.props.username}
                    isAdmin={this.props.isAdmin}
                    dept={this.props.dept}
                    parentList={this.props.id}
                  />
                );
              })}

              {this.getEmptyText()}
              {this.props.lists.map((listele) => {
                let text = "";
                if (this.props.id === listele.id) {
                  if (listele.hasCards.length === 0) {
                    text = listele.emptyText;
                  }

                  return text.length === 0 ? (
                    <div />
                  ) : (
                    <EmptyDiv isDraggingOverEmptyList={snapshot.isDraggingOver}>
                      {text}
                    </EmptyDiv>
                  );
                }
              })}

              {provided.placeholder}
            </CardsDiv>

            <TitleDiv>{titluLista}</TitleDiv>
          </ListStyled>
        )}
      </Droppable>
    );
  }
}
