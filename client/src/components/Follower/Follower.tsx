import React, {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import {Avatar, Button, Typography} from "@material-ui/core";
import classNames from "classnames";
import {compose} from "recompose";

import {User} from "../../store/ducks/user/contracts/state";
import {selectUserData} from "../../store/ducks/user/selectors";
import {useFollowerStyles} from "./FollowerStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import PopperUserWindow from "../PopperUserWindow/PopperUserWindow";
import {HoverUserProps, withHoverUser} from "../../hoc/withHoverUser";
import UnfollowModal from "../UnfollowModal/UnfollowModal";
import {LockIcon} from "../../icons";
import {processFollowRequest} from "../../store/ducks/userProfile/actionCreators";
import {addUserToBlocklist} from "../../store/ducks/user/actionCreators";
import BlockUserModal from "../BlockUserModal/BlockUserModal";
import ActionSnackbar from "../ActionSnackbar/ActionSnackbar";
import {SnackbarProps, withSnackbar} from "../../hoc/withSnackbar";

interface FollowerProps<T> {
    item?: T;
    follow?: (user: User) => void;
    unfollow?: (user: User) => void;
}

const Follower: FC<FollowerProps<User> & HoverUserProps & SnackbarProps> = (
    {
        item: user,
        follow,
        unfollow,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper,
        snackBarMessage,
        openSnackBar,
        setSnackBarMessage,
        setOpenSnackBar,
        onCloseSnackBar
    }
): ReactElement => {
    const classes = useFollowerStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);
    const [isUserBlocked, setIsUserBlocked] = useState<boolean>(false);
    const [isWaitingForApprove, setIsWaitingForApprove] = useState<boolean>(false);

    const isFollower = myProfile?.followers?.findIndex(follower => follower.id === user?.id) !== -1;
    const isMyProfileBlocked = user?.userBlockedList?.findIndex(blockedUser => blockedUser.id === myProfile?.id) !== -1;

    useEffect(() => {
        const userBlocked = myProfile?.userBlockedList?.findIndex(blockedUser => blockedUser.id === user?.id) !== -1;
        const waitingForApprove = user?.followerRequests?.findIndex(blockedUser => blockedUser.id === myProfile?.id) !== -1;
        setBtnText(waitingForApprove ? ("Pending") : (userBlocked ? "Blocked" : "Following"));
        setIsUserBlocked(userBlocked);
        setIsWaitingForApprove(waitingForApprove);
    }, [myProfile, user]);

    const handleClickOpenUnfollowModal = (): void => {
        setVisibleUnfollowModal(true);
    };

    const onCloseUnfollowModal = (): void => {
        setVisibleUnfollowModal(false);
    };

    const handleProcessFollowRequest = (user: User): void => {
        dispatch(processFollowRequest(user.id!));
    };

    const handleFollow = (user: User): void => {
        if (user?.privateProfile) {
            handleProcessFollowRequest(user);
        } else {
            follow!(user);
        }
    };

    const handleUnfollow = (user: User): void => {
        if (user?.privateProfile) {
            handleProcessFollowRequest(user);
        } else {
            unfollow!(user);
            setVisibleUnfollowModal(false);
        }
    };

    const onBlockUser = (): void => {
        dispatch(addUserToBlocklist(user?.id!));
        setVisibleBlockUserModal(false);
        setBtnText(isUserBlocked ? "Following" : "Blocked");
        setSnackBarMessage!(`@${user?.username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`);
        setOpenSnackBar!(true);
    };

    const onOpenBlockUserModal = (): void => {
        setVisibleBlockUserModal(true);
    };

    const onCloseBlockUserModal = (): void => {
        setVisibleBlockUserModal(false);
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Link to={`/user/${user?.id}`}>
                <Avatar
                    className={classes.listAvatar}
                    src={user?.avatar?.src ? user?.avatar.src : DEFAULT_PROFILE_IMG}
                />
            </Link>
            <div style={{flex: 1}}>
                <div className={classes.header}>
                    <div onMouseEnter={handleHoverPopper} onMouseLeave={handleLeavePopper}>
                        <Link to={`/user/${user?.id}`}>
                            <div className={classes.followerInfo}>
                                <div>
                                    <Typography variant={"h6"} component={"span"}>
                                        {user?.fullName}
                                    </Typography>
                                    {user?.privateProfile && (
                                        <span className={classes.lockIcon}>
                                            {LockIcon}
                                        </span>
                                    )}
                                </div>
                                <Typography variant={"subtitle1"} component={"div"}>
                                    @{user?.username}
                                </Typography>
                            </div>
                        </Link>
                        <PopperUserWindow visible={visiblePopperWindow} user={user!}/>
                    </div>
                    <div className={classes.buttonWrapper}>
                        {(myProfile?.id === user?.id) ? null : (
                            (isMyProfileBlocked) ? null : (
                                (!isFollower) ? (
                                    (isUserBlocked) ? (
                                        <Button
                                            className={classNames(classes.containedButton, classes.blockButton)}
                                            onClick={onOpenBlockUserModal}
                                            onMouseOver={() => setBtnText("Unblock")}
                                            onMouseLeave={() => setBtnText("Blocked")}
                                            color="primary"
                                            variant="contained"
                                            size="small"
                                        >
                                            {btnText}
                                        </Button>
                                    ) : (
                                        (isWaitingForApprove) ? (
                                            <Button
                                                className={classes.outlinedButton}
                                                onClick={() => handleProcessFollowRequest(user!)}
                                                onMouseOver={() => setBtnText("Cancel")}
                                                onMouseLeave={() => setBtnText("Pending")}
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                            >
                                                {btnText}
                                            </Button>
                                        ) : (
                                            <Button
                                                className={classes.outlinedButton}
                                                onClick={() => handleFollow(user!)}
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                            >
                                                Follow
                                            </Button>
                                        )
                                    )
                                ) : (
                                    <Button
                                        className={classes.containedButton}
                                        onClick={handleClickOpenUnfollowModal}
                                        onMouseOver={() => setBtnText("Unfollow")}
                                        onMouseLeave={() => setBtnText("Following")}
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                    >
                                        {btnText}
                                    </Button>
                                )
                            )
                        )}
                    </div>
                </div>
                {(isMyProfileBlocked) ? null : (
                    <Typography variant={"body1"} display="block">
                        {user?.about}
                    </Typography>
                )}
                <UnfollowModal
                    user={user!}
                    visible={visibleUnfollowModal}
                    onClose={onCloseUnfollowModal}
                    handleUnfollow={handleUnfollow}
                />
                <BlockUserModal
                    username={user?.username!}
                    isUserBlocked={isUserBlocked}
                    visible={visibleBlockUserModal}
                    onClose={onCloseBlockUserModal}
                    onBlockUser={onBlockUser}
                />
                <ActionSnackbar
                    snackBarMessage={snackBarMessage!}
                    openSnackBar={openSnackBar!}
                    onCloseSnackBar={onCloseSnackBar!}
                />
            </div>
        </Paper>
    );
};

export default compose(withSnackbar, withHoverUser)(Follower) as ComponentType<FollowerProps<User> & HoverUserProps & SnackbarProps>;
