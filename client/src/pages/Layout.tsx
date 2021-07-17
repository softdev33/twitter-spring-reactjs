import React, {FC, ReactElement} from 'react';
import {Container, Grid, InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined';

import {SideSearchTextField} from '../components/SearchTextField/SideSearchTextField';
import SideMenu from "../components/SideMenu/SideMenu";
import Tags from "../components/Tags/Tags";
import Users from '../components/Users/Users';
import {useLayoutStyles} from "./LayoutStyles";

interface Layout {
    children: React.ReactNode;
}

export const Layout: FC<Layout> = ({children}): ReactElement => {
    const classes = useLayoutStyles();

    return (
        <Container className={classes.wrapper} maxWidth="lg">
            <Grid container spacing={3}>
                <Grid sm={1} md={2} item style={{minWidth: "256px"}}>
                    <SideMenu/>
                </Grid>
                <Grid sm={8} md={6} item>
                    {children}
                </Grid>
                <Grid sm={3} md={3} item style={{minWidth: "350px"}}>
                    <div className={classes.rightSide}>
                        <SideSearchTextField
                            variant="outlined"
                            placeholder="Search Twitter"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                        <Tags/>
                        <Users/>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};
