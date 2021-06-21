import React, { useState, useEffect } from "react";

import firebase from "../firebase";
import "firebase/firestore";

export default function DownloadReview(username) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);

  const refLists = firebase.firestore().collection("lists");
  const refCards = firebase.firestore().collection("cards");
  const refUsers = firebase.firestore().collection("usernames");

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

  function getUsers() {
    refUsers.onSnapshot((querySnapshot) => {
      const userItems = [];
      querySnapshot.forEach((document) => {
        userItems.push(document.data());
      });
      setUsers(userItems);
    });
  }

  {
    getUsers();
    getLists();
    getCards();
  }

  let reviews = "Reviews \tas of " + new Date().toLocaleString("en-GB");
  reviews = reviews + "\n\t\tdownloaded by " + username;

  return reviews;
}
