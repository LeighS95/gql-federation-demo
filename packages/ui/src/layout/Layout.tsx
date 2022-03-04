import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        height: '100%',
        width: '100%'
    },
    header: {
        flexGrow: 1
    },
    content: {
        margin: '56px 0 0 48px',
        flexGrow: 1,
        padding: 12
    }
});

const Layout:React.FC = ({ children }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const toggleDrawer = () => {
        setOpen(!open);
    }

    return (
        <div className={classes.root}>
            <Sidebar isOpen={open} />
            <Header onClick={toggleDrawer} />
            <main className={classes.content}>
                {children}
            </main>
        </div>
    )
}

export default Layout;