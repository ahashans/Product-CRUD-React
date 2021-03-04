import React, {Component} from 'react';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import styles from "../Styles/LoginFormStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {axiosInstance} from "../Config/axiosInstance";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {withAuthContext} from "../Contexts/AuthContext";
import {Helmet} from "react-helmet";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {FormHelperText} from "@material-ui/core";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailInvalid:false,
            password: "",
            passwordInvalid:false,
            name: "",
            nameInvalid:false,
            open: false,
            alertType: "",
            alertMessage: "",
            loading:false

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAlertClose=this.handleAlertClose.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    handleAlertClose(e, reason) {
        if (reason === 'clickaway') {
            return;
        }
        if (this.state.alertType === "success") {
            this.props.history.push("/");
        }
        else{
            this.setState({open: false});
        }
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value, [e.target.name+"Invalid"]:e.target.value.trim()===""});
    }
    isValid(){
        let invalidFields=[];
        if(this.state.email.trim()===""){
            invalidFields.push("emailInvalid");
        }
        else if(this.state.email.trim()!==""){
            try{
                if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)){
                    invalidFields.push("emailInvalid");
                }
            }
            catch (e) {
                invalidFields.push("emailInvalid");
            }
        }
        if(this.state.name.trim()===""){
            invalidFields.push("nameInvalid");
        }
        if(this.state.password.trim()==="" || this.state.password.length<6){
            invalidFields.push("passwordInvalid");
        }
        if(invalidFields.length){
            console.log(invalidFields)
            const validationResult = {}
            invalidFields.forEach(field=>{
                validationResult[field]=true;
            });
            this.setState({...this.state, ...validationResult});

            return false;
        }
        else{
            return true;
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        if(this.isValid()){
            this.setState({loading:true});
            const data = new FormData();
            data.append("name", this.state.name);
            data.append("email", this.state.email);
            data.append("password", this.state.password);
            axiosInstance.post("auth/register", data)
                .then((response) => {
                    // setSessionCookie({ ...response.data });
                    // this.props.authContext.updateAuth();
                    this.setState({
                        open: true,
                        alertType: "success",
                        alertMessage: "Successfully Registered! You are now redirected to Login page!",
                        loading:false
                    });
                    setTimeout(()=>{
                        this.props.history.push("/login")
                    },1500)
                })
                .catch((error) => {
                    let msg = "";
                    if(error.hasOwnProperty('response')){
                        const {data} = error.response;
                        if (data.hasOwnProperty('msg')) {
                            if (data.msg === "Duplicate Email") {
                                msg = "Email already used! Please try another one.";
                            } else if (data.msg === "Email is invalid") {
                                msg = "Not a valid Email!";
                            }
                        }
                    } else {
                        msg = "Server Error";
                    }

                    this.setState({open: true, alertType: "error", alertMessage: msg, loading:false});

                });
        }
        else{
            this.setState({open: true, alertType: "error", alertMessage: "Invalid Input", loading:false});
        }
    }

    render() {
        console.log(this.state)
        const {classes} = this.props;
        const header = <Helmet>
            <title>Registration Page -  Product CRUD</title>
        </Helmet>;
        if (this.props.authContext.isAuthenticated && !this.state.open) {
            setTimeout(() => {
                this.props.history.push("/");
            }, 2500);
            return (<main className={classes.main}>
                {header}
                <Alert elevation={6} variant="filled" severity="error">You are already logged in!</Alert>
            </main>)
        }
        return (
            <main className={classes.main}>
                {header}
                <Backdrop className={classes.backdrop} open={this.state.loading}>
                    <CircularProgress color="inherit" />
                    <Typography variant="h6">Please wait...</Typography>
                </Backdrop>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOpenIcon/>
                    </Avatar>
                    <Typography variant="h5">
                        Sign Up
                    </Typography>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Full Name</InputLabel>
                            <Input error={this.state.nameInvalid} id="name" name="name" onChange={this.handleChange}
                                   value={this.state.name} autoFocus />
                            {this.state.nameInvalid?<FormHelperText error={true}>Please enter a valid name</FormHelperText>:""}
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input error={this.state.emailInvalid}
                                   id="email"
                                   name="email"
                                   onChange={this.handleChange}
                                   value={this.state.email}/>
                            {this.state.emailInvalid?<FormHelperText error={true}>Please enter a valid email</FormHelperText>:""}
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input error={this.state.passwordInvalid} id="password" name="password" type="password" onChange={this.handleChange}
                                   value={this.state.password}/>
                            {this.state.passwordInvalid?<FormHelperText error={true}>Please enter a valid password(at least 6 character or digit or mix)</FormHelperText>:""}
                        </FormControl>
                        {/*<FormControlLabel*/}
                        {/*    control={<CheckBox color="primary"/>}*/}
                        {/*    label="Remember Me?" className={classes.remember}/>*/}
                        <Button variant="contained" type="submit"
                                fullWidth color="primary" className={classes.submit}>
                            Sign Up
                        </Button>
                        <Typography variant="h6" align="center">Or</Typography>
                        <Button variant="contained" type="submit" component={Link} to="/login"
                                fullWidth color="secondary">
                            Login
                        </Button>
                    </form>
                </Paper>
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleAlertClose}
                          anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                    <Alert elevation={6} variant="filled" onClose={this.handleClose} severity={this.state.alertType}>
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>
            </main>
        );
    }
}

export default withAuthContext(withStyles(styles)(RegisterForm));