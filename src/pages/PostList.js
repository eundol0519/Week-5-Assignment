// PostList.js

import React from 'react'
import Post from '../components/Post';
import Header from '../components/Header';

const PostList = (props)=>{
    return(
        <React.Fragment>
            <Header></Header>
            <Post></Post>
        </React.Fragment>
    );
}

export default PostList;