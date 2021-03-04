import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow:1
    },
    grid: {
        marginTop: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    },
    table:{
        marginTop:theme.spacing(3),
    },
    image:{
        maxHeight:"250px",
        maxWidth:"250px",
    }
}));
export default useStyles;