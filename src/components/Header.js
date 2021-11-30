// Header.js

import React from "react";
import { Grid, Button, Text } from "../elements";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { getCookie, deleteCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const history = useHistory();

  if (is_login) {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid>
            <Text margin="0" size="24px" bold>
              로고
            </Text>
          </Grid>

          <Grid is_flex>
            <Button text="내정보"></Button>
            <Button text="알림"></Button>
            <Button text="로그아웃" _onClick={()=>{dispatch(userActions.logOut({}))}}></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0" size="24px" bold>
            로고
          </Text>
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
`;

export default Header;
