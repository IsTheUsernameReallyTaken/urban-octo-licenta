import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const CardStyled = styled.div`
  background: lightcyan;

  margin-top: 20px;
  padding: 10px;

  text-align: center;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

  font-weight: normal;
`;

const Bubble = styled.div`
  width: 35px;
  background: coral;
  font-weight: bold;

  float: left;

  border-radius: 10px;

  margin-right: 7px;
  margin-bottom: 7px;
`;

export default class Card extends React.Component {
  render() {
    const bubbleText = "#" + this.props.id.replace(/^\D+/g, "");
    const content = this.props.title;

    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided, snapshot) => (
          <CardStyled
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Bubble>{bubbleText}</Bubble>
            {content}
          </CardStyled>
        )}
      </Draggable>
    );
  }
}
