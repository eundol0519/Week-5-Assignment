// Button.js

import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Button = (props) => {
  const { text, _onClick, className } = props;
  const history = useHistory();

  return (
    <React.Fragment>
        <Btn className={className} onClick={_onClick}>{text}</Btn>
    </React.Fragment>
  );
};

Button.defaultProps = {
  shape: "notFull",
  text: "텍스트를 작성 해주세요",
  _onClick: () => {},
  className : "",
};

const Btn = styled.button`
  width: 100%;
  height: 60px;
  color: white;
  border: none;
  background-color: ${(props) => (props.className === 'unActiveBtn' ? 'gray' : 'black')};
  margin-top: 10px;
  padding: 12px 0px;
  box-sizing: border-box;
  text-align: center;
`;

export default Button;
