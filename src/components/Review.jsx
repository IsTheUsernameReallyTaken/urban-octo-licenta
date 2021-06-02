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

    for (let i = 0; i < cards.length; i++) {
      departamente[departamente.length] = cards[i].department;
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

    let secunde, minute, ore;
    secunde = Math.floor(duration % 60);
    minute = Math.floor((duration / 60) % 60);
    ore = Math.floor(duration / 60 / 60);

    durationString = ore + "h " + minute + "m " + secunde + "s";
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

              let secunde, minute, ore;
              secunde = Math.floor(duration % 60);
              minute = Math.floor((duration / 60) % 60);
              ore = Math.floor(duration / 60 / 60);

              durationString = ore + "h " + minute + "m " + secunde + "s";
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
        <b>&nbsp;no cards here</b>
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
        <b>&nbsp;no cards here</b>
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
        <b>&nbsp;no cards here</b>
      </MarginDiv>
    );

    objProblems = lists[3].hasCards.length ? (
      <MarginDiv>
        There are problems regarding these cards: <br></br>
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
                <b>&nbsp;{by}</b>
              </li>
            </ul>
          );
        })}
      </MarginDiv>
    ) : (
      <MarginDiv>
        There are problems regarding these cards:
        <b>&nbsp;no cards here</b>
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

    obj =
      depts.length !== 0 ? (
        <MarginDiv>
          {depts.map((departamente) => {
            // let found = false;
            return (
              <div>
                <div key={departamente}>
                  Department {departamente.replace(/[^0-9]/g, "")}:
                </div>
                <ul>
                  {cards.map((carduri) => {
                    if (carduri.department === departamente) {
                      // found = true;
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
                                  <b>IN PROGRESS</b>&nbsp;by <b>{carduri.by}</b>
                                  , since{" "}
                                  {new Date(
                                    carduri.startTime.seconds * 1000
                                  ).toLocaleString("en-GB")}
                                </div>
                              ) : (
                                <div />
                              )}
                              {lists[0].hasCards.includes(carduri.id) ? (
                                <div>
                                  <b>AVAILABLE</b>
                                </div>
                              ) : (
                                <div />
                              )}
                              {lists[3].hasCards.includes(carduri.id) ? (
                                <div>
                                  <b>PROBLEM ENCOUNTERED</b> by {carduri.by}
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

                  {/* {found === false ? (
                    <MarginDiv>
                      <li>no cards here yet</li>
                    </MarginDiv>
                  ) : (
                    <div />
                  )} */}
                </ul>
              </div>
            );
          })}
        </MarginDiv>
      ) : (
        <MarginDiv>There are no cards at the moment.</MarginDiv>
      );

    return <TextDiv>{obj}</TextDiv>;
  }

  function getStatistics() {
    let objMax, objMin, objProblems;
    let duration,
      maxDuration = 0,
      minDuration = 1000 * 24 * 60 * 60,
      minTitle,
      minID,
      minBy,
      maxTitle,
      maxID,
      maxBy;

    cards.forEach((carduri) => {
      duration = Math.floor(carduri.endTime - carduri.startTime);
      if (duration > maxDuration) {
        maxDuration = duration;
        maxTitle = carduri.title;
        maxID = carduri.id;
        maxBy = carduri.by;
      }

      if (duration < minDuration) {
        minDuration = duration;
        minTitle = carduri.title;
        minID = carduri.id;
        minBy = carduri.by;
      }
    });

    let secunde, minute, ore;
    secunde = Math.floor(maxDuration % 60);
    minute = Math.floor((maxDuration / 60) % 60);
    ore = Math.floor(maxDuration / 60 / 60);

    objMax = (
      <MarginDiv>
        <b>Card #{maxID.replace(/[^0-9]/g, "")}</b> ({maxTitle}), by {maxBy}{" "}
        took <b>the most time</b>: {ore}h {minute}m {secunde}s.
      </MarginDiv>
    );

    secunde = Math.floor(minDuration % 60);
    minute = Math.floor((minDuration / 60) % 60);
    ore = Math.floor(minDuration / 60 / 60);

    objMin = (
      <MarginDiv>
        <b>Card #{minID.replace(/[^0-9]/g, "")}</b> ({minTitle}), by {minBy}{" "}
        took <b>the least time</b>: {ore}h {minute}m {secunde}s.
      </MarginDiv>
    );

    let numberOfProblems = 0;
    cards.forEach((carduri) => {
      if (carduri.problemStart) {
        numberOfProblems++;
      }
    });

    objProblems =
      numberOfProblems !== 0 ? (
        <MarginDiv>
          Cards which encoutered problems were:
          <ul>
            {cards.map((carduri) => {
              if (carduri.problemStart) {
                let time1, durata1;

                time1 = new Date(
                  carduri.problemStart.seconds * 1000
                ).toLocaleString("en-GB");

                durata1 = getDuration(carduri.problemEnd, carduri.problemStart);

                return (
                  <li>
                    <b>Card #{carduri.id.replace(/[^0-9]/g, "")}</b>,
                    encountered at {time1} by <b>{carduri.by}</b>, solved in{" "}
                    {durata1}
                  </li>
                );
              }
            })}
          </ul>
        </MarginDiv>
      ) : (
        <MarginDiv>
          Cards which encoutered problems were: <b>no cards here</b>
        </MarginDiv>
      );

    return (
      <TextDiv>
        {objMax}
        {objMin}
        {objProblems}
      </TextDiv>
    );
  }

  function getReviewByUser() {
    let obj = (
      <MarginDiv>
        {users.map((useri) => {
          let count = 0;
          return (
            <MarginDiv key={useri.id}>
              <b>User #{useri.id.replace(/[^0-9]/g, "")}</b> -{" "}
              <b>
                {useri.name} {useri.surname}
              </b>{" "}
              {cards.forEach((carduri) => {
                if (carduri.by === useri.username) {
                  count = count + 1;
                }
              })}
              interacted <b>with {count} cards</b>.
              <ul>
                {count !== 0 ? (
                  cards.map((carduri) => {
                    if (carduri.by === useri.username) {
                      return (
                        <MarginDiv>
                          <li>
                            <b>Card #{carduri.id.replace(/[^0-9]/g, "")}</b> -{" "}
                            {carduri.title}{" "}
                            {lists[1].hasCards.includes(carduri.id) ? (
                              <div>
                                <b>IN PROGRESS</b> - since{" "}
                                <b>
                                  {new Date(
                                    carduri.startTime.seconds * 1000
                                  ).toLocaleString("en-GB")}
                                </b>
                              </div>
                            ) : (
                              <div />
                            )}
                            {lists[2].hasCards.includes(carduri.id) ? (
                              <div>
                                <b>FINISHED</b> - started at{" "}
                                <b>
                                  {new Date(
                                    carduri.startTime.seconds * 1000
                                  ).toLocaleString("en-GB")}
                                </b>
                                , took{" "}
                                {getDuration(
                                  carduri.endTime,
                                  carduri.startTime
                                )}
                              </div>
                            ) : (
                              <div />
                            )}
                            {lists[3].hasCards.includes(carduri.id) ? (
                              <div>
                                <b>PROBLEM</b> - encountered at{" "}
                                <b>
                                  {new Date(
                                    carduri.problemStart.seconds * 1000
                                  ).toLocaleString("en-GB")}
                                </b>
                              </div>
                            ) : (
                              <div />
                            )}
                          </li>
                        </MarginDiv>
                      );
                    }
                  })
                ) : (
                  <div />
                )}
              </ul>
            </MarginDiv>
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

                  // if (event.target.value === "by-progress") {
                  //   getReviewByProgress();
                  // }

                  setSelectValue(event.target.value);
                }}
              >
                <MenuItem value={"by-progress"}>By progress</MenuItem>
                <MenuItem value={"by-dept"}>By department</MenuItem>
                <MenuItem value={"by-user"}>By user</MenuItem>
                <MenuItem
                  disabled={
                    lists[2].hasCards.length !== cards.length ||
                    cards.length === 0
                  }
                  value={"by-stats"}
                >
                  Statistics
                </MenuItem>
              </Select>
            </FormControl>
          </MarginDiv>
          <MarginDiv>
            <Button
              style={{
                minHeight: "55px",
                minWidth: "55px",
                background: "black",
                color: "white",
              }}
              variant="contained"
              color="primary"
              onClick={() => {
                props.showFunction(false);
                setSelectValue("by-progress");
              }}
            >
              X
            </Button>
          </MarginDiv>
        </RowFlex>

        {/* {
          {
            "by-progress": (
              <ScrollableDiv>{getReviewByProgress()}</ScrollableDiv>
            ),
            "by-dept": <ScrollableDiv>{getReviewByDept()}</ScrollableDiv>,
            "by-user": <ScrollableDiv>{getReviewByUser()}</ScrollableDiv>,
            "by-stats": <ScrollableDiv>{getStatistics()}</ScrollableDiv>,
          }[selectValue]
        } */}

        {selectValue === "by-progress" ? (
          <ScrollableDiv>{getReviewByProgress()}</ScrollableDiv>
        ) : selectValue === "by-dept" ? (
          <ScrollableDiv>{getReviewByDept()}</ScrollableDiv>
        ) : selectValue === "by-user" ? (
          <ScrollableDiv>{getReviewByUser()}</ScrollableDiv>
        ) : selectValue === "by-stats" ? (
          <ScrollableDiv>{getStatistics()}</ScrollableDiv>
        ) : (
          <div />
        )}
      </ColumnFlex>
    </Wrapper>
  ) : (
    <div />
  );
}
