import React, {FC, ReactElement} from 'react';
import {List, ListItem, Paper, Typography} from "@material-ui/core";

import {useNotificationsStyles} from "./NotificationsStyles";
import {ArrowRightIcon, FiltersIcon, PreferencesIcon,} from "../../../icons";

const Notifications: FC = (): ReactElement => {
    const classes = useNotificationsStyles();

    return (
        <div className={classes.container}>
            <Paper variant="outlined">
                <div className={classes.infoWrapper}>
                    <div className={classes.infoItemWrapper}>
                        <Typography component={"div"} className={classes.text}>
                            Select the kinds of notifications you get about your activities, interests, and
                            recommendations.
                        </Typography>
                    </div>
                    <div className={classes.listWrapper}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <div className={classes.icon}>
                                    {FiltersIcon}
                                </div>
                                <div>
                                    <Typography component={"div"} className={classes.subtitle}>
                                        Filters
                                    </Typography>
                                    <Typography component={"div"} className={classes.text}>
                                        Choose the notifications you’d like to see — and those you don’t.
                                    </Typography>
                                </div>
                                <div className={classes.arrowIcon}>
                                    {ArrowRightIcon}
                                </div>
                            </ListItem>
                            <ListItem>
                                <div className={classes.icon}>
                                    {PreferencesIcon}
                                </div>
                                <div>
                                    <Typography component={"div"} className={classes.subtitle}>
                                        Preferences
                                    </Typography>
                                    <Typography component={"div"} className={classes.text}>
                                        Select your preferences by notification type.
                                    </Typography>
                                </div>
                                <div className={classes.arrowIcon}>
                                    {ArrowRightIcon}
                                </div>
                            </ListItem>
                        </List>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Notifications;
