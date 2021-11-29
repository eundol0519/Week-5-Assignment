// Post.js

import React from "react";
import { Grid, Image, Text } from "../elements";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src}></Image>
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
          </Grid>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
            <Image shape="rectangle" src={props.src}></Image>
        </Grid>
        <Grid padding="16px">
            <Text bold>댓글 {props.comment_cnt}개</Text>
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

export default Post;
