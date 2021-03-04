import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {Helmet} from "react-helmet";
import {withAuthContext} from "../Contexts/AuthContext";
import styles from "../Styles/HomeStyles";


class Home extends Component {
    render() {
        const {classes}=this.props;
        const header = <Helmet>
            <title>Home Page -  Product CRUD</title>
        </Helmet>;
        return (
            <Box className={classes.root}>
                {header}

                <Typography variant="h4">Home</Typography>

            </Box>
        );
    }
}

export default withAuthContext(withStyles(styles)(Home));