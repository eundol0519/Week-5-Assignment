// Header.js

import React from "react";
import { Grid, Button, Text } from "../elements";
import styled from "styled-components";
import { useHistory } from 'react-router-dom'

const Header = (props) => {

  const history = useHistory();

  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Btn onClick={()=>history.push("/")}><Text margin="0" size="24px" bold>로고</Text></Btn>
        </Grid>

        <Grid is_flex>
          <Button text="회원가입" path="/join"></Button>
          <Button text="로그인" path="/login"></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Btn = styled.button`
  border: none;
  background-color: white;
`

export default Header;
