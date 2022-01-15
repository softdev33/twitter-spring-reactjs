import {makeStyles, Theme} from "@material-ui/core";

export const useAppsAndSessionsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    listWrapper: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiList-root": {
            padding: 0,
        },
        "& .MuiListItem-root": {
            padding: "14px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main,
            },
        },
        "& .Mui-selected": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
            "& svg": {
                marginRight: "-2px"
            },
        },
        "& svg": {
            color: theme.palette.text.secondary,
            height: "1.4em",
            marginLeft: "auto",
        },
    },
}));
