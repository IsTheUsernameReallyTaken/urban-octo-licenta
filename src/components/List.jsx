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
`;

export default class List extends React.Component {
  state = 0;

  emptyFunction = () => {
    if (this.state === 0) {
      if (this.props.id === "list-1") {
        return (
          <EmptyDiv>
            It looks like there any tasks left for you to do. Congrats!
          </EmptyDiv>
        );
      }
      if (this.props.id === "list-2") {
        return (
          <EmptyDiv>
            This is a bit awkward. I'm no snitch but you really should be
            working.
          </EmptyDiv>
        );
      }
      if (this.props.id === "list-3") {
        return (
          <EmptyDiv>
            Why is this list empty? You could <i>at least try</i> to get
            something done.
          </EmptyDiv>
        );
      }
      if (this.props.id === "list-4") {
        return (
          <div>
            <EmptyDiv>
              If you can't wrap your head around a task or it simply doesn't
              work, just drop it here and one of your supervisors will come and
              help you.
            </EmptyDiv>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <EmptyDiv> You monumental fuck-up.</EmptyDiv>
          </div>
        );
      }
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
                    this.state++;
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
              {this.emptyFunction()}
              {provided.placeholder}
            </CardsDiv>

            <TitleDiv>{titluLista}</TitleDiv>
          </ListStyled>
        )}
      </Droppable>
    );
  }
}
