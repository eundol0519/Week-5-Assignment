// App.js

import "./App.css";
import React from "react";
import { Route } from "react-router-dom";

import Join from "../pages/Join";
import Login from "../pages/Login";
import PostList from "../pages/PostList";
import PostWrite from "../pages/PostWrite";
import PostDetail from "../pages/PostDetail";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Header from "../components/Header";
import { Grid } from '../elements/index'

function App() {
  return (
    <React.Fragment>
        <Grid>
          <Header></Header>
          <ConnectedRouter history={history}>
            <Route path="/" exact component={PostList}></Route>
            <Route path="/join" component={Join}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/postWrite" component={PostWrite}></Route>
            <Route path="/postDetail" component={PostDetail}></Route>
          </ConnectedRouter>
        </Grid>
    </React.Fragment>
  );
}

export default App;
