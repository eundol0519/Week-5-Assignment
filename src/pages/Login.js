// Login.js

import React from "react";
import { Grid, Text, Button, Input } from "../elements";

import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { emailCheck } from "../shared/common";

const Login = (props) => {

  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const login = () => {

    if(id === '' || pwd === ''){
      window.alert("아이디 혹은 비밀번호가 공란입니다. 입력 해주세요")
      return;
    }

    if(!emailCheck(id)){
      window.alert("이메일 형식이 맞지 않습니다")
      return
    }

    dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력 해주세요"
            _onChange={(e) => {
              setId(e.target.value);
            }}
            value={id}
          ></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력 해주세요"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
            value={pwd}
          ></Input>
        </Grid>

        <Button
          _onClick={() => {
            login();
          }}
          text="로그인 하기"
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
