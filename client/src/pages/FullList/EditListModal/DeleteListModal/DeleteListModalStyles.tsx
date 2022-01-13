import {makeStyles, Theme} from "@material-ui/core";

export const useDeleteListModalStyles = makeStyles((theme: Theme) => ({
    modalWrapper: {
        width: 280,
        height: "100%",
        textAlign: "center",
        margin: "32px 20px",
        "& svg": {
            color: theme.palette.primary.main,
            fontSize: 45,
        },
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
    modalDeleteButton: {
        width: 134,
        height: 40,
        borderRadius: '25px',
        "&.MuiButton-contained": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.error.main,
        },
        "&.MuiButton-contained:hover": {
            backgroundColor: "rgb(220, 30, 41)",
        },
    },
}));
