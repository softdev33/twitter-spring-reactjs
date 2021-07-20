import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Link, useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import {Avatar, Divider, IconButton} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import RepostIcon from "@material-ui/icons/RepeatOutlined";
import format from 'date-fns/format';
import usLang from 'date-fns/locale/en-US/index';
import mediumZoom from "medium-zoom";

import {selectIsTweetLoading, selectTweetData} from '../../store/ducks/tweet/selectors';
import {fetchTweetData, setTweetData} from '../../store/ducks/tweet/actionCreators';
import {fetchLikeTweet, fetchRetweet} from "../../store/ducks/tweets/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import UsersListModal from "../../components/UsersListModal/UsersListModal";
import {AddTweetForm} from "../../components/AddTweetForm/AddTweetForm";
import Tweet from "../../components/Tweet/Tweet";
import {useFullTweetStyles} from "./FullTweetStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {LikeIcon, LikeOutlinedIcon, ReplyIcon, RetweetIcon, RetweetOutlinedIcon, ShareIcon} from "../../icons";

export const FullTweet: FC = (): ReactElement | null => {
    const classes = useFullTweetStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const tweetData = useSelector(selectTweetData);
    const myProfile = useSelector(selectUserData);
    const isLoading = useSelector(selectIsTweetLoading);
    const params: { id: string } = useParams();
    const isTweetLiked = tweetData?.likes.find((user) => user.id === myProfile?.user.id);
    const isTweetRetweeted = tweetData?.retweets.find((user) => user.id === myProfile?.user?.id);
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");
    const image = tweetData?.images?.[0];

    useEffect(() => {
        if (params.id) {
            dispatch(fetchTweetData(params.id));
        }
        return () => {
            dispatch(setTweetData(undefined));
        };
    }, [dispatch, params.id]);

    useEffect(() => {
        if (!isLoading) {
            mediumZoom('.tweet-images img');
        }
    }, [isLoading]);

    const handleLike = (): void => {
        dispatch(fetchLikeTweet(params.id));
    };

    const handleRetweet = (): void => {
        dispatch(fetchRetweet(params.id));
    };

    const onOpenLikesModalWindow = (): void => {
        setVisibleModalWindow(true);
        setModalWindowTitle("Liked by");
    };

    const onOpenRetweetsModalWindow = (): void => {
        setVisibleModalWindow(true);
        setModalWindowTitle("Retweeted by");
    };

    const onCloseModalWindow = (): void => {
        setVisibleModalWindow(false);
        setModalWindowTitle("");
    };

    if (isLoading) {
        return (
            <div className={classes.loading}>
                <CircularProgress/>
            </div>
        );
    }

    if (tweetData) {
        return (
            <div style={{paddingTop: 48}}>
                {isTweetRetweeted ?
                    <div className={classes.retweetWrapper}>
                        <RepostIcon style={{fontSize: 16}}/>
                        <Typography>
                            You Retweeted
                        </Typography>
                    </div> : null}
                <Paper className={classes.container}>
                    <div className={classes.header}>
                        <Avatar
                            className={classes.avatar}
                            alt={`avatar ${tweetData.user.id}`}
                            src={tweetData.user.avatar?.src ? tweetData.user.avatar?.src : DEFAULT_PROFILE_IMG}
                        />
                        <Typography>
                            <Link to={`/user/${tweetData.user.id}`}>
                                <b>{tweetData.user.fullName}</b>&nbsp;
                            </Link>
                            <div>
                                <span className={classes.username}>@{tweetData.user.username}</span>&nbsp;
                            </div>
                        </Typography>
                    </div>
                    <Typography className={classes.textWrapper} gutterBottom>
                        <div dangerouslySetInnerHTML={{__html: tweetData.text}}></div>
                        {(tweetData.images?.length !== 0) &&
                            <Link to={{pathname: `/modal/${params.id}`, state: { background: location }}}>
                                <div className={classes.image}>
                                    <img src={image?.src} alt={image?.src}/>
                                </div>
                            </Link>
                        }
                    </Typography>
                    <Typography style={{marginBottom: 16}}>
                        <span className={classes.date}>
                            {format(new Date(tweetData.dateTime), 'H:mm', {locale: usLang})} ·
                        </span>
                        <span className={classes.date}>
                            {format(new Date(tweetData.dateTime), 'dd MMM. yyyy')}
                        </span>
                    </Typography>
                    <Divider/>
                    {(tweetData.retweets.length !== 0 || tweetData.likes.length !== 0) && (
                        <div className={classes.content}>
                            {(tweetData.retweets.length !== 0) && (
                                <a href={"javascript:void(0);"} onClick={onOpenRetweetsModalWindow}>
                                    <span style={{marginRight: 20}}>
                                        <b>{tweetData.retweets.length}</b>
                                        <span className={classes.contentItem}>
                                            Retweets
                                        </span>
                                    </span>
                                </a>)
                            }
                            {(tweetData.likes.length !== 0) && (
                                <a href={"javascript:void(0);"} onClick={onOpenLikesModalWindow}>
                                    <span style={{marginRight: 20}}>
                                        <b>{tweetData.likes.length}</b>
                                        <span className={classes.contentItem}>
                                            Likes
                                        </span>
                                    </span>
                                </a>)
                            }
                        </div>)
                    }
                    <div className={classes.info}>
                        <div className={classes.infoIcon}>
                            <IconButton>
                                <span>{ReplyIcon}</span>
                            </IconButton>
                        </div>
                        <div className={classes.infoIcon}>
                            <IconButton onClick={handleRetweet}>
                                {isTweetRetweeted ? (
                                    <span style={{color: "rgb(23, 191, 99)"}}>{RetweetIcon}</span>
                                ) : (
                                    <span>{RetweetOutlinedIcon}</span>
                                )}
                            </IconButton>
                        </div>
                        <div className={classes.infoIcon}>
                            <IconButton onClick={handleLike}>
                                {isTweetLiked ? (
                                    <span style={{color: "rgb(224, 36, 94)"}}>{LikeIcon}</span>
                                ) : (
                                    <span>{LikeOutlinedIcon}</span>
                                )}
                            </IconButton>
                        </div>
                        <div className={classes.infoIcon}>
                            <IconButton>
                                <span>{ShareIcon}</span>
                            </IconButton>
                        </div>
                    </div>
                    <Divider/>
                    <Typography className={classes.replyWrapper}>
                        Replying to <Link to={`/user/${tweetData.user.id}`}>
                        @{tweetData.user.username}
                    </Link>
                    </Typography>
                    <AddTweetForm
                        tweetId={tweetData?.id}
                        addressedUsername={tweetData.user.username}
                        maxRows={15}
                        title={"Tweet your reply"}
                        buttonName={"Reply"}/>
                    {(visibleModalWindow && modalWindowTitle === "Liked by") ? (
                        <UsersListModal
                            users={tweetData.likes}
                            title={modalWindowTitle}
                            visible={visibleModalWindow}
                            onClose={onCloseModalWindow}/>
                    ) : (
                        <UsersListModal
                            users={tweetData.retweets}
                            title={modalWindowTitle}
                            visible={visibleModalWindow}
                            onClose={onCloseModalWindow}/>
                    )}
                </Paper>
                <div className={classes.divider}/>
                {tweetData.replies.map((tweet) =>
                    <Tweet
                        key={tweet.id}
                        images={tweet.images}
                        addressedUser={tweetData.user.username}
                        addressedId={tweetData.user.id}
                        {...tweet} />)}
            </div>
        );
    }
    return null;
};
