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

const HeaderDiv = styled.div`
  position: fixed

  top: 10%;
  left: 10%;
`;

const TextDiv = styled.div`
  font-size: 1.5em;
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

  function getReviewByProgress() {
    let objDone, objInProgress, objToDo, objProblems;

    lists.forEach((listele) => {
      if (listele.id === "list-3") {
        objDone = (
          <MarginDiv>The completed tasks are: {listele.hasCards}</MarginDiv>
        );
      }
      if (listele.id === "list-2") {
        objInProgress = (
          <MarginDiv>
            The tasks in progress are: {listele.hasCards + " "}
          </MarginDiv>
        );
      }
    });

    return (
      <TextDiv>
        {objDone}
        {objInProgress}
      </TextDiv>
    );
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
          <div>{getReviewByProgress()}</div>
        ) : selectValue === "by-dept" ? (
          <div>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
            <h1>This is a review by department</h1>
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
