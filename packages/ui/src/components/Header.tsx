import { AppBar, Avatar, Button, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Popover, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle, ExitToApp, Menu } from '@material-ui/icons';
import { useState } from 'react';
import { useAuth } from '../Auth/AuthProvider';
import { useLocation, useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    appbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 999,
    },
    menuButton: {
        marginRight: 36
    }
});

const Header:React.FC<{onClick:any}> = ({ onClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const auth = useAuth();
    const navigate = useNavigate();
    const location:any = useLocation();

    const from = location.state?.from.pathname || '/';

    const handleClick = (e:any) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        auth.signout(() => {
            console.log('sign out');
            navigate('/login', { replace: true });
        });
    }

    const initials = () => auth.user !== null ? (
        auth.user.name.split(' ').map((i:any) => i[0]).join('')
    ) : (
        <AccountCircle />
    );

    const open = Boolean(anchorEl);
    const id = open ? 'logout-panel' : undefined;

    return (
        <AppBar
            position="fixed"
            className={classes.appbar}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onClick}
                    edge="start"
                    className={classes.menuButton}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" noWrap>
                    GQL-App
                </Typography>
            </Toolbar>
            <Toolbar>
                <Avatar onClick={handleClick}>{initials()}</Avatar>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >
                    <List>
                        <ListItem
                            button
                            onClick={handleLogout}
                        >
                            <ListItemText primary="Sign Out" />
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </Popover>
            </Toolbar>
        </AppBar>
    )
}

export default Header;