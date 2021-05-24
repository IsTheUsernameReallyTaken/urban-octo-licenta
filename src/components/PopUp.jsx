import React from "react";
import styled from "styled-components";

const WrapperDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background: white;

  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PopUp(props) {
  return props.show ? (
    <WrapperDiv>
      <div>Test de popup</div>
      <button
        onClick={() => {
          props.showFunction(false);
        }}
      >
        close me
      </button>
    </WrapperDiv>
  ) : (
    <div />
  );
}
