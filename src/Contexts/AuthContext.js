import React, {createContext, Component} from 'react';
import {getSessionCookie} from "../Config/SessionCookie";

export const AuthContext = createContext();
export class AuthProvider extends Component {
    constructor(props) {
        super(props);
        let isAuthenticated = false;
        let data={};
        const session = getSessionCookie();
        if(Object.keys(session).length!==0){
            isAuthenticated=true;
            data=session;
        }
        this.state={
            isAuthenticated:isAuthenticated,
            data:data
        };
        this.updateAuth=this.updateAuth.bind(this);
    }
    updateAuth(){
        let isAuthenticated = false;
        let data={};
        const session = getSessionCookie();
        if(Object.keys(session).length!==0){
            isAuthenticated=true;
            data=session;
        }
        this.setState({
            isAuthenticated:isAuthenticated,
            data:{...data}
        });
    }
    // componentDidMount() {
    //     this.updateAuth();
    // }

    render() {
        return (
            <AuthContext.Provider value={{...this.state, updateAuth:this.updateAuth}}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
export const withAuthContext = Component => props =>(
    <AuthContext.Consumer>
        {value=><Component authContext={value} {...props}/>}
    </AuthContext.Consumer>
);
