import React from "react";
import {Typography,} from "@material-ui/core/";
import {makeStyles} from "@material-ui/core";



const useStyles = makeStyles(theme => ({
        footerContainer: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            marginTop: 'auto',
        }
    })
)
const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.footerContainer}>
            <Typography
                align="center"
                color="textSecondary"
                component="p"
                variant="subtitle1">
            Made By Saurocket))
            </Typography>
        </div>
    )
}
export default Footer;