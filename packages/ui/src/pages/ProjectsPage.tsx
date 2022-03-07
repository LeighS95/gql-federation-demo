import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles, IconButton, Collapse, Box } from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const PROJECTS_QUERY = gql`
    query GetUserProjects {
        getUserProjects {
            name
            id
            campaigns {
                name
                id
                from
                startDate
            }
        }
    }
`;


const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props: any) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    return (
        <>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Campaigns
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>From</TableCell>
                                        <TableCell>Scheduled</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.campaigns.map((campaign: any) => (
                                        <TableRow key={campaign.id}>
                                            <TableCell component="th" scope="row">
                                                {campaign.id}
                                            </TableCell>
                                            <TableCell>{campaign.name}</TableCell>
                                            <TableCell>{campaign.from}</TableCell>
                                            <TableCell>{campaign.startDate.split('T')[0]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const ProjectsPage = () => {
    const { loading, error, data } = useQuery(PROJECTS_QUERY);

    console.log(data)


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
            <h1>Projects</h1>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.getUserProjects.map((row: any) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default ProjectsPage;