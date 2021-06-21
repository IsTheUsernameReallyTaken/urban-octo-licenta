import React, { useState, useEffect } from "react";

import firebase from "../firebase";
import "firebase/firestore";

export default function DownloadReview(username) {
  const users = [];
  const lists = [];
  const cards = [];

  const refLists = firebase.firestore().collection("lists");
  const refCards = firebase.firestore().collection("cards");
  const refUsers = firebase.firestore().collection("usernames");

  refLists.onSnapshot((querySnapshot) => {
    querySnapshot.forEach((document) => {
      lists.push(document.data());
    });
  });

  refCards.onSnapshot((querySnapshot) => {
    querySnapshot.forEach((document) => {
      cards.push(document.data());
    });
  });

  refUsers.onSnapshot((querySnapshot) => {
    querySnapshot.forEach((document) => {
      users.push(document.data());
    });
  });

  let reviews = "Reviews \tas of " + new Date().toLocaleString("en-GB");
  reviews = reviews + "\n\t\tdownloaded by " + username;

  return reviews;
}
