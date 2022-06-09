import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="white" className={classes.appBar}>
        <Toolbar>
          <Typography variant="body2" color="inherit" noWrap>
            Network50 is a Project for cs50w. Educational Purpose only.
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Footer;