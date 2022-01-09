import {makeStyles, Theme} from "@material-ui/core";

export const useFollowerRequestsModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            marginBottom: 0,
            borderBottom: "none",
        },
    },
    content: {
        height: 550,
        width: 598,
        padding: "0px 0px",
        overflowX: "hidden",
    },
    contentWrapper: {
        paddingTop: 48
    },
    infoWrapper: {
        marginTop: 32,
        margin: "0 auto",
        width: 400,
        textAlign: "center",
    },
}));
