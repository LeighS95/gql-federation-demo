import { gql, useQuery } from "@apollo/client";
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles } from "@material-ui/core";

const CAMPAIGNS_QUERY = gql`
    query GetUserCampaigns {
        getUserCampaigns {
            id
            name
            from
            startDate
            endDate
        }
    }
`;

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const CampaignsPage = () => {
    const { loading, error, data } = useQuery(CAMPAIGNS_QUERY);

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
            <h1>Campaigns</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Campaign</TableCell>
                            <TableCell align="right">From</TableCell>
                            <TableCell align="right">Scheduled Date</TableCell>
                            <TableCell align="right">End Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.getUserCampaigns.map((c: any) => (
                            <TableRow key={c.id}>
                                <TableCell component="th" scope="row">
                                    {c.id}
                                </TableCell>
                                <TableCell align="right">{c.name}</TableCell>
                                <TableCell align="right">{c.from}</TableCell>
                                <TableCell align="right">{c.startDate.split('T')[0]}</TableCell>
                                <TableCell align="right">{c.endDate.split('T')[0]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default CampaignsPage;