import React, {FC, ReactElement} from 'react';
import {Checkbox, Typography} from "@material-ui/core";

import {useDirectMessagesStyles} from "./DirectMessagesStyles";

const DirectMessages: FC = (): ReactElement => {
    const classes = useDirectMessagesStyles();

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Manage who can message you directly.
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Allow message requests from everyone</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Let people who you don’t follow send you message requests and add you to group conversations. To
                    reply to their messages, you need to accept the request. <a
                    href={"https://help.twitter.com/using-twitter/direct-messages#receive"}
                    target="_blank"
                    className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Filter low-quality messages</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Hide message requests that have been detected as being potentially spam or low-quality. These will
                    be sent to a separate inbox at the bottom of your message requests. You can still access them if you
                    want. <a
                    href={"https://help.twitter.com/using-twitter/direct-messages"}
                    target="_blank"
                    className={classes.link}> Learn more</a>
                </Typography>
            </div>
            <div className={classes.infoItemWrapper}>
                <div className={classes.infoItem}>
                    <span>Show read receipts</span>
                    <Checkbox/>
                </div>
                <Typography component={"div"} className={classes.text}>
                    Let people you’re messaging with know when you’ve seen their messages. Read receipts are not shown
                    on message requests. <a
                    href={"https://help.twitter.com/using-twitter/direct-messages#receipts"}
                    target="_blank"
                    className={classes.link}> Learn more</a>
                </Typography>
            </div>
        </>
    );
};

export default DirectMessages;
