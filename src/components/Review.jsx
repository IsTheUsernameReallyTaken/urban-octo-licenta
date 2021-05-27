import React, { useEffect, useState } from "react";
import styled from "styled-components";

import firebase from "../firebase";
import "firebase/firestore";
import { Button } from "@material-ui/core";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;

  background: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Review(props) {
  const [users, setUsers] = useState([]);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

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

  useEffect(() => {
    getUsers();
    getLists();
    getCards();
  }, []);

  return props.show ? (
    <Wrapper>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          props.showFunction(false);
        }}
      >
        CLOSE ME
      </Button>
    </Wrapper>
  ) : (
    <div />
  );
}
