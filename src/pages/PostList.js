// PostList.js
import React from "react";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = (props) => {
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user); // 사용자 정보
  const post_list = useSelector((state) => state.post.list); // 게시물 목록 정보
  const is_loading = useSelector((state) => state.post.is_loading); // 로딩 정보
  const paging = useSelector((state) => state.post.paging); // 페이징 정보

  React.useEffect(() => {
    if (post_list.length === 0) {
      // 게시물 목록에 데이터가 없으면
      dispatch(postActions.getPostFB()); // firebase에서 게시물 목록을 불러온다.
    }
  }, []);

  return (
    <React.Fragment>
      <InfinityScroll
        callNext={() => {
          console.log("next!");
          dispatch(postActions.getPostFB(paging.next)) // 다음 목록 부르기
          // getPostFB()에서 start 파라미터 값으로 paging.next 값을 넣어서 다음 목록을 부른다.
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((p, idx) => {
          if (user_info && p.user_info.user_id === user_info.uid) {
            return <Post key={p.id} {...p} is_me />;
          }
          return <Post key={p.id} {...p} />;
        })}
      </InfinityScroll>
    </React.Fragment>
  );
};

export default PostList;
