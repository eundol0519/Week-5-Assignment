// Join.js

import React from "react";
import { Input, Button, Grid, Text } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Join = (props) => {

  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwd_check, setPwdCheck] = React.useState('');
  const [user_name, setUserName] = React.useState('');

  const join = () => {
    if(id === '' || pwd === '' || user_name === ''){
      window.alert("입력 되지 않은 정보가 있습니다.")
      return;
    }else if(pwd !== pwd_check){
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name))
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input label="아이디" placeholder="아이디를 입력 해주세요" _onChange={(e)=>{setId(e.target.value)}}></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input label="닉네임" placeholder="닉네임을 입력 해주세요" _onChange={(e)=>{setUserName(e.target.value)}}></Input>
        </Grid> 

        <Grid padding="16px 0px">
          <Input type="password" label="비밀번호" placeholder="비밀번호를 입력 해주세요" _onChange={(e)=>{setPwd(e.target.value)}}></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input type="password" label="비밀번호 확인" placeholder="비밀번호를 다시 입력 해주세요" _onChange={(e)=>{setPwdCheck(e.target.value)}}></Input>
        </Grid>

        <Button text="회원가입 하기" _onClick={()=>{join();}}></Button>
      </Grid>
    </React.Fragment>
  );
};

export default Join;
