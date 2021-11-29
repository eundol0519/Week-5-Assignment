// App.js

import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Join from "../pages/Join";
import Login from "../pages/Login";
import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import NotFound from "../pages/NotFound";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Link to="/join">회원가입</Link><br/>
            <Link to="/login">로그인</Link><br/>
            <Link to="/postList">게시물 목록</Link><br/>
            <Link to="/postWrite">게시물 작성</Link><br/>
            <Link to="/postDetail">게시물 상세</Link><br/>
          </Route>
          <Route path="/join" component={Join}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/postList" component={PostList}></Route>
          <Route path="/postWrite" component={PostWrite}></Route>
          <Route path="/postDetail" component={PostDetail}></Route>
          <Route>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
