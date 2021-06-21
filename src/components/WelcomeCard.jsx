import React, { useState, useEffect } from "react";
import styled from "styled-components";

import firebase from "../firebase";
import "firebase/firestore";

import PopUpCard from "./PopUpCard";
import PopUpUser from "./PopUpUser";
import PopUpList from "./PopUpList";

import PopUpCardEdit from "./PopUpCardEdit";
import PopUpUserEdit from "./PopUpUserEdit";
import PopUpListEdit from "./PopUpListEdit";

import PopUpCardDelete from "./PopUpCardDelete";
import PopUpUserDelete from "./PopUpUserDelete";
import PopUpListDelete from "./PopUpListDelete";

import PopUpUserView from "./PopUpUserView";

import PasswordChange from "./PasswordChange";
import AccountSettings from "./AccountSettings";

import Review from "./Review";

import DownloadReview from "./DownloadReview";

import { Button, Tooltip, Menu, MenuItem } from "@material-ui/core";

const Wrapper = styled.section`
  padding: 1em;
  background: lightgrey;
  border-radius: 10px;
  border-style: solid;
  border-width: thin;

  position: relative;
`;

const Title = styled.h1`
  font-size: 2em;
  font-family: Courier, sans-serif;

  text-align: center;
`;

const ButtonDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

  margin: 10px;

  display: flex;
  flex-direction: column;
`;

const MarginDiv = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
`;

