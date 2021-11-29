// Button.js

import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Button = (props) => {
  const { shape, text, _onClick, path } = props;
  const history = useHistory();

  return (
    <React.Fragment>
      {shape === "full" ? (
        <Full onClick={_onClick}>{text}</Full>
      ) : (
        <NotFull
          onClick={() => {
            history.push(path);
          }}
        >
          {text}
        </NotFull>
      )}
    </React.Fragment>
  );
};

Button.defaultProps = {
  shape: "notFull",
  text: "텍스트를 작성 해주세요",
  _onClick: () => {},
};

const Full = styled.button`
  width: 100%;
  height: 60px;
  background-color: black;
  color: white;
  border: none;
  margin-top: 10px;
  padding: 12px 0px;
  box-sizing: border-box;
  text-align: center;
`;

const NotFull = styled.div`
  width: 100%;
  height: 60px;
  background-color: #dcdcdc;
  border: none;
  margin: 10px 0px 0px 10px;
  align-items: center;
  padding: 12px 0px;
  box-sizing: border-box;
  text-align: center;
`;

export default Button;
