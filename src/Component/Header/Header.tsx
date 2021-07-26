import React from "react";
import {AppBar, Container, Toolbar} from "@material-ui/core/";
import {makeStyles} from "@material-ui/core/styles";
import {SearchPanel} from "./FromContoroll/From";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center'
    },


}));
export const Header = () => {
    const classes = useStyles()

    return (
        <AppBar position="fixed">
            <Container fixed>
                <Toolbar className={classes.root}>
                    <SearchPanel/>
                </Toolbar>
            </Container>
        </AppBar>
    )
}


