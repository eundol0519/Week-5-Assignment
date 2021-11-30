// user.js

// *** import 하기
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// *** 액션 타입
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// *** 액션 생성 함수
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// ** 미들웨어
const loginAction = (user) => {
  return function (dispatch, getState, {history}){
    dispatch(logIn(user));
    history.push('/');
  }
}

// *** 초기값
const initialState = {
  user: null,
  is_login: false,
};

// *** 리듀서
export default handleActions({
  [LOG_IN]: (state, action) =>
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
}, initialState); // 초깃값 설정

// *** 액션 생성 함수 내보내기
const actionCreators = {
    logIn,
    logOut,
    getUser,
    loginAction,
}

export { actionCreators };
