import {makeStyles} from "@material-ui/core";

export const useUnfollowModalStyles = makeStyles((theme) => ({
    modalWrapper: {
        width: 280,
        height: 176,
        textAlign: "center",
        margin: "32px 20px",
        "& .MuiTypography-subtitle1": {
            marginTop: 8,
            marginBottom: 24,
        },
    },
    modalButtonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalCancelButton: {
        width: 134,
        height: 40,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.divider,
        borderRadius: '25px',
    },
    modalUnfollowButton: {
        width: 134,
        height: 40,
        borderRadius: '25px',
    },
}));
