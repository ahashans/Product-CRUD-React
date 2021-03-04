import React, {Component, createContext} from 'react';
import {getThemeCookie, setThemeCookie} from "../Config/ThemeCookie";

export const ThemeContext = createContext();

export class ThemeProvider extends Component {
    constructor(props) {
        super(props);
        let isDarkMode = false;
        const themeCookie = getThemeCookie();
        if (Object.keys(themeCookie).length !== 0) {
            isDarkMode = themeCookie.isDarkMode;
        }
        this.state = {
            isDarkMode: isDarkMode
        };
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    async toggleTheme() {
        await this.setState(currState => {
            return {isDarkMode: !this.state.isDarkMode}
        });
        setThemeCookie({...this.state});
    }


    render() {
        return (
            <ThemeContext.Provider value={{...this.state, toggleTheme: this.toggleTheme}}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}

