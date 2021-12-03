// Post.js

import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import Permit from "../shared/Permit";

const Post = (props) => {
  const [like, setLike] = React.useState(false);
  const [color, setColor] = React.useState("unLike");

  const styles = { color: color };

  const likeClick = () => {
    if (like) {
      setLike(false);
      setColor("unLike");
      // 좋아요를 누르면 firebase, redux에 like_cnt + 1
    } else {
      setLike(true);
      setColor("like");
      // 좋아요 해제하면 firebase, redux에 like_cnt - 1
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
          <Permit>
            {/* 좋아요 유무 */}
            <Like {...styles} onClick={likeClick}>
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
