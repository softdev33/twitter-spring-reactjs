import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import {NotificationType} from "../../../../store/types/common";
import TweetComponent from "../../../../components/TweetComponent/TweetComponent";
import UsersItem, {UserItemSize} from "../../../../components/UsersItem/UsersItem";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {fetchNotificationInfo, resetNotificationState} from "../../../../store/ducks/notifications/actionCreators";
import {selectIsNotificationInfoLoading, selectNotificationInfo} from "../../../../store/ducks/notifications/selectors";
import Spinner from "../../../../components/Spinner/Spinner";
import PageHeaderWrapper from "../../../../components/PageHeaderWrapper/PageHeaderWrapper";

const NotificationInfo: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const params = useParams<{ id: string }>();
    const notification = useSelector(selectNotificationInfo);
    const isLoading = useSelector(selectIsNotificationInfoLoading);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchNotificationInfo(parseInt(params.id)));

        return () => {
            dispatch(resetNotificationState());
        };
    }, [params.id]);

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <PageHeaderWrapper backButton>
                {!isLoading && (
                    <div>
                        <Typography variant="h5" component={"div"}>
                            {notification?.notificationType === NotificationType.LIKE ? "Liked" : "Retweeted"}
                        </Typography>
                        <Typography variant="caption" component={"div"}>
                            by {notification?.user.fullName}
                        </Typography>
                    </div>
                )}
            </PageHeaderWrapper>
            {isLoading ? <Spinner paddingTop={150}/> : (
                <>
                    <div className={globalClasses.contentWrapper}>
                        <TweetComponent item={notification?.tweet}/>
                    </div>
                    <UsersItem item={notification?.user} size={UserItemSize.MEDIUM}/>
                </>
            )}
        </Paper>
    );
};

export default NotificationInfo;
