import React, {Component} from 'react';
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import BrightModeIcon from "@material-ui/icons/Brightness7";
import DarkModeIcon from "@material-ui/icons/Brightness4";
import AppBar from "@material-ui/core/AppBar";
import styles from "../../Styles/AppBarStyles";
import {withStyles} from "@material-ui/core/styles";
import {AccountCircle} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

class AppBarWrapper extends Component {
    render() {
        const {classes} = this.props;
        const guestMenu = <div>
            <MenuItem onClick={this.props.handleMenuClose} component={Link} to="/login">Login</MenuItem>
            <MenuItem onClick={this.props.handleMenuClose} component={Link} to="/register">Register</MenuItem>
        </div>;
        const userMenu = <div>
            <MenuItem onClick={this.props.handleMenuClose} component={Link} to="/profile">Profile</MenuItem>
            <MenuItem onClick={this.props.handleMenuClose} component={Link} to="/logout">Logout</MenuItem>
        </div>;
        return (
            <AppBar position="fixed" className={clsx(classes.appBar, {
                [classes.appBarShift]: this.props.open,
            })} color="primary">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.props.handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: this.props.open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h5" className={classes.navLink} component={Link} to="/">
                        Product CRUD
                    </Typography>
                    <Tooltip title="Toggle Theme">
                        <IconButton
                            color="inherit" aria-label="Toggle Theme"
                            onClick={this.props.toggleTheme} edge="start"
                            className={classes.rightItem}
                        >
                            {this.props.isDarkMode ? <BrightModeIcon/> : <DarkModeIcon/>}
                        </IconButton>
                    </Tooltip>
                    <div>
                        <IconButton
                            aria-label="account of current user" aria-controls="menu-appbar"
                            aria-haspopup="true" onClick={this.props.handleMenu} color="inherit"
                        >
                            {this.props.isAuthenticated
                                ? <Avatar><PersonIcon className={classes.profileButton}/></Avatar>
                                : <AccountCircle className={classes.profileButton}/>
                            }
                        </IconButton>
                        <Menu
                            id="profileMenu" anchorEl={this.props.anchorEl}
                            anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                            keepMounted
                            transformOrigin={{vertical: 'top', horizontal: 'right',}}
                            open={Boolean(this.props.anchorEl)} onClose={this.props.handleMenuClose}
                        >
                            {this.props.isAuthenticated
                                ? userMenu
                                : guestMenu}
                        </Menu>
                    </div>

                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles, {withTheme: true})(AppBarWrapper);