// InfinityScroll.js

import React from "react";
import _ from "lodash";
import { Spinner } from "../elements";

const InfinityScroll = (props) => {
  const { children, callNext, loading, is_next } = props;

  // throttle 적용
  const _handleScroll = _.throttle(() => {
    // throttle : 일정 시간 동안의 동작을 모아서 1번에 실행하는 함수

    const { innerHeight } = window; // 브라우저 창 높이
    const { scrollHeight } = document.body; // 스크롤 할 수 있는 높이
    // 스크롤이 얼마나 움직였는 지 알려주는 값
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 200) {
      if (loading) {
        // 로딩 중이면 다음 리스트를 불러오지 않는다.
        return;
      }

      callNext(); // 받아온 다음 리스트로 넘긴다.
    }
  }, 300);

  const handleScroll = React.useCallback(_handleScroll, [loading]);
  // 컴포넌트가 리렌더링 되면 함수는 초기화가 되는 데 그렇게 되면 throttle이 엉망이 됩니다.
  // useCallback을 사용해서 _handleScroll 함수가 loading이 바뀌지 않는 한 리렌더링 되지 않도록
  // 메모리제이션을 해줍니다. (다른 곳에 저장 해둔다.)

  React.useEffect(() => {
    // 로딩 중이면, return!
    if (loading) {
      return;
    }

    // 다음 게 있으면 무한 스크롤 이벤트를 붙이고, 없으면 이벤트를 삭제한다.
    if (is_next) {
      // 다음 게시물이 있으면 scroll 이벤트를 구독한다.
      window.addEventListener("scroll", handleScroll);
    } else {
      // 다음 게시물이 없으면 scroll 이벤트를 해제한다.
      window.removeEventListener("scroll", handleScroll);
    }

    // 이 부분은 컴포넌트가 사라질 때 호출되는 부분 (클린업)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [is_next, loading]);

  return( 
    <React.Fragment>
      {props.children}
      {is_next && (<Spinner></Spinner>)}
      {/* 다음 게시물이 있으면 spinner를 보여줘서 로딩 중임을 나타낸다. */}
    </React.Fragment>
  )
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {}, // 다음 게시물 불러오는 함수
  is_next: null, // 다음 게시물이 있는 지에 대한 유무
  loading: false, // 로딩 유무
};

export default InfinityScroll;
