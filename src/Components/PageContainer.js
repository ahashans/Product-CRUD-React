import React, {Component} from 'react';
import {ThemeContext} from "../Contexts/ThemeContext";
import {createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline";


class PageContainer extends Component {
    static contextType = ThemeContext;
    render() {
        // const color=this.context.isDarkMode?"white":"black";
        // const backgroundColor=this.context.isDarkMode?"#212121":"#FFF";
        const lightTheme = createMuiTheme({
            palette: {
                type:"light",
                primary: {
                    light:"#4791db",
                    main:"#2196f3",
                    dark:"#115293"
                },
                secondary: {
                    light:"#a7ffeb",
                    main:"#1de9b6",
                    dark:"#00bfa5"
                },
            },

        });
        const darkTheme = createMuiTheme({
            palette: {
                type:"dark",
                primary: {
                    light:"#333",
                    main:"#121212",
                    dark:"#212121"
                },
                secondary: {
                    light:"#b0bec5",
                    main:"#546e7a",
                    dark:"#263238"
                },
            },
        });
        return (
            <MuiThemeProvider theme={this.context.isDarkMode?darkTheme:lightTheme}>
                <CssBaseline />
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}

export default PageContainer;