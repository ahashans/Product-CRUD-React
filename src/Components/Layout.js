import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";
import styles from "../Styles/LayoutStyles";
import Routes from "../Routes";
import {ThemeContext} from "../Contexts/ThemeContext";
import {withAuthContext} from "../Contexts/AuthContext";
import DrawerWrapper from "./Common/DrawerWrapper";
import AppBarWrapper from "./Common/AppBarWrapper";

class Layout extends Component {
    static contextType = ThemeContext;

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false
        };
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
    }

    handleMenu(event) {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuClose() {
        this.setState({anchorEl: null});
    }

    handleDrawerOpen() {
        this.setState({open: true})
    };

    handleDrawerClose() {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBarWrapper anchorEl={this.state.anchorEl} open={this.state.open}
                               handleMenuClose={this.handleMenuClose} handleMenu={this.handleMenu}
                               handleDrawerOpen={this.handleDrawerOpen}
                               isAuthenticated={this.props.authContext.isAuthenticated}
                               isDarkMode={this.context.isDarkMode} toggleTheme={this.context.toggleTheme}/>
                <DrawerWrapper open={this.state.open} handleDrawerClose={this.handleDrawerClose}
                    isAuthenticated={this.props.authContext.isAuthenticated}/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Routes/>
                </main>
            </div>
        );
    }


}

export default withAuthContext(withStyles(styles, {withTheme: true})(Layout));