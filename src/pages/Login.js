// Login.js

import React from "react";
import Header from "../components/Header";
import { Grid, Text, Button, Input } from "../elements";

const Login = (props) => {

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Header bold size="32px"></Header>
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input label="아이디" placeholder="아이디를 입력 해주세요" _onChange={()=>{console.log("아이디 작성")}}></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input type="password" label="비밀번호" placeholder="비밀번호를 입력 해주세요" _onChange={()=>{console.log("비밀번호 작성")}}></Input>
        </Grid>

        <Button shape='full' text="로그인 하기"></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
