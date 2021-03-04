import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {Helmet} from "react-helmet";
import {withAuthContext} from "../Contexts/AuthContext";
import styles from "../Styles/DashboardStyles";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import PersonIcon from '@material-ui/icons/Person';

class Dashboard extends Component {
    render() {
        const {classes}=this.props;
        const header = <Helmet>
            <title>Dashboard Page -  Product CRUD</title>
        </Helmet>;
        return (
            <Box className={classes.root}>
                {header}

                <Typography variant="h4">Dashboard</Typography>
                <Grid container spacing={4} className={classes.grid}>
                    <Grid item xs={12} sm={6} md={4}>
                       <Card>
                           <CardContent>
                               <PersonIcon className={classes.icon}/>
                               <Box className={classes.detail}>
                                   <Typography variant="h4">Products</Typography>
                                   <Typography variant="subtitle1">Products</Typography>
                               </Box>
                           </CardContent>
                       </Card>
                    </Grid>

                </Grid>

            </Box>
        );
    }
}

export default withAuthContext(withStyles(styles)(Dashboard));