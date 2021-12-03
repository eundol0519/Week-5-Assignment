import React from "react";
import { Grid, Text } from "../elements";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { realTime } from "../shared/firebase";

const Notification = (props) => {
  const [noti, setNoti] = React.useState([]);

  const user = useSelector((state) => state.user.user);

  React.useEffect(() => {
    if (!user) {
      // 사용자가 없을 경우
      return;
    }

    const notiDB = realTime.ref(`noti/${user.uid}/list`); // 구독

    // firebase realtime database는 내림차순 정렬을 지원하지 않습니다.
    // 데이터를 가져온 후 직접 역순으로 내보내야 합니다.
    const _noti = notiDB.orderByChild("insert_dt");

    _noti.once("value", (snapshot) => {
      if (snapshot.exists()) {
        // snapshot이 있는 지 판별
        let _data = snapshot.val();

        // reverse()는 배열을 역순으로 뒤집는다.
        let _noti_list = Object.keys(_data)
          .reverse()
          .map((s) => {
            return _data[s];
          });

          setNoti(_noti_list)
      }
    });
  }, [user]);

  return (
    <React.Fragment>
      <Grid padding="16px" bg="#EFF6FF">
        {noti.map((n, index) => {
          return <Card {...n} key={`noti_${index}`} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Notification;
