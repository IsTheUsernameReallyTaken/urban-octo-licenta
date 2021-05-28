import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PopUpCard from "./PopUpCard";
import PopUpUser from "./PopUpUser";
import Review from "./Review";

import { Button } from "@material-ui/core";

const Wrapper = styled.section`
  padding: 1em;
  background: papayawhip;
  border-radius: 10px;
  border-style: solid;
  border-width: thin;

  position: relative;
`;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: palevioletred;
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
  const [review, setReview] = useState(false);

  const welcome = "Welcome to our humble little app, " + props.username + ".";
  return (
    <Wrapper>
      <Title>{welcome}</Title>

      {props.isAdmin ? (
        <RowFlex>
          <MarginDiv>
            <Button
              style={{ background: "Gainsboro", color: "black" }}
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
              style={{ background: "Gainsboro", color: "black" }}
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
              style={{ background: "Gainsboro", color: "black" }}
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
              style={{ background: "Gainsboro", color: "black" }}
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
        <ButtonDiv>
          <Button
            size="small"
            onClick={() => {
              props.logout(false);
            }}
          >
            LOGOUT
          </Button>
        </ButtonDiv>
      )}
      <Review show={review} showFunction={setReview} />
      <PopUpCard show={cardsButtonShow} showFunction={setCardsButtonShow} />
      <PopUpUser show={usersButtonShow} showFunction={setUsersButtonShow} />
    </Wrapper>
  );
}
