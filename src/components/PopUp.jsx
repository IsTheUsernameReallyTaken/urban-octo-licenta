import React from "react";
import styled from "styled-components";

import { TextField, Button } from "@material-ui/core";

const WrapperDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background: white;

  padding: 20px;
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

export default function PopUp(props) {
  return props.show ? (
    <WrapperDiv>
      <TitleDiv>
        <div>Insert a title for the card you'd like to add</div>
      </TitleDiv>
      <form>
        <TextFieldDiv>
          <TextField
            id="cardTitleField"
            variant="outlined"
            label="Card Title"
          />
        </TextFieldDiv>

        <ButtonsFlexDiv>
          <SubmitDiv>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                const cardTitle =
                  document.getElementById("cardTitleField").value;

                console.log(
                  "HOORAY, adaugam un card cu titlul " + cardTitle + "."
                );
              }}
            >
              ADD CARD
            </Button>
          </SubmitDiv>

          <SubmitDiv>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                props.showFunction(false);
              }}
            >
              DISCARD
            </Button>
          </SubmitDiv>
        </ButtonsFlexDiv>
      </form>
    </WrapperDiv>
  ) : (
    <div />
  );
}
