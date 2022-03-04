import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { EmojiFlags, Folder, Home, Message } from "@material-ui/icons";
import clsx from "clsx";
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles({
    drawer: {
        position: "fixed",
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: 'width 0.5s ease'
    },
    drawerClose: {
        transition: 'width 0.5s ease',
        overflowX: 'hidden',
        width: 48
    },
    spacer: {
        height: 56
    }
});

const Sidebar:React.FC<{isOpen:boolean}> = ({ isOpen }) => {
    const classes = useStyles();

    const selectIcon = (text:string) => {
        switch(text) {
            case 'projects':
                return <Folder />;
            case 'campaigns':
                return <EmojiFlags />;
            default:
                return <Message />;
        }
    }

    return (
        <Drawer
            variant="permanent"
            className={clsx(
                classes.drawer,
                {
                    [classes.drawerOpen]: isOpen,
                    [classes.drawerClose]: !isOpen
                }
            )}
            classes={{
                paper: clsx(
                    classes.drawer, {
                    [classes.drawerOpen]: isOpen,
                    [classes.drawerClose]: !isOpen
                })
            }}
        >
            <div className={classes.spacer}></div>
            <List>
                <Link to='/'>
                    <ListItem button key="dashboard">
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary='dashboard' />
                    </ListItem>
                </Link>
                {['projects', 'campaigns', 'messages'].map((text) => (
                    <Link to={`/${text}`}>
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {selectIcon(text)}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar;