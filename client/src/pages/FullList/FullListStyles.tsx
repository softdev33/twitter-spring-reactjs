import {makeStyles, Theme} from "@material-ui/core";

export const useFullListStyles = makeStyles((theme: Theme) => ({
    container: {
        borderRadius: 0,
        minHeight: '100vh',
        paddingBottom: 500,
        borderTop: 0,
        borderBottom: 0,
    },
    header: {
        position: "fixed",
        width: 602,
        height: 53,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.5em",
        },
    },
    iconGroup: {
        marginLeft: "auto",
        marginRight: 10,
    },
    content: {
        paddingTop: 53
    },
    wallpaper: {
        height: 200,
        "& img": {
            objectFit: "cover",
            position: "absolute",
            width: 601,
            height: 200,
        },
    },
    listInfo: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        padding: 12,
        textAlign: "center",
        "& .MuiTypography-h5": {
            marginBottom: 12,
        },
        "& .MuiTypography-body1": {
            marginBottom: 12,
        },
    },
    listOwnerLink: {
        color: "black",
        textDecoration: "none",
        "& .MuiTypography-h6": {
            verticalAlign: "top",
            marginRight: 4,
            "&:hover": {
                textDecoration: "underline",
            },
        },
        "& .MuiTypography-subtitle1": {
            verticalAlign: "top",
        },
    },

    listOwnerWrapper: {
        display: "inline-block",
    },
    listOwnerAvatar: {
        marginRight: 4,
        width: "20px !important",
        height: "20px !important",
    },
    listMembers: {
        marginLeft: 20,
        "&:hover": {
           cursor: "pointer",
            textDecoration: "underline",
        },
    },
    buttonWrapper: {
        marginTop: 20,
        marginBottom: 12,
    },
    listOutlinedButton: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    outlinedButton: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    primaryButton: {
        width: 105,
        '&:hover': {
            backgroundColor: theme.palette.error.dark,
        },
    },
    listInfoWrapper: {
        width: 350,
        margin: "0 auto",
        marginTop: 32,
        textAlign: "center",
    },
}));
