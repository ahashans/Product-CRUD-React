import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import {axiosInstance} from "../Config/axiosInstance";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {Helmet} from "react-helmet";
import styles from "../Styles/ProfileStyles";
import { withRouter } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={profile:{}, loading:false, error:false};

    }

    componentDidMount() {
        this.setState({loading:true});
        axiosInstance.get('auth/profile')
            .then((response)=>{
                this.setState({profile:response.data.user, loading:false});
            })
            .catch((error)=>{
                if(error?.response?.status===401){
                    this.props.history.push("/logout");
                }
                else{
                    this.setState({ loading: false, error: true });
                }
            })
    }

    render() {
        const {classes} = this.props;
        const header = <Helmet>
            <title>Profile Page -  Product CRUD</title>
        </Helmet>;
        if(this.state.error){
            return(
                <main>
                    {header}
                    <Alert severity="error" variant="filled">Server Error Occurred!</Alert>
                </main>
            );
        }
        return (
            <main className={classes.main}>
                {header}
                <Backdrop className={classes.backdrop} open={this.state.loading}>
                    <CircularProgress color="inherit" />
                    <Typography variant="h6">Please wait...</Typography>
                </Backdrop>
                <Paper className={classes.paper} elevation={2}>
                    {/*<Typography variant="h5">Profile</Typography>*/}
                    <Avatar className={classes.avatar}>
                        <PersonIcon/>
                    </Avatar>
                    <Typography variant="h6">{this.state.profile.name}</Typography>
                    <Typography variant="subtitle1">{this.state.profile.email}</Typography>

                </Paper>
            </main>
        );
    }
}

export default withRouter(withStyles(styles)(Profile));