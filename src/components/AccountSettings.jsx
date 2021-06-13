import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Button, TextField, Checkbox } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import firebase from "../firebase";
import "firebase/firestore";

const Wrapper = styled.div`
  position: fixed;
  width: 64%;
  height: 64vh;

  top: 18%;
  left: 18%;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

  background: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitDiv = styled.div`
  margin-top: 20px;
  padding: 5px;
`;

const TextFieldDiv = styled.div`
  margin-top: 10px;
  padding: 5px;
`;

const TitleDiv = styled.div`
  margin-bottom: 7px;
  font-size: 1.2em;
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

const MarginDiv = styled.div`
  margin: 5px;
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

export default function AccountSettings(props) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [editable, setEditable] = useState(false);

  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);

  const [warningShow, setWarningShow] = useState(false);
  const [oldUser1, setOldUser1] = useState();
  const [newUser1, setNewUser1] = useState();

  const refUsers = firebase.firestore().collection("usernames");
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
    getCards();
    getInfo(props.username);
  }, [props.show]);

  function updateUser(updatedUser) {
    refUsers
      .doc(updatedUser.id)
      .update(updatedUser)
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

  function onSaveChanges() {
    if (editable === false) {
      return;
    }

    let id;
    users.forEach((useri) => {
      if (useri.username === props.username) {
        id = useri.id;
      }
    });

    const oldUser = {
      id: id,
      username: username,
      name: name,
      surname: surname,
      email: email,
    };

    const newUser = {
      id: id,
      username: newUsername,
      name: newName,
      surname: newSurname,
      email: newEmail,
    };

    // console.log(oldUser);
    // console.log(newUser);

    if (newUsername.length === 0) {
      setUsernameError(true);
      setUsernameErrorMessage("New username cannot be empty");

      setNameError(false);
      setSurnameError(false);
      setEmailError(false);
      return;
    } else {
      setUsernameError(false);
    }

    if (newName.length === 0) {
      setNameError(true);
      setSurnameError(false);
      setEmailError(false);
      return;
    } else {
      setNameError(false);
    }

    if (newSurname.length === 0) {
      setSurnameError(true);
      setEmailError(false);
      return;
    } else {
      setSurnameError(false);
    }

    if (newEmail.length === 0) {
      setEmailError(true);
      setEmailErrorMessage("Email cannot be empty");
      return;
    } else {
      setNameError(false);
    }

    if (
      newEmail.endsWith("@firma.com") === false &&
      newEmail.endsWith("@gmail.com") === false &&
      newEmail.endsWith("@yahoo.com") === false
    ) {
      setEmailError(true);
      setEmailErrorMessage("Email is invalid");
      return;
    } else {
      setEmailError(false);
    }

    if (
      oldUser.username === newUser.username &&
      oldUser.name === newUser.name &&
      oldUser.surname === newUser.surname &&
      oldUser.email === newUser.email
    ) {
      setUsernameError(true);
      setUsernameErrorMessage("No changes have been made");
      return;
    } else {
      setUsernameError(false);
    }

    if (!newUsername.toLowerCase().includes(newSurname.toLowerCase())) {
      setUsernameError(true);
      setUsernameErrorMessage("Username must contain surname");
      return;
    } else {
      setUsernameError(false);
    }

    let usernameTaken = false;
    users.forEach((useri) => {
      if (useri.username === newUsername) {
        usernameTaken = true;
      }
    });

    if (usernameTaken === true) {
      setUsernameError(true);
      setUsernameErrorMessage("Username is already taken");
      return;
    } else {
      setUsernameError(false);
    }

    setUsernameError(false);
    setNameError(false);
    setSurnameError(false);
    setEmailError(false);

    if (oldUser.username === newUser.username) {
      updateUser(newUser);
      props.showFunction(false);
      return;
    } else {
      setOldUser1(oldUser);
      setNewUser1(newUser);
      setWarningShow(true);
    }
  }

  function onSaveChangesAgain() {
    // console.log("haha ok");
    // console.log(oldUser1);
    // console.log(newUser1);

    cards.forEach((carduri) => {
      let newCard = {};
      if (carduri.by === oldUser1.username) {
        newCard = {
          id: carduri.id,
          by: newUser1.username,
        };
        // console.log(
        //   newCard.id + " " + oldUser.username + " -> " + newUser.username
        // );
        updateCard(newCard);
      }
    });

    updateUser(newUser1);
    props.logout(false);
    props.showFunction(false);
  }

  function getInfo(username) {
    users.forEach((useri) => {
      if (useri.username === username) {
        setUsername(useri.username);
        setName(useri.name);
        setSurname(useri.surname);
        setEmail(useri.email);

        setNewUsername(useri.username);
        setNewName(useri.name);
        setNewSurname(useri.surname);
        setNewEmail(useri.email);
      }
    });
  }

  return props.show ? (
    <Wrapper>
      {/* {getInfo(props.username)} */}
      <ColumnFlex>
        <TitleDiv>Account information for {props.username}</TitleDiv>
        {/* {getInfo(props.username)} */}
        <TextFieldDiv>
          <RowFlex>
            <TextField
              error={usernameError}
              helperText={usernameError ? usernameErrorMessage : ""}
              id="usernameField"
              variant="outlined"
              label={warningShow === false ? "Username" : ""}
              value={newUsername}
              disabled={!editable}
              onChange={(event) => {
                // console.log(event.target.value);
                setNewUsername(event.target.value);
              }}
            />
            <MarginDiv>
              <EditIcon
                onClick={() => {
                  setEditable(!editable);
                }}
              />
            </MarginDiv>
          </RowFlex>
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={nameError}
            helperText={nameError ? "Name cannot be empty" : ""}
            id="nameField"
            variant="outlined"
            label={warningShow === false ? "Name" : ""}
            value={newName}
            disabled={!editable}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={surnameError}
            helperText={surnameError ? "Surname cannot be empty" : ""}
            id="surnameField"
            variant="outlined"
            label={warningShow === false ? "Surname" : ""}
            value={newSurname}
            disabled={!editable}
            onChange={(event) => {
              setNewSurname(event.target.value);
            }}
          />
        </TextFieldDiv>

        <TextFieldDiv>
          <TextField
            error={emailError}
            helperText={emailError ? emailErrorMessage : ""}
            id="emailField"
            variant="outlined"
            label={warningShow === false ? "Email" : ""}
            value={newEmail}
            disabled={!editable}
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
          />
        </TextFieldDiv>

        <RowFlex>
          <SubmitDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                onSaveChanges();
              }}
            >
              Save changes
            </Button>
          </SubmitDiv>

          <SubmitDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                setUsernameError(false);
                setNameError(false);
                setSurnameError(false);
                setEmailError(false);

                setEditable(false);
                props.showFunction(false);
              }}
            >
              EXIT
            </Button>
          </SubmitDiv>
        </RowFlex>
      </ColumnFlex>

      {warningShow ? (
        <SmallWrapper>
          <ColumnFlex>
            <SmallTitleDiv>
              Changing the username will log you out, in order for the changes
              to take effect. Are you sure you want to continue?
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
                      onSaveChangesAgain();
                    }}
                  >
                    Yes
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
                    No
                  </Button>
                </SubmitDiv>
              </RowFlex>
            </CenterDiv>
          </ColumnFlex>
        </SmallWrapper>
      ) : (
        <div />
      )}
    </Wrapper>
  ) : (
    <div />
  );
}
