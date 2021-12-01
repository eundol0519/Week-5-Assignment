// Input.js

import React from "react";
import styled from "styled-components";
import { Text, Grid } from "../elements";

const Input = (props) => {
  const { label, placeholder, _onChange, _onKeyUp, type, multiLine, value } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <InputBox
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          onKeyUp={_onKeyUp}
        ></InputBox>
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력 해주세요",
  type: "text",
  _onChange: () => {},
  _onKeyUp: () => {},
  value : "",
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const InputBox = styled.input`
  border: 1px solid #212121;
  width: 100%;
  height: 50px;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
