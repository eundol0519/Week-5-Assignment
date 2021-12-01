// configStore.js

// *** import 하기
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";
import Image from './modules/image';


// *** 스토어에 히스토리 넣어주기 (리듀서랑 히스토리 연결하기)
export const history = createBrowserHistory();

// *** root reducer 만들기
const rootReducer = combineReducers({
    user: User,
    post : Post,
    image : Image,
    router : connectRouter(history),
  });


// *** 미들웨어 준비하기
// const middlewares = [thunk];
const middlewares = [thunk.withExtraArgument({history: history})];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// *** 크롬 확장 프로그램, redux devTools 사용 설정하기
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// *** 미들웨어를 묶는다.
const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
  );

// *** 미들웨어하고 루트 리듀서를 엮어서 스토어를 만든다.
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();