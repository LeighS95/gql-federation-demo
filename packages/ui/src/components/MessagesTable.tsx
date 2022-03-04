import { gql, useQuery } from '@apollo/client';
import { Paper, Table, TableCell, TableContainer, TableHead, TableBody, TableRow, makeStyles } from "@material-ui/core";
import jwt from 'jwt-decode';

const MESSAGES_QUERY = gql`
    query Messages {
        messages {
            id
            sender
            reciever
            content
        }
    }
`;

const USER_MESSAGE_QUERY = gql`
    query Query {
        getSentMessages {
            id
            sender
            reciever
            content
        }
    }
`;

const useStyles = makeStyles({
    root: {},
    table: {
        maxWidth: 640,
    },
    loader: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cell: {
        overflow: 'hidden'
    }
})

const MessagesTable = () => {
    const classes = useStyles();
    const token = window.localStorage.getItem('token');
    const user:any = token ? jwt(token) : { user: { roles: 'user' }};

    console.log(user)

    const { loading, error, data } = useQuery(user.roles[0] === 'admin' ? MESSAGES_QUERY : USER_MESSAGE_QUERY);

    console.log(data)

    if(error) return (
        <Paper>
            Cannot get Messages
        </Paper>
    );

    const Messages = () => {
        const role = user.roles[0];

        if(role !== 'admin') {
            return (
                data.getSentMessages.map((row:any) => (
                    <TableRow key={row.id}>
                        <TableCell className={classes.cell}>
                            {row.sender}
                        </TableCell>
                        <TableCell className={classes.cell}>
                            {row.reciever}
                        </TableCell>
                        <TableCell className={classes.cell}>
                            {row.content}
                        </TableCell>
                    </TableRow>
                ))
            )
        }

        return (
            data.messages.map((row:any) => (
                <TableRow key={row.id}>
                    <TableCell className={classes.cell}>
                        {row.sender}
                    </TableCell>
                    <TableCell className={classes.cell}>
                        {row.reciever}
                    </TableCell>
                    <TableCell className={classes.cell}>
                        {row.content}
                    </TableCell>
                </TableRow>
            ))
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Message</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <div className={classes.loader}>
                            LOADING
                        </div>
                    ) : (
                        // data !== null && data.messages.map((row:any) => (
                        //     <TableRow key={row.id}>
                        //         <TableCell className={classes.cell}>
                        //             {row.sender}
                        //         </TableCell>
                        //         <TableCell className={classes.cell}>
                        //             {row.reciever}
                        //         </TableCell>
                        //         <TableCell className={classes.cell}>
                        //             {row.content}
                        //         </TableCell>
                        //     </TableRow>)
                        // )
                        <Messages />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MessagesTable;