import {makeStyles, Theme} from "@material-ui/core";
import {LikeTweet} from "../../store/ducks/tweets/contracts/state";

interface TweetComponentStylesProps {
    isTweetLiked?: LikeTweet;
    isUserCanReply: boolean;
}

export const useTweetComponentStyles = makeStyles<Theme, TweetComponentStylesProps>((theme) => ({
    container: {
        position: "relative",
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'flex-start',
        marginTop: 12,
        paddingLeft: 20,
        flex: 1,
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    avatar: {
        width: "46px !important",
        height: "46px !important",
        marginRight: 15,
    },
    headerWrapper: {
        color: 'inherit',
        textDecoration: 'none',
        '& #hashtag': {
            color: theme.palette.primary.main,
        },
    },
    header: {
        position: "relative",
        display: 'flex',
        height: 20,
        justifyContent: 'space-between',
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em",
        },
    },
    headerText: {
        color: theme.palette.text.secondary,
    },
    headerIcon: {
        padding: 0,
        marginRight: 12,
        "& svg": {
            color: theme.palette.text.secondary,
            height: "0.8em",
        },
    },
    tweetContent: {
        width: 500,
    },
    replyLink: {
        textDecoration: "none",
        color: theme.palette.primary.main,
    },
    text: {
        "& a": {
            display: "block",
            width: 490,
            color: 'inherit',
            textDecoration: 'none',
        },
        '& #hashtag': {
            color: theme.palette.primary.main,
        },
        "& #link": {
            color: theme.palette.primary.main,
        }
    },
    image: {
        position: "relative",
        "& img": {
            objectFit: "cover",
            marginTop: 10,
            width: 504,
            height: 252,
            borderRadius: 20,
            borderColor: theme.palette.info.light,
        },
        "& .small": {
            width: 260,
        },
    },
    iconWrapper: {
        display: "inline-block",
        marginTop: 8,
        marginBottom: 4,
    },
    iconCircle: {
        marginRight: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
    },
    icon: {
        "& svg": {
            height: "0.75em",
            fill: theme.palette.common.white,
        },
    },
    footer: {
        display: 'flex',
        position: 'relative',
        paddingTop: 5,
        paddingBottom: 5,
        left: -8,
        justifyContent: 'space-between',
        maxWidth: 450,
    },
    replyIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg" : {
                color: props => props.isUserCanReply ? "rgb(185, 192, 197)" : theme.palette.text.secondary,
                verticalAlign: "bottom",
                height: "0.80em",
            },
        },
        "& span": {
            color: props => props.isUserCanReply ? "rgb(224, 36, 94)" : theme.palette.text.secondary,
        },
    },
    likeIcon: {
        "& .MuiIconButton-root": {
            padding: 7,
            "& svg" : {
                color: props => props.isTweetLiked ? "rgb(224, 36, 94)" : theme.palette.text.secondary,
                verticalAlign: "bottom",
                height: "0.80em",
            },
            "&:hover": {
                backgroundColor: "rgba(249, 24, 128, 0.1) !important",
                "& svg": {
                    color: "rgb(224, 36, 94) !important",
                },
            },
        },
        "& span": {
            color: props => props.isTweetLiked ? "rgb(224, 36, 94)" : theme.palette.text.secondary,
        },
    },
    retweetWrapper: {
        display: "flex",
        alignItems: "center",
        marginLeft: 48,
        marginTop: 12,
        marginBottom: -8,
        color: theme.palette.text.secondary,
        "& svg": {
            verticalAlign: "bottom",
            height: "1.20em",
        },
        "& .MuiTypography-subtitle2": {
            marginLeft: 15,
            fontWeight: 700,
        },
    },
    popperUserWindow: {
        position: "absolute",
        width: 100,
        height: 100,
        border: "1px solid black",
        backgroundColor: theme.palette.common.white,
    },
}));
