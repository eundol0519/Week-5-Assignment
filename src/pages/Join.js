// Join.js

import React from "react";
import { Input, Button, Grid, Text } from "../elements";
import Header from "../components/Header";

const Join = (props) => {

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Header bold size="32px"></Header>
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input label="아이디" placeholder="아이디를 입력 해주세요" _onChange={()=>{console.log("아이디 작성")}}></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input label="닉네임" placeholder="닉네임을 입력 해주세요" _onChange={()=>{console.log("닉네임 작성")}}></Input>
        </Grid> 

        <Grid padding="16px 0px">
          <Input type="text" label="이메일" placeholder="이메일을 입력 해주세요" _onChange={()=>{console.log("이메일 작성")}}></Input>
        </Grid> 

        <Grid padding="16px 0px">
          <Input type="password" label="비밀번호" placeholder="비밀번호를 입력 해주세요" _onChange={()=>{console.log("비밀번호 작성")}}></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input type="password" label="비밀번호 확인" placeholder="비밀번호를 다시 입력 해주세요" _onChange={()=>{console.log("비밀번호 다시 작성")}}></Input>
        </Grid>

        <Button shape='full' text="회원가입 하기"></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Join;
