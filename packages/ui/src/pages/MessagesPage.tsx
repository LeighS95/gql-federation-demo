import { gql, useQuery } from "@apollo/client";
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles } from "@material-ui/core";

const MESSAGES_QUERY = gql`
    query GetRecievedMessages {
        getRecievedMessages {
            id
            reciever
            sender
            content
        }
    }
`;

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const MessagesPage = () => {
    const { loading, error, data } = useQuery(MESSAGES_QUERY);

    console.log(data)

    const classes = useStyles();

    if (loading) return (
        <Paper>
            <Typography variant="h4">
                Loading
            </Typography>
        </Paper>
    )

    if (error) return (
        <Paper>
            <Typography variant="h4">
                Service Unavaliable
            </Typography>
        </Paper>
    )


    return (
        <>
            <h1>Messages</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">From</TableCell>
                            <TableCell align="right">Content</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.getRecievedMessages.map((c: any) => (
                            <TableRow key={c.id}>
                                <TableCell component="th" scope="row">
                                    {c.id}
                                </TableCell>
                                <TableCell align="right">{c.sender}</TableCell>
                                <TableCell align="right">{c.content}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default MessagesPage;