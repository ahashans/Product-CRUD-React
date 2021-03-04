import React, {Component} from 'react';
import Box from "@material-ui/core/Box";
import {withAuthContext} from "../Contexts/AuthContext";
import {deleteSessionCookie, getSessionCookie} from "../Config/SessionCookie";
import {Helmet} from "react-helmet";
import Alert from "@material-ui/lab/Alert";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:"Logged out. You are being redirected to dashboard...",
            error:false
        };
    }
    handleLogout(){
        if(Object.keys(getSessionCookie()).length!==0){
            deleteSessionCookie();
            this.props.authContext.updateAuth();
            setTimeout(()=>{
                this.props.history.push("/");
            },2000);
        }
        else{
            this.setState({message:"You are not logged in! Please log in first.", error:true});
            setTimeout(()=>{
                this.props.history.push("/login");
            },2000)
        }
    }
    componentDidMount() {
        this.handleLogout();
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.handleLogout();
    // }

    render() {
        const header = <Helmet>
            <title>Logout Page -  Product CRUD</title>
        </Helmet>;
        return (
            <Box>
                {header}
                <Alert elevation={6} variant="filled" severity={this.state.error?"error":"info"}>
                    {this.state.message}
                </Alert>

            </Box>
        );
    }
}

export default withAuthContext(Logout);