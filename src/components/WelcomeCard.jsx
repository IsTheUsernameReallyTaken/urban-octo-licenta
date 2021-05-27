import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PopUpCard from "./PopUpCard";
import PopUpUser from "./PopUpUser";
import getReview from "./Review";

import { Button } from "@material-ui/core";
import Review from "./Review";

const Wrapper = styled.section`
  padding: 1em;
  background: papayawhip;
  border-radius: 10px;
  border-style: solid;
  border-width: thin;

  position: relative;
`;

const Title = styled.h1`
  font-size: 1.7em;
  text-align: center;
  color: palevioletred;
`;

const ButtonDiv = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  border-radius: 7px;
  border-style: solid;
  border-width: thin;

  margin: 10px;

  display: flex;
  flex-direction: column;
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
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setReview(true);
            }}
          >
            GET REPORT
          </Button>

          <ButtonDiv>
            <Button
              color="default"
              size="small"
              onClick={() => {
                setCardsButtonShow(true);
              }}
            >
              Add Cards
            </Button>

            <Button
              color="default"
              size="small"
              onClick={() => {
                setUsersButtonShow(true);
              }}
            >
              Add Users
            </Button>
            <Button
              size="small"
              onClick={() => {
                props.logout(false);
              }}
            >
              LOGOUT
            </Button>
          </ButtonDiv>
        </div>
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
