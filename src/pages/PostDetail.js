import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

import { Button, Text, Grid } from "../elements";
import { useSelector } from "react-redux";
import { firestore } from "../shared/firebase";

const PostDetail = (props) => {
  const id = props.match.params.id; // 파라미터로 넘어온 params의 id를 불러온다.
  const post_list = useSelector((state) => state.post.list); // 게시물 목록
  const user_info = useSelector((state) => state.user.user); // 사용자 정보
  const is_login = useSelector((state) => state.user.is_login); // 로그인 정보

  // 상세 페이지의 게시물 정보를 불러온다.
  const post_idx = post_list.findIndex((p) => p.id === id);
  const post_data = post_list[post_idx];
  // === const post = post_list.find(p => p.id === id)

  const [post, setPost] = React.useState(post_data ? post_data : null);
  const { history } = props;

  React.useEffect(() => {
    if (post) {
      // 포스트 정보가 있을 경우 안불러 온다.
      return;
    }

    // 단일 데이터 가져오기
    const postDB = firestore.collection("post");
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        // 형식 맞추기
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );

        setPost(post);
      });
  });

  // 로그인 안했을 경우 상세 페이지 볼 수 없게
  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/login");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info.uid} />
      )}
      <CommentWrite />
      <CommentList />
    </React.Fragment>
  );
};

export default PostDetail;
