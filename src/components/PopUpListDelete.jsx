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
  font-size: 1.2em;
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

export default function PopUpListDelete(props) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

  const [selectedList, setSelectedList] = useState("");
  const [selectError, setSelectError] = useState(false);

  const [warningShow, setWarningShow] = useState(false);

  const refLists = firebase.firestore().collection("lists");
  const refCards = firebase.firestore().collection("cards");

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

  function deleteList(id) {
    refLists
      .doc(id)
      .delete()
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

  function onListDelete() {
    if (selectedList === "") {
      setSelectError(true);
      return;
    } else {
      setSelectError(false);
    }

    let theCards = [];

    lists.forEach((listele) => {
      if (listele.id === selectedList) {
        theCards = listele.hasCards;
      }
    });

    if (theCards.length !== 0) {
      setWarningShow(true);
      return;
    }

    deleteList(selectedList);
    props.showFunction(false);
  }

  function onWarningMoveCards() {
    let theCards1 = [];
    lists.forEach((listele) => {
      if (listele.id === selectedList) {
        theCards1 = listele.hasCards;
      }
    });

    cards.forEach((carduri1) => {
      theCards1.forEach((carduriID) => {
        if (carduri1.id === carduriID) {
          let id = carduri1.id,
            titlu = carduri1.title,
            dept = carduri1.department;

          const updatedCard = {
            id: id,
            title: titlu,
            department: dept,
            startTime: "",
            endTime: "",
            problemStart: "",
            problemEnd: "",
            by: "",
          };

          updateCard(updatedCard);
        }
      });
    });

    let newHasCards;

    newHasCards = lists[0].hasCards.concat(theCards1);

    let updatedList = {
      id: lists[0].id,
      hasCards: newHasCards,
    };

    updateList(updatedList);
    deleteList(selectedList);

    setWarningShow(false);
    setSelectError(false);
    setSelectedList("");
    props.showFunction(false);
  }

  function onWarningDeleteCards() {
    let theCards1 = [];
    lists.forEach((listele) => {
      if (listele.id === selectedList) {
        theCards1 = listele.hasCards;
      }
    });

    cards.forEach((carduri1) => {
      theCards1.forEach((carduriID) => {
        if (carduri1.id === carduriID) {
          deleteCard(carduri1.id);
        }
      });
    });

    deleteList(selectedList);

    setWarningShow(false);
    setSelectError(false);
    setSelectedList("");
    props.showFunction(false);
  }

  useEffect(() => {
    getCards();
    getLists();
  }, []);

  function isDisabled(listID) {
    if (
      listID === "list-1" ||
      listID === "list-2" ||
      listID === "list-3" ||
      listID === "list-4m"
    ) {
      return true;
    }
    return false;
  }

  return props.show ? (
    <div>
      <WrapperDiv>
        <form>
          <TitleDiv>
            <div>Choose the list you'd like to delete</div>
          </TitleDiv>

          <TextFieldDiv>
            <FormControl
              style={{ minWidth: "72.5%" }}
              variant="outlined"
              error={selectError}
            >
              <InputLabel>Lists</InputLabel>
              <Select
                label="Lists"
                disabled={lists.length === 0}
                onChange={(event) => {
                  setSelectedList(event.target.value);
                  setSelectError(false);
                }}
              >
                {lists.map((listele) => {
                  return (
                    <MenuItem
                      key={listele.id}
                      value={listele.id}
                      disabled={isDisabled(listele.id)}
                    >
                      List #{listele.id.replace(/[^0-9]/g, "")} -{" "}
                      {listele.title}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {selectError ? "Please select a list" : ""}
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
                  onListDelete();
                }}
              >
                Delete List
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
                  setSelectedList("");
                  props.showFunction(false);
                }}
              >
                EXIT
              </Button>
            </SubmitDiv>
          </ButtonsFlexDiv>
        </form>
      </WrapperDiv>

      {warningShow ? (
        <SmallWrapper>
          <ColumnFlex>
            <SmallTitleDiv>
              You are about to delete a list that contains cards.
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
    </div>
  ) : (
    <div />
  );
}
