import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import Logout from "./Components/Logout";
import Error404 from "./Components/Error404";
import Dashboard from "./Components/Dashboard";
import ProductList from "./Components/ProductList";
import ProductForm from "./Components/ProductForm";
class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/login" component={LoginForm}/>
                <Route exact path="/logout" component={Logout}/>
                <Route exact path="/register" component={RegisterForm}/>
                <Route exact path="/" component={Home}/>
                <PrivateRoute exact path="/dashboard">
                    <Dashboard/>
                </PrivateRoute>
                <PrivateRoute exact path="/products">
                    <ProductList/>
                </PrivateRoute>
                <PrivateRoute exact path="/products/new">
                    <ProductForm/>
                </PrivateRoute>
                <PrivateRoute exact path="/products/edit/:id">
                    <ProductForm/>
                </PrivateRoute>
                <PrivateRoute exact path="/profile">
                    <Profile/>
                </PrivateRoute>

                <Route exact component={Error404}/>
            </Switch>
        );
    }
}

export default Routes;