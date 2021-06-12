import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";

import firebase from "../firebase";
import "firebase/firestore";

const WrapperDiv = styled.div`
  position: fixed;
  top: 20%;
  left: 20%;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

  width: 60%;
  height: 60vh;

  background: white;

  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.div`
  margin-bottom: 20px;
  font-size: 1.2em;
`;

const TextFieldDiv = styled.div`
  margin-top: 10px;
  padding: 5px;
`;

const ButtonsFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubmitDiv = styled.div`
  margin-top: 20px;
  padding: 5px;
`;

const SmallWrapper = styled.div`
  position: fixed;
  width: 40%;
  height: 40vh;

  top: 30%;
  left: 30%;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

  background: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallTitleDiv = styled.div`
  margin-bottom: 7px;
  font-size: 1.4em;
  padding: 40px;

  text-align: center;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function PopUpUserDelete(props) {
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

  function updateList(updatedList) {
    refLists
      .doc(updatedList.id)
      .update(updatedList)
      .catch((err) => {
        console.error(err);
      });
  }

  function updateCard(updatedCard) {
    refCards
      .doc(updatedCard.id)
      .update(updatedCard)
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteCard(id) {
    refCards
      .doc(id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getUsers();
    getLists();
    getCards();
  }, []);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectError, setSelectError] = useState(false);

  const [warningShow, setWarningShow] = useState(false);

  const [username1, setUsername1] = useState("");
  const [hasCards1, setHasCards1] = useState("");

  function deleteUser(id) {
    refUsers
      .doc(id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  function onUserDelete() {
    if (selectedUser === "") {
      setSelectError(true);
      return;
    }

    let username;

    users.forEach((useri) => {
      if (useri.id === selectedUser) {
        username = useri.username;
      }
    });

    let hasCards = [];
    cards.forEach((carduri) => {
      if (carduri.by === username) {
        hasCards[hasCards.length] = carduri.id;
      }
    });

    if (hasCards.length === 0) {
      deleteUser(selectedUser);
      props.showFunction(false);
    } else {
      setUsername1(username);
      setHasCards1(hasCards);
      setWarningShow(true);
    }

    console.log(hasCards);
    return;
  }

  function onWarningMoveCards() {
    hasCards1.forEach((cardIDs) => {
      cards.forEach((carduri) => {
        if (carduri.id === cardIDs) {
          let cardToMove = {
            id: carduri.id,
            title: carduri.title,
            department: carduri.department,
            startTime: "",
            endTime: "",
            problemStart: "",
            problemEnd: "",
            by: "",
          };

          updateCard(cardToMove);
        }
      });

      lists.forEach((listele) => {
        if (listele.hasCards.includes(cardIDs)) {
          let oldHasCards, newHasCards;

          oldHasCards = listele.hasCards;
          newHasCards = listele.hasCards;
          newHasCards.splice(listele.hasCards.indexOf(cardIDs), 1);

          let listToUpdate = {
            id: listele.id,
            hasCards: newHasCards,
          };

          updateList(listToUpdate);
        }
      });
    });

    let newHasCards;

    newHasCards = lists[0].hasCards.concat(hasCards1);

    let updatedList = {
      id: lists[0].id,
      hasCards: newHasCards,
    };

    updateList(updatedList);
    deleteUser(selectedUser);

    setWarningShow(false);
    setSelectError(false);
    setSelectedUser("");
    props.showFunction(false);
  }

  function onWarningDeleteCards() {
    console.log(hasCards1);

    hasCards1.forEach((cardIDs) => {
      lists.forEach((listele) => {
        if (listele.hasCards.includes(cardIDs)) {
          let oldHasCards, newHasCards;

          oldHasCards = listele.hasCards;
          newHasCards = listele.hasCards;
          newHasCards.splice(listele.hasCards.indexOf(cardIDs), 1);

          let listToUpdate = {
            id: listele.id,
            hasCards: newHasCards,
          };

          updateList(listToUpdate);
        }
      });

      deleteCard(cardIDs);
    });

    deleteUser(selectedUser);

    setWarningShow(false);
    setSelectError(false);
    setSelectedUser("");
    props.showFunction(false);
  }

  return props.show ? (
    <WrapperDiv>
      <form>
        <TitleDiv>
          <div>Choose the user you'd like to delete</div>
        </TitleDiv>

        <TextFieldDiv>
          <FormControl
            style={{ minWidth: "72.5%" }}
            variant="outlined"
            error={selectError}
          >
            <InputLabel>{warningShow ? "" : "Users"}</InputLabel>
            <Select
              label="Users"
              disabled={users.length === 0}
              onChange={(event) => {
                setSelectedUser(event.target.value);
                setSelectError(false);
              }}
            >
              {users.map((useri) => {
                return (
                  <MenuItem
                    key={useri.id}
                    value={useri.id}
                    disabled={useri.id.includes("admin")}
                  >
                    User #{useri.id.replace(/[^0-9]/g, "")} - D
                    {useri.department.replace(/[^0-9]/g, "")}: {useri.name}{" "}
                    {useri.surname}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>
              {selectError ? "Please select a user" : ""}
            </FormHelperText>
          </FormControl>
        </TextFieldDiv>

        <ButtonsFlexDiv>
          <SubmitDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                onUserDelete();
              }}
            >
              DELETE USER
            </Button>
          </SubmitDiv>

          <SubmitDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                setSelectError(false);
                props.showFunction(false);
              }}
            >
              EXIT
            </Button>
          </SubmitDiv>
        </ButtonsFlexDiv>
      </form>

      {warningShow ? (
        <SmallWrapper>
          <ColumnFlex>
            <SmallTitleDiv>
              You are about to delete a user that has cards associated with
              them.
            </SmallTitleDiv>
            <CenterDiv>
              <RowFlex>
                <SubmitDiv>
                  <Button
                    style={{ background: "black", color: "white" }}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      onWarningMoveCards();
                    }}
                  >
                    Move cards
                  </Button>
                </SubmitDiv>

                <SubmitDiv>
                  <Button
                    style={{ background: "black", color: "white" }}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      onWarningDeleteCards();
                    }}
                  >
                    Delete cards
                  </Button>
                </SubmitDiv>

                <SubmitDiv>
                  <Button
                    style={{ background: "black", color: "white" }}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                      setWarningShow(false);
                    }}
                  >
                    Back
                  </Button>
                </SubmitDiv>
              </RowFlex>
            </CenterDiv>
          </ColumnFlex>
        </SmallWrapper>
      ) : (
        <div />
      )}
    </WrapperDiv>
  ) : (
    <div />
  );
}
