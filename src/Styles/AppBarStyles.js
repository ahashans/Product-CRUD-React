const drawerWidth = 180;
const styles=theme=>({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    navLink: {
        textDecoration:"none",
        color:"inherit"
    },
    rightItem:{
        marginLeft: "auto",
        marginRight:10,
    },
    link: {
        textDecoration:"none",
        color:"#ADEFD1FF",
        '&:hover': {
            color: "#AAA",
        }
    },
    linkActive:{
        color: "#00203FFF",
    },
    profileButton:{
        color:"inherit",
        backgroundColor:"inherit",
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
});
export default styles;