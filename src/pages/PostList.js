// PostList.js
import React from "react";
import {useSelector} from "react-redux";

import Post from "../components/Post";

const PostList = (props) => {

  const post_list = useSelector((state) => state.post.list);

  return (
    <React.Fragment>
      {post_list.map((p, idx)=>{
        return <Post key={p.id} {...p}></Post>
      })}
    </React.Fragment>
  );
};

export default PostList;
