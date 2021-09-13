import {makeStyles, Theme} from "@material-ui/core";

export const useEditListModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            marginBottom: 0,
        },
        "& .MuiIconButton-root": {
            marginRight: 15,
        },
    },
    content: {
        height: 577,
        width: 598,
        padding: "0px 0px",
        overflowX: "hidden",
    },
    button: {
        marginLeft: "auto",
        height: 30,
    },
    wallpaperWrapper: {
        width: 598,
        height: 200,
        backgroundColor: "#B2B2B2",
        position: "relative",
        zIndex: 1,
    },
    wallpaperImg: {
        objectFit:"cover",
        position: "absolute",
        zIndex: 1,
        width: 598,
        height: 200,
    },
    wallpaperEditImg: {
        zIndex: 5,
        position: "absolute",
        top: "42%",
        left: "46%",
    },
    footer: {
        padding: "12px 16px",
    },
    footerWrapper: {
        display: "flex",
        justifyContent: "space-between",
    },
    footerTitle: {
        fontSize: 15,
    },
    footerText: {
        fontSize: 13,
        color: "rgb(83, 100, 113)",
    },
    manageMembers: {
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid rgb(239, 243, 244)",
        padding: "12px 16px",
        fontSize: 15,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgb(245, 248, 250)",
        },
        "& svg": {
            fill: "rgb(83, 100, 113)",
            height: "1.20em",
        },
    },
    deleteList: {
        padding: "12px 16px",
        fontSize: 15,
        fontWeight: 500,
        color: "rgb(244, 33, 46)",
        border: 0,
        borderRadius: "0px 0px 16px 16px",
        textAlign: "center",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgba(244, 33, 46, 0.1)",
        },
    },
}));
