import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    main: {
        width: "auto",
        display: "block",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
            width: "400px",
            marginLeft: "auto",
            marginRight: "auto"

        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(2)}px `,
    },
    form:{
        width:"100%",
        marginTop:theme.spacing(3)
    },
    submit:{
        marginTop:theme.spacing(3),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    hiddenInput: {
        display: 'none',
    },
    image:{
        marginTop:theme.spacing(2),
        maxHeight:"250px",
        maxWidth:"250px",
    }
}));
export default useStyles;