export default function WelcomeCard(props) {
  const [users, setUsers] = useState([]);

  const refUsers = firebase.firestore().collection("usernames");

  function getUsers() {
    refUsers.onSnapshot((querySnapshot) => {
      const userItems = [];
      querySnapshot.forEach((document) => {
        userItems.push(document.data());
      });
      setUsers(userItems);
    });
  }

  function updateUser(updatedUser) {
    refUsers
      .doc(updatedUser.id)
      .update(updatedUser)
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  window.addEventListener("unload", (event) => {
    event.preventDefault();
    updateUser({
      id: getID(props.username),
      online: false,
      lastOnline: new Date(),
    });
    return event.returnValue;
  });

  const [cardsButtonShow, setCardsButtonShow] = useState(false);
  const [usersButtonShow, setUsersButtonShow] = useState(false);
  const [listsButtonShow, setListsButtonShow] = useState(false);

  const [editCardsButtonShow, setEditCardsButtonShow] = useState(false);
  const [editUsersButtonShow, setEditUsersButtonShow] = useState(false);
  const [editListsButtonShow, setEditListsButtonShow] = useState(false);

  const [deleteCardsButtonShow, setDeleteCardsButtonShow] = useState(false);
  const [deleteUsersButtonShow, setDeleteUsersButtonShow] = useState(false);
  const [deleteListsButtonShow, setDeleteListsButtonShow] = useState(false);

  const [viewUsersButtonShow, setViewUsersButtonShow] = useState(false);

  const [passwordChangeShow, setPasswordChangeShow] = useState(false);
  const [accountSettingsShow, setAccountSettingsShow] = useState(false);

  const [review, setReview] = useState(false);

  const [hover1, setHover1] = useState(false);

  const [anchor1, setAnchor1] = useState(null);
  const [anchor2, setAnchor2] = useState(null);
  const [anchor3, setAnchor3] = useState(null);
  const [anchor4, setAnchor4] = useState(null);
  const [anchor5, setAnchor5] = useState(null);

  function disableAllPopUps() {
    setCardsButtonShow(false);
    setUsersButtonShow(false);
    setListsButtonShow(false);

    setEditCardsButtonShow(false);
    setEditUsersButtonShow(false);
    setEditListsButtonShow(false);

    setDeleteCardsButtonShow(false);
    setDeleteUsersButtonShow(false);
    setDeleteListsButtonShow(false);

    setPasswordChangeShow(false);
    setAccountSettingsShow(false);

    setReview(false);
  }

  function getID(username) {
    let id = "";
    users.forEach((useri) => {
      if (useri.username === username) {
        id = useri.id;
      }
    });

    return id;
  }

  const welcome = "Welcome, " + props.username + ".";
  return (
    <Wrapper>
      <Title>{welcome}</Title>
      {props.isAdmin ? (
        <RowFlex>
          <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={(event) => {
                setAnchor5(event.currentTarget);
              }}
            >
              Reviews
            </Button>
            <Menu
              open={Boolean(anchor5)}
              anchorEl={anchor5}
              onClose={() => {
                setAnchor5(null);
              }}
            >
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setReview(true);
                  setAnchor5(null);
                }}
              >
                Get Reviews
              </MenuItem>
              <MenuItem
                onClick={() => {
                  disableAllPopUps();

                  let content = DownloadReview();

                  const element = document.createElement("a");
                  const file = new Blob([content], { type: "text" });

                  element.href = URL.createObjectURL(file);
                  element.download =
                    "Review " + new Date().toLocaleDateString("en-GB");

                  document.body.appendChild(element);
                  element.click();

                  setAnchor5(null);
                }}
              >
                Download as txt
              </MenuItem>
            </Menu>
          </MarginDiv>

          <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={(event) => {
                setAnchor1(event.currentTarget);
              }}
            >
              Cards
            </Button>
            <Menu
              open={Boolean(anchor1)}
              anchorEl={anchor1}
              onClose={() => {
                setAnchor1(null);
              }}
            >
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setCardsButtonShow(true);
                  setAnchor1(null);
                }}
              >
                Add Cards
              </MenuItem>
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setEditCardsButtonShow(true);
                  setAnchor1(null);
                }}
              >
                Edit Cards
              </MenuItem>
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setDeleteCardsButtonShow(true);
                  setAnchor1(null);
                }}
              >
                Delete Cards
              </MenuItem>
            </Menu>
          </MarginDiv>

          <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={(event) => {
                setAnchor2(event.currentTarget);
              }}
            >
              Users
            </Button>
            <Menu
              open={Boolean(anchor2)}
              anchorEl={anchor2}
              onClose={() => {
                setAnchor2(null);
              }}
            >
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setUsersButtonShow(true);
                  setAnchor2(null);
                }}
              >
                Add Users
              </MenuItem>
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setEditUsersButtonShow(true);
                  setAnchor2(null);
                }}
              >
                Edit Users
              </MenuItem>
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setDeleteUsersButtonShow(true);
                  setAnchor2(null);
                }}
              >
                Delete Users
              </MenuItem>
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setViewUsersButtonShow(true);
                  setAnchor2(null);
                }}
              >
                View Users
              </MenuItem>
            </Menu>
          </MarginDiv>

          <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={(event) => {
                setAnchor4(event.currentTarget);
              }}
            >
              Lists
            </Button>
            <Menu
              open={Boolean(anchor4)}
              anchorEl={anchor4}
              onClose={() => {
                setAnchor4(null);
              }}
            >
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setListsButtonShow(true);
                  setAnchor4(null);
                }}
              >
                Add Lists
              </MenuItem>
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setEditListsButtonShow(true);
                  setAnchor4(null);
                }}
              >
                Edit Lists
              </MenuItem>
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setDeleteListsButtonShow(true);
                  setAnchor4(null);
                }}
              >
                Delete Lists
              </MenuItem>
            </Menu>
          </MarginDiv>

          <Tooltip
            title={
              props.emergencies === 0
                ? "There is nobody in need of assistance"
                : "There are users who need help"
            }
          >
            <MarginDiv>
              <Button
                style={{
                  background: props.emergencies === 0 ? "black" : "firebrick",
                  color: "white",
                }}
                variant="contained"
                color="primary"
                size="small"
                disabled
              >
                Emergencies - {props.emergencies}
              </Button>
            </MarginDiv>
          </Tooltip>

          {/* <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setListsButtonShow(true);
              }}
            >
              Add list
            </Button>
          </MarginDiv> */}

          {/* <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setEditListsButtonShow(true);
              }}
            >
              Edit list
            </Button>
          </MarginDiv> */}

          {/* <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setDeleteListsButtonShow(true);
              }}
            >
              Delete list
            </Button>
          </MarginDiv> */}

          <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={(event) => {
                setAnchor3(event.currentTarget);
              }}
            >
              Account
            </Button>
            <Menu
              open={Boolean(anchor3)}
              anchorEl={anchor3}
              onClose={() => {
                setAnchor3(null);
              }}
            >
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setAccountSettingsShow(true);
                  setAnchor3(null);
                }}
              >
                Account Info
              </MenuItem>
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setPasswordChangeShow(true);
                  setAnchor3(null);
                }}
              >
                Change Password
              </MenuItem>
              <MenuItem
                onClick={() => {
                  updateUser({
                    id: getID(props.username),
                    online: false,
                    lastOnline: new Date(),
                  });
                  props.logout(false);
                  setAnchor3(null);
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </MarginDiv>

          {/* <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setCardsButtonShow(true);
              }}
            >
              Add Cards
            </Button>
          </MarginDiv> */}

          {/* <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setUsersButtonShow(true);
              }}
            >
              Add Users
            </Button>
          </MarginDiv> */}

          {/* <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setEditCardsButtonShow(true);
              }}
            >
              Edit Cards
            </Button>
          </MarginDiv> */}

          {/* <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setEditUsersButtonShow(true);
              }}
            >
              Edit Users
            </Button>
          </MarginDiv> */}

          {/* <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setDeleteCardsButtonShow(true);
              }}
            >
              Delete Cards
            </Button>
          </MarginDiv> */}

          {/* <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setDeleteUsersButtonShow(true);
              }}
            >
              Delete Users
            </Button>
          </MarginDiv> */}

          {/* <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setPasswordChangeShow(true);
              }}
            >
              Change password
            </Button>
          </MarginDiv> */}

          {/* <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setAccountSettingsShow(true);
              }}
            >
              Account Settings
            </Button>
          </MarginDiv> */}

          {/* <MarginDiv>
            <Button
              style={{
                background: hover1 === false ? "black" : "orange",
                color: hover1 === false ? "white" : "black",
              }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                props.logout(false);
              }}
              onMouseEnter={() => {
                setHover1(true);
              }}
              onMouseLeave={() => {
                setHover1(false);
              }}
            >
              LOGOUT
            </Button>
          </MarginDiv> */}
        </RowFlex>
      ) : (
        <RowFlex>
          <MarginDiv>
            <Button
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={(event) => {
                setAnchor3(event.currentTarget);
              }}
            >
              Account
            </Button>
            <Menu
              open={Boolean(anchor3)}
              anchorEl={anchor3}
              onClose={() => {
                setAnchor3(null);
              }}
            >
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setAccountSettingsShow(true);
                  setAnchor3(null);
                }}
              >
                Account Info
              </MenuItem>
              <MenuItem
                onClick={() => {
                  disableAllPopUps();
                  setPasswordChangeShow(true);
                  setAnchor3(null);
                }}
              >
                Change Password
              </MenuItem>
              {/* <MenuItem
                onClick={() => {
                  props.logout(false);
                  setAnchor3(null);
                }}
              >
                Logout
              </MenuItem> */}
            </Menu>
          </MarginDiv>

          <MarginDiv>
            <Button
              style={{
                background: hover1 === false ? "black" : "orange",
                color: hover1 === false ? "white" : "black",
              }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                updateUser({
                  id: getID(props.username),
                  online: false,
                  lastOnline: new Date(),
                });
                props.logout(false);
              }}
              onMouseEnter={() => {
                setHover1(true);
              }}
              onMouseLeave={() => {
                setHover1(false);
              }}
            >
              LOGOUT
            </Button>
          </MarginDiv>
        </RowFlex>
      )}

      <Review show={review} showFunction={setReview} />

      <PasswordChange
        username={props.username}
        show={passwordChangeShow}
        showFunction={setPasswordChangeShow}
      />

      <AccountSettings
        username={props.username}
        show={accountSettingsShow}
        showFunction={setAccountSettingsShow}
        logout={props.logout}
      />

      <PopUpCard show={cardsButtonShow} showFunction={setCardsButtonShow} />
      <PopUpUser show={usersButtonShow} showFunction={setUsersButtonShow} />
      <PopUpList show={listsButtonShow} showFunction={setListsButtonShow} />

      <PopUpCardEdit
        show={editCardsButtonShow}
        showFunction={setEditCardsButtonShow}
      />
      <PopUpUserEdit
        show={editUsersButtonShow}
        showFunction={setEditUsersButtonShow}
      />
      <PopUpListEdit
        show={editListsButtonShow}
        showFunction={setEditListsButtonShow}
      />

      <PopUpCardDelete
        show={deleteCardsButtonShow}
        showFunction={setDeleteCardsButtonShow}
      />
      <PopUpUserDelete
        show={deleteUsersButtonShow}
        showFunction={setDeleteUsersButtonShow}
      />
      <PopUpListDelete
        show={deleteListsButtonShow}
        showFunction={setDeleteListsButtonShow}
      />

      <PopUpUserView
        show={viewUsersButtonShow}
        showFunction={setViewUsersButtonShow}
      />
    </Wrapper>
  );
}
