import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PopUpCard from "./PopUpCard";
import PopUpUser from "./PopUpUser";

import PopUpCardEdit from "./PopUpCardEdit";
import PopUpUserEdit from "./PopUpUserEdit";

import PopUpCardDelete from "./PopUpCardDelete";
import PopUpUserDelete from "./PopUpUserDelete";

import Review from "./Review";

import { Button, Tooltip } from "@material-ui/core";

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
  const [cardsButtonShow, setCardsButtonShow] = useState(false);
  const [usersButtonShow, setUsersButtonShow] = useState(false);

  const [editCardsButtonShow, setEditCardsButtonShow] = useState(false);
  const [editUsersButtonShow, setEditUsersButtonShow] = useState(false);

  const [deleteCardsButtonShow, setDeleteCardsButtonShow] = useState(false);
  const [deleteUsersButtonShow, setDeleteUsersButtonShow] = useState(false);

  const [review, setReview] = useState(false);

  const [hover1, setHover1] = useState(false);

  const welcome = "Welcome to our humble little app, " + props.username + ".";
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
              onClick={() => {
                setReview(true);
              }}
            >
              GET REPORT
            </Button>
          </MarginDiv>

          <MarginDiv>
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
          </MarginDiv>

          <MarginDiv>
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
          </MarginDiv>

          <MarginDiv>
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
          </MarginDiv>

          <MarginDiv>
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
          </MarginDiv>

          <MarginDiv>
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
          </MarginDiv>

          <MarginDiv>
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
      ) : (
        <RowFlex>
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

      <PopUpCard show={cardsButtonShow} showFunction={setCardsButtonShow} />
      <PopUpUser show={usersButtonShow} showFunction={setUsersButtonShow} />

      <PopUpCardEdit
        show={editCardsButtonShow}
        showFunction={setEditCardsButtonShow}
      />
      <PopUpUserEdit
        show={editUsersButtonShow}
        showFunction={setEditUsersButtonShow}
      />

      <PopUpCardDelete
        show={deleteCardsButtonShow}
        showFunction={setDeleteCardsButtonShow}
      />
      <PopUpUserDelete
        show={deleteUsersButtonShow}
        showFunction={setDeleteUsersButtonShow}
      />
    </Wrapper>
  );
}
