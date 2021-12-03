// NotiBadge.js

import React from "react";
import { Notifications } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

import { realTime } from "../shared/firebase";
import { useSelector } from "react-redux";

const NotiBadge = (props) => {

    const [is_read, setIsRead] = React.useState(true);
    const user_id = useSelector((state) => state.user.user.uid);

    const notiCheck = () => {
        const notiDB = realTime.ref(`noti/${user_id}`); // 구독 
        notiDB.update({read : true});
        props._onClick();
    }

    React.useEffect(()=>{
        const notiDB = realTime.ref(`noti/${user_id}`);
        notiDB.on('value', (snapshot) => {
            console.log(snapshot.val());

            setIsRead(snapshot.val()?.read);
        })

        return () => {
            notiDB.off(); // 구독 해제
        }
    }, [])

    return (
    <React.Fragment>
      <Badge
        invisible={is_read}
        color="secondary"
        onClick={notiCheck}
        variant="dot"
      >
        <Notifications />
      </Badge>
    </React.Fragment>
  );
};

NotiBadge.defaultProps = {

};

export default NotiBadge;
