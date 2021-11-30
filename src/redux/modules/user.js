// user.js

// *** import 하기
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";
import firebase from "firebase/compat/app";

// *** 액션 타입
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// *** 액션 생성 함수
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// *** 초기값
const initialState = {
  user: null,
  is_login: false,
};

// *** 미들웨어
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(setUser(user));
    history.push("/");
  };
};

const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd) // 로그인 처리
        .then((user) => {
          console.log(user);

          dispatch( 
            setUser({ // 로그인 후 유저의 정보를 리덕스에 저장한다.
              user_name: user.user.displayName,
              id: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );

          history.push("/");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode, errorMessage);
        });
    });
  };
};

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd) // 가입 시키기
      .then((user) => {
        console.log(user);

        auth.currentUser
          .updateProfile({
            // 가입한 후 display_name으로 user_name 업데이 하기
            displayName: user_name,
          })
          .then(() => {
            dispatch(
              setUser({ user_name: user_name, id: id, user_profile: "" })
            );
            // user의 정보를 리덕스에 저장한다.
            history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });

        // Signed in
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

const loginCheckFB = () => { // 페이지에 접속 했을 때 로그인 유무를 확인한다.
  return function (dispatch, getState, {history}){
    auth.onAuthStateChanged((user) => {
      if(user){
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            id: user.email,
            uid: user.uid,
          })
        );
      }else{
        dispatch(logOut());
      }
    })
  }
}

const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace('/');
    })
  }
}

// *** 리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // state의 값을 복사해서 draft로 만들어서 자동으로 불변성 관리를 해준다.
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        // state의 값을 복사해서 draft로 만들어서 자동으로 불변성 관리를 해준다.
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
); // 초깃값 설정

// *** 액션 생성 함수 내보내기
const actionCreators = {
  logOut,
  getUser,
  loginAction,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
