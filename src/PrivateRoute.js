import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";
import {withAuthContext} from "./Contexts/AuthContext";


class PrivateRoute extends Component {
    render() {
        const session = this.props.authContext;
        return (
            <Route path={this.props.path} render={({location}) => session.isAuthenticated
                                                            ? (this.props.children)
                                                            : (<Redirect to={{
                                                                            pathname: "/login",
                                                                            state: {from: location}
                                                                        }}
                                                                    />)
                                                            }
            />
        );
    }
}

export default withAuthContext(PrivateRoute);
