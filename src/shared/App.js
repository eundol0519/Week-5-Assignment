// App.js

import "./App.css";
import React from "react";
import { Route } from "react-router-dom";

import Join from "../pages/Join";
import Login from "../pages/Login";
import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";
import Notification from "../pages/Notification";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Grid } from "../elements/index";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { apiKey } from "./firebase";
import { Button } from "../elements/index";

import Permit from "./Permit";
import Header from "../components/Header";

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList}></Route>
          <Route path="/join" exact component={Join}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/postWrite" exact component={PostWrite}></Route>
          <Route path="/postWrite/:id" exact component={PostWrite}></Route>     
          <Route path="/postDetail/:id" exact component={PostDetail}></Route>     
          <Route path="/noti" exact component={Notification}></Route>    
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button is_float text="+" _onClick={()=>{history.push('/postWrite')}}></Button>
      </Permit>
    </React.Fragment>
  );
}

export default App;
