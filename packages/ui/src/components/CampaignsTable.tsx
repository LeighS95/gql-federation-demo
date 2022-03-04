import { gql, useQuery } from "@apollo/client";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const CAMPAIGNS_QUERY = gql`
    query Campaigns {
        campaigns {
            name
            from
            startDate
            endDate
        }
    }
`;

const useStyles = makeStyles({
    root: {
        padding: 12
    },
    container: {
        maxHeight: 240,
        maxWidth: 640,
        overflow: 'scroll'
    },
    table: {
        maxWidth: 640,
        overflow: 'scroll'
    }
})

const CampaignsTable = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(CAMPAIGNS_QUERY);

    console.log(data)

    if(error) return (
        <Paper className={classes.root}>
            <Typography variant="h6">
                Service Unavaliable
            </Typography>
        </Paper>
    )

    return (
        <TableContainer
            className={classes.container}
            component={Paper}
        >
            <Table>
                <TableHead>
                    <TableCell>
                        Campaign Name
                    </TableCell>
                    <TableCell align="right">
                        From
                    </TableCell>
                    <TableCell align="right">
                        Start Date
                    </TableCell>
                    <TableCell align="right">
                        End Date
                    </TableCell>
                </TableHead>
                <TableBody>
                    {data !== null && data.campaigns.map((c:any, i:any) => (
                        <TableRow>
                            <TableCell>
                                {c.name}
                            </TableCell>
                            <TableCell>
                                {c.from}
                            </TableCell>
                            <TableCell>
                                {c.startDate}
                            </TableCell>
                            <TableCell>
                                {c.endDate}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CampaignsTable;