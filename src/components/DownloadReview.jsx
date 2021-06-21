import React, { useState, useEffect } from "react";

import firebase from "../firebase";
import "firebase/firestore";

export default function DownloadReview(username, users, lists, cards) {
  let reviews = "Reviews \tas of " + new Date().toLocaleString("en-GB");
  reviews = reviews + "\n\t\tdownloaded by " + username;

  console.log(users);

  return reviews;
}
