// post.js

import { createAction, handleActions } from "redux-actions"; // action, reducer 쉽게 만들어 주는 역할
import { produce } from "immer"; // 불변성 관리
import { firestore } from "../../shared/firebase"; // firebase 연동

import moment from "moment";

// 액션 타입=
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

// 액션 생성 함수
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

// 초기값
const initialState = {
  list: [],
};

// 게시글 하나에는 어떤 정보가 있어야 하는 지 하나 만들어둡시다! :)
const initialPost = {
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "고양이네요!",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"), // 날짜 형식을 설정한다.
};

// 미들웨어
const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const _user = getState().user.user;
    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents, // 게시물 작성 할 때 작성한 글로 대체
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"), // 게시물을 작성한 날짜로 대체
    };

    postDB.add({...user_info, ..._post}).then((doc)=>{
      // redux에 id를 추가한다.
      let post = {user_info, ..._post, id : doc.id} // 리덕스에 넣을 데이터
      dispatch(addPost(post)) // 리덕스에 데이터를 넣는다.
      history.replace('/') // 파이어스토어, 리덕스에 데이터가 성공적으로 들어가면 메인 화면으로 전환한다.
    }).catch((err)=>{
      console.log("post 작성 실패", err)
    })
  };
};

// 리듀서
export default handleActions(
  {
    [SET_POST]: (state, action) => produce(state, (draft) => {}),

    [ADD_POST]: (state, action) => produce(state, (draft) => {
      // unshift는 배열 맨 앞에 데이터를 넣어줘요!
      draft.list.unshift(action.payload.post);
    }),
  },
  initialState
);

// 액션 생성 함수 내보내기
const actionCreators = {
  setPost,
  addPost,
  addPostFB,
};

export { actionCreators };
