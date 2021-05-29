import React, { useEffect, useState } from "react";
import styled from "styled-components";

import firebase from "../firebase";
import "firebase/firestore";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;

  top: 0;
  left: 0;

  background: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const MarginDiv = styled.div`
  margin-top: 10px;
  padding: 5px;
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextDiv = styled.div`
  font-size: 1.2em;
`;

const ScrollableParent = styled.div``;

const ScrollableDiv = styled.div`
  margin: 10px;
  height: 80vh;
  overflow: auto;
  scrollbar-color: transparent transparent;
`;

export default function Review(props) {
  const [users, setUsers] = useState([]);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

  const [selectValue, setSelectValue] = useState("by-progress");

  const refUsers = firebase.firestore().collection("usernames");
  const refLists = firebase.firestore().collection("lists");
  const refCards = firebase.firestore().collection("cards");

  function getUsers() {
    refUsers.onSnapshot((querySnapshot) => {
      const userItems = [];
      querySnapshot.forEach((document) => {
        userItems.push(document.data());
      });
      setUsers(userItems);
    });
  }

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

  function getDepts() {
    let departamente = [];

    for (let i = 0; i < users.length; i++) {
      departamente[departamente.length] = users[i].department;
    }

    departamente = Array.from(new Set(departamente));

    return departamente;
  }

  function getDuration(endTime, startTime) {
    let duration = "",
      durationUnit = "",
      durationString = "";

    duration = Math.floor(endTime - startTime);
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
    return durationString;
  }

  function getReviewByProgress() {
    let objDone, objInProgress, objToDo, objProblems;

    // console.log(lists[2].hasCards);

    objDone = lists[2].hasCards.length ? (
      <MarginDiv>
        Completed cards are: <br></br>
        {lists[2].hasCards.map((cardID) => {
          let idNumber,
            deptNumber,
            title,
            by,
            startDate,
            duration,
            durationUnit,
            durationString;
          cards.forEach((carduri) => {
            if (carduri.id === cardID) {
              // console.log(carduri.title);
              idNumber = carduri.id.replace(/[^0-9]/g, "");
              deptNumber = carduri.department;
              title = carduri.title;
              by = carduri.by;
              startDate = new Date(
                carduri.startTime.seconds * 1000
              ).toLocaleString("en-GB");
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

          return (
            <ul key={idNumber}>
              <li>
                <b>card {idNumber}</b> ({deptNumber}): {title}, by <b>{by}</b> -
                from {startDate}, <b>took {durationString}</b>
              </li>
            </ul>
          );
        })}
      </MarginDiv>
    ) : (
      <MarginDiv>
        Completed cards are:
        <em>
          <b>&nbsp;no cards here</b>
        </em>
      </MarginDiv>
    );

    objInProgress = lists[1].hasCards.length ? (
      <MarginDiv>
        In-progress cards are: <br></br>
        {lists[1].hasCards.map((cardID) => {
          let idNumber, deptNumber, title, by, startDate;

          cards.forEach((carduri) => {
            if (carduri.id === cardID) {
              // console.log(carduri.title);
              idNumber = carduri.id.replace(/[^0-9]/g, "");
              deptNumber = carduri.department;
              title = carduri.title;
              by = carduri.by;
              startDate = new Date(
                carduri.startTime.seconds * 1000
              ).toLocaleString("en-GB");
            }
          });

          return (
            <ul key={idNumber}>
              <li>
                <b>card {idNumber}</b> ({deptNumber}): {title}, by <b>{by}</b> -
                from {startDate}
              </li>
            </ul>
          );
        })}
      </MarginDiv>
    ) : (
      <MarginDiv>
        In-progress cards are:
        <em>
          <b>&nbsp;no cards here</b>
        </em>
      </MarginDiv>
    );

    objToDo = lists[0].hasCards.length ? (
      <MarginDiv>
        Available cards are: <br></br>
        {lists[0].hasCards.map((cardID) => {
          let idNumber, deptNumber, title;

          cards.forEach((carduri) => {
            if (carduri.id === cardID) {
              // console.log(carduri.title);
              idNumber = carduri.id.replace(/[^0-9]/g, "");
              deptNumber = carduri.department;
              title = carduri.title;
            }
          });

          return (
            <ul key={idNumber}>
              <li>
                <b>card {idNumber}</b> ({deptNumber}): {title}
              </li>
            </ul>
          );
        })}
      </MarginDiv>
    ) : (
      <MarginDiv>
        Available cards are:
        <em>
          <b>&nbsp;no cards here</b>
        </em>
      </MarginDiv>
    );

    objProblems = lists[3].hasCards.length ? (
      <MarginDiv>
        Problems were encountered regarding these cards: <br></br>
        {lists[3].hasCards.map((cardID) => {
          let idNumber, deptNumber, title, by;

          cards.forEach((carduri) => {
            if (carduri.id === cardID) {
              // console.log(carduri.title);
              idNumber = carduri.id.replace(/[^0-9]/g, "");
              deptNumber = carduri.department;
              title = carduri.title;
              by = carduri.by;
            }
          });

          return (
            <ul key={idNumber}>
              <li>
                <b>card {idNumber}</b> ({deptNumber}): {title}, encoutered by
                <b>{by}</b>
              </li>
            </ul>
          );
        })}
      </MarginDiv>
    ) : (
      <MarginDiv>
        Problems were encountered regarding these cards:
        <em>
          <b>&nbsp;no cards here</b>
        </em>
      </MarginDiv>
    );

    return (
      <TextDiv>
        {objDone}
        {objInProgress}
        {objToDo}
        {objProblems}
      </TextDiv>
    );
  }

  function getReviewByDept() {
    let obj;

    const depts = getDepts();

    obj = (
      <MarginDiv>
        {depts.map((departamente) => {
          return (
            <div>
              <div key={departamente}>
                Department {departamente.replace(/[^0-9]/g, "")}:
              </div>
              <ul>
                {cards.map((carduri) => {
                  if (carduri.department === departamente) {
                    return (
                      <MarginDiv>
                        <li key={carduri.id}>
                          <div>
                            <b>Card #{carduri.id.replace(/[^0-9]/g, "")}</b> -{" "}
                            {carduri.title}
                            {lists[2].hasCards.includes(carduri.id) ? (
                              <div>
                                <b>COMPLETED</b>&nbsp;by <b>{carduri.by}</b>,
                                started at{" "}
                                {new Date(
                                  carduri.startTime.seconds * 1000
                                ).toLocaleString("en-GB")}
                                , done in{" "}
                                <b>
                                  {getDuration(
                                    carduri.endTime,
                                    carduri.startTime
                                  )}
                                </b>
                              </div>
                            ) : (
                              <div />
                            )}
                            {lists[1].hasCards.includes(carduri.id) ? (
                              <div>
                                <b>IN PROGRESS</b>&nbsp;by <b>{carduri.by}</b>,
                                since{" "}
                                {new Date(
                                  carduri.startTime.seconds * 1000
                                ).toLocaleString("en-GB")}
                              </div>
                            ) : (
                              <div />
                            )}
                          </div>
                        </li>
                      </MarginDiv>
                    );
                  }
                })}
              </ul>
            </div>
          );
        })}
      </MarginDiv>
    );

    return <TextDiv>{obj}</TextDiv>;
  }

  useEffect(() => {
    getUsers();
    getLists();
    getCards();
  }, []);

  return props.show ? (
    <Wrapper>
      <ColumnFlex>
        <RowFlex>
          <MarginDiv>
            <FormControl style={{ minWidth: "200px" }} variant="outlined">
              <InputLabel>Review Type</InputLabel>
              <Select
                label="Review Type"
                value={selectValue}
                onChange={(event) => {
                  //console.log("Ati ales valoarea ");
                  //console.log(event.target.value);
                  setSelectValue(event.target.value);
                  if (event.target.value === "by-progress") {
                    getReviewByProgress();
                  }
                }}
              >
                <MenuItem value={"by-progress"}>By progress</MenuItem>
                <MenuItem value={"by-dept"}>By department</MenuItem>
              </Select>
            </FormControl>
          </MarginDiv>
          <MarginDiv>
            <Button
              style={{ minHeight: "55px", minWidth: "55px" }}
              variant="contained"
              color="primary"
              onClick={() => {
                props.showFunction(false);
              }}
            >
              X
            </Button>
          </MarginDiv>
        </RowFlex>

        {selectValue === "by-progress" ? (
          <ScrollableDiv>{getReviewByProgress()}</ScrollableDiv>
        ) : selectValue === "by-dept" ? (
          <div>
            <ScrollableDiv>{getReviewByDept()}</ScrollableDiv>
          </div>
        ) : (
          <div />
        )}
      </ColumnFlex>
    </Wrapper>
  ) : (
    <div />
  );
}
