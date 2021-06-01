import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PopUpCard from "./PopUpCard";
import PopUpUser from "./PopUpUser";
import PopUpCardDelete from "./PopUpCardDelete";

import Review from "./Review";

import { Button } from "@material-ui/core";

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
  margin: 10px;
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
  const [deleteCardsButtonShow, setDeleteCardsButtonShow] = useState(false);
  const [review, setReview] = useState(false);

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
                props.logout(false);
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
              style={{ background: "black", color: "white" }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                props.logout(false);
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
      <PopUpCardDelete
        show={deleteCardsButtonShow}
        showFunction={setDeleteCardsButtonShow}
      />
    </Wrapper>
  );
}
