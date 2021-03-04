import React, {Component} from 'react';
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {NavLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
// import LabelIcon from '@material-ui/icons/Label';
import GroupIcon from '@material-ui/icons/Group';
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import {withStyles} from "@material-ui/core/styles";
import styles from "../../Styles/DrawerStyles";

class DrawerWrapper extends Component {

    render() {
        const {classes, isAuthenticated} = this.props;
        return (
            <Drawer variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: this.props.open,
                        [classes.drawerClose]: !this.props.open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: this.props.open,
                            [classes.drawerClose]: !this.props.open,
                        }),
                    }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={this.props.handleDrawerClose}>
                        {this.props.theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button key={"Dashboard"} component={NavLink} to="/dashboard" activeClassName="Mui-selected" exact>
                        <ListItemIcon> <DashboardIcon/></ListItemIcon>
                        <ListItemText primary={"Dashboard"}/>
                    </ListItem>
                </List>
                <Divider/>
                {isAuthenticated &&
                <>
                    <List>
                        <ListItem button key={"Products"} component={NavLink} to="/products" activeClassName="Mui-selected"
                                  exact>
                            <ListItemIcon> <GroupIcon/></ListItemIcon>
                            <ListItemText primary={"Products"}/>
                        </ListItem>
                    </List>
                    <Divider/>
                    {/*<List>*/}
                    {/*    <ListItem button key={"MealChart"} component={NavLink} to="/meals" activeClassName="Mui-selected"*/}
                    {/*              exact>*/}
                    {/*        <ListItemIcon> <LabelIcon/></ListItemIcon>*/}
                    {/*        <ListItemText primary={"Meal Chart"}/>*/}
                    {/*    </ListItem>*/}
                    {/*</List>*/}
                    {/*<Divider/>*/}
                </>
                }

                {/*<List>*/}
                {/*    <ListItem button key={"MailBox"}>*/}
                {/*        <ListItemIcon><MailIcon/></ListItemIcon>*/}
                {/*        <ListItemText primary={"MailBox"}/>*/}
                {/*    </ListItem>*/}

                {/*</List>*/}
            </Drawer>
        );
    }
}

export default withStyles(styles, {withTheme: true})(DrawerWrapper);