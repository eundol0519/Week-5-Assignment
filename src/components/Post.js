// Post.js

import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import Permit from "../shared/Permit";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";

const Post = (props) => {
  const user_id = useSelector((state) => state.user.user?.uid);
  const post = useSelector((state) => state.post.list);

  const [like, setLike] = React.useState(false);
  const [color, setColor] = React.useState("unLike");
  const styles = { color: color };

  const dispatch = useDispatch();

  // 좋아요 유무에 따라서 새로고침이 되어도 그대로 반영 되게 하는 코드
  React.useEffect(()=>{
    console.log(post)
    const _post = post.filter((p) => {
      // 게시물 정보에서 좋아요를 누른 사람의 목록을 가져온다.
      return p.id === props.id;
    })[0].like_list;
  
    if (_post) {
      _post.forEach((p) => {
        if (p === user_id) {
          setLike(true);
          setColor('like');
        }
      });
    }
  })

  const likeClick = (props) => {
    const post_id = props.id; // 게시물 정보
    const like_cnt = props.like_cnt; // 좋아요 갯수
    const post_user_id = props.user_info.user_id; // 게시물 작성자
    const like_list = props.like_list; // 좋아요 누른 사람들 아이디

    // 게시물 작성자인 지 체크
    if (post_user_id === user_id) {
      window.alert("작성자의 게시물에는 좋아요를 누르실 수 없습니다.");
      return;
    }
    // else if(like_list.includes(user_id)){ // 이게 진짜 필요할까??
    //   window.alert("이미 좋아요를 눌렀습니다.")
    //   return;
    // }

    if (like) {
      // 안좋아요
      setLike(false);
      setColor("unLike");
      // 좋아요 해제하면 firebase, redux에 like_cnt - 1
      dispatch(likeActions.minusLikeFB(post_id, like_cnt, like_list));
    } else {
      // 좋아요
      setLike(true);
      setColor("like");
      // 좋아요를 누르면 firebase, redux에 like_cnt + 1
      dispatch(likeActions.addLikeFB(post_id, like_cnt, like_list));
    }
  };

  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.user_profile}></Image>
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <Button
                width="auto"
                padding="4px"
                margin="4px"
                _onClick={() => {
                  history.push(`/postWrite/${props.id}`);
                }}
              >
                수정
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid
          _onClick={() => {
            history.push(`postDetail/${props.id}`);
          }}
        >
          <Grid padding="16px">
            <Text>{props.contents}</Text>
          </Grid>
          <Grid>
            <Image shape="rectangle" src={props.image_url}></Image>
          </Grid>
        </Grid>
        <Grid padding="16px" is_flex>
          <Text bold>댓글 {props.comment_cnt}개</Text>
          <Text bold>좋아요 {props.like_cnt}개</Text>
          <Permit>
            {/* 좋아요 유무 */}
            <Like
              {...styles}
              onClick={() => {
                likeClick(props);
              }}
            >
              ♥
            </Like>
          </Permit>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "오새봄",
    user_profile: "https://i.ytimg.com/vi/Ct1Pp_4FEIY/maxresdefault.jpg",
  },
  image_url: "https://i.ytimg.com/vi/Ct1Pp_4FEIY/maxresdefault.jpg",
  contents: "오새봄이다. 찬양해라",
  comment_cnt: 10,
  insert_dt: "2021-11-29 19:09:00",
};

const Like = styled.div`
  // ***
  font-size: 30px;
  color: ${(props) => (props.color === "like" ? "pink" : "gray")};
`;

export default Post;
