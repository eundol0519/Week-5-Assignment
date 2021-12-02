import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  const { history } = props;  
  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  const [contents, setContents] = React.useState(_post ? _post.contents : "");
  const [active, setActive] = React.useState(true);

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  // 글추가 하기
  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
  };

  // 글수정 하기
  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, {contents: contents}));
  }

  // 이미지와 글을 입력 유무에 따라 버튼 비활성화/활성화
  const checkValid = () => {
    
    contents && setActive(false);
  }

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗! 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload/>
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>
            미리보기
          </Text>
        </Grid>

        <Image
          shape="rectangle"
          src={preview ? preview : "http://via.placeholder.com/400x300"}
        />
      </Grid>

      <Grid padding="16px">
        <Input
          value={contents}
          _onChange={(e)=>{setContents(e.target.value)}}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
          _onKeyUp={checkValid}
        />
      </Grid>

      <Grid padding="16px">
        {is_edit ? (
          <Button className = {active ? 'unActiveBtn' : 'activeBtn'} text="게시글 수정" _onClick={()=>{editPost();}} disabled={active}></Button>
        ) : (
          <Button className = {active ? 'unActiveBtn' : 'activeBtn'} text="게시글 작성" _onClick={()=>{addPost();}} disabled={active}></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;