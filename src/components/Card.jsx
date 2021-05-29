import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const CardStyled = styled.div`
  background: lightcyan;

  margin-bottom: 15px;
  padding: 10px;

  text-align: center;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

  font-weight: normal;

  transition: background 0.3s linear;
  background: ${(props) =>
    props.isDragging ? "orange" : props.lowerOpacity ? "lightgrey" : "white"};
`;

const Bubble = styled.div`
  width: 45px;
  height: 20px;

  color: white;
  background: black;
  font-weight: bold;

  float: left;

  border-radius: 10px;

  margin-right: 7px;
  margin-bottom: 7px;
`;

const ByDiv = styled.div`
  margin: 1px;
  padding: 1px;

  color: grey;
`;

export default class Card extends React.Component {
  render() {
    let titleNumber = "";

    let userDept = this.props.dept;
    let userDeptNumber = userDept.replace(/[^0-9]/g, "");

    let cardDept = "";
    let cardDeptNumber = "";

    this.props.cards.forEach((carduri) => {
      if (carduri.id === this.props.id) {
        cardDept = carduri.department;
      }
    });

    cardDeptNumber = cardDept.replace(/[^0-9]/g, "");

    const content = this.props.isAdmin
      ? this.props.title + " - D" + cardDeptNumber
      : this.props.title;

    this.props.cards.forEach((carduri) => {
      if (carduri.id === this.props.id) {
        titleNumber = carduri.id;
      }
    });

    let byUser = "";
    let timestamp1, timestamp2, duration;
    var date1, date2;
    let time1 = "",
      time2 = "",
      durationUnit = "",
      durationString = "";

    const whyTF = 60 * 60 * 24 * (3990 - 2021);

    const getByUser = () => {
      this.props.cards.forEach((carduri) => {
        if (carduri.id === this.props.id) {
          byUser = carduri.by;
        }
      });
    };

    const getDifference = () => {
      this.props.cards.forEach((carduri) => {
        if (carduri.id === this.props.id) {
          timestamp1 = carduri.startTime.seconds * 1000;
          timestamp2 = carduri.endTime.seconds * 1000;

          date1 = new Date(timestamp1);
          date2 = new Date(timestamp2);

          time1 = date1.toLocaleString("en-GB");
          time2 = date2.toLocaleString("en-GB");

          duration = Math.floor(carduri.endTime - carduri.startTime);
          durationUnit = "seconds";

          if (duration > 60) {
            duration = duration / 60;
            durationUnit = "minutes";
            if (duration > 60) {
              duration = duration / 60;
              durationUnit = "hours";
              if (duration > 24) {
                duration = duration / 24;
                durationUnit = "days";
              }
            }
          }

          durationString = duration.toFixed(2) + " " + durationUnit;
        }
      });
    };

    titleNumber = titleNumber.replace(/[^0-9]/g, "");

    const bubbleText = "#" + titleNumber;
    let isDragDisabled = false;
    let lowerOpacity = false;

    this.props.cards.forEach((carduri) => {
      if (carduri.id === this.props.id) {
        if (carduri.by !== this.props.username) {
          if (this.props.parentList !== "list-1") {
            isDragDisabled = true;
            lowerOpacity = true;
          }
        }
      }
    });

    return this.props.id ? (
      <Draggable
        draggableId={this.props.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <CardStyled
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            lowerOpacity={lowerOpacity}
          >
            {<Bubble>{bubbleText}</Bubble>}
            {content}

            {getDifference()}
            {timestamp1 &&
            !timestamp2 &&
            this.props.parentList !== "list-4m" ? (
              <ByDiv>started at: {time1}</ByDiv>
            ) : (
              <div />
            )}
            {timestamp1 && timestamp2 && this.props.parentList !== "list-4m" ? (
              <div>
                {/*<ByDiv>done at: {time2} secs</ByDiv>*/}
                <ByDiv>duration: {durationString}</ByDiv>
              </div>
            ) : (
              <div />
            )}

            {getByUser()}
            {byUser.length !== 0 ? <ByDiv>by: {byUser}</ByDiv> : <div />}
          </CardStyled>
        )}
      </Draggable>
    ) : (
      <div />
    );
  }
}
