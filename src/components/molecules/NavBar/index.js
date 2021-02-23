import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classes from "./styles.module.sass";

const NavBar = ({
    title
}) => {
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolBar}>
                <Typography variant="h6" >
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar