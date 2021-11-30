// Header.js

import React from "react";
import { Grid, Button, Text } from "../elements";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  const is_login = sessionStorage.getItem(_session_key);

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
            <Button
              text="로그아웃"
              _onClick={() => {
                dispatch(userActions.logoutFB());
              }}
            ></Button>
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
          <Button text="회원가입" _onClick={()=>{history.push('/join')}}></Button>
          <Button text="로그인" _onClick={()=>{history.push('/login')}}></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
