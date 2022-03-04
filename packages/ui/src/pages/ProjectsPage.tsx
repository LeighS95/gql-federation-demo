import { gql, useQuery } from "@apollo/client";
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

const PROJECT_QUERY = gql`
    query Projects {
        projects {
            name
            campaigns {
                name
                from
                startDate
                endDate
            }
        }
    }
`;

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset'
        }
    }
});

const useStyles = makeStyles({
    root: {
        padding: 12
    }
})

const Row:React.FC<any> = ({
    project
}) => {
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {project.name}
                </TableCell>
                <TableCell>
                    {project.campaigns.length > 0 ? project.campaigns.length : 0}
                </TableCell>
            </TableRow>
            {project.campaigns != null && project.campaigns.length > 0 && (
            <TableRow>
                <TableCell>
                    <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                    >
                        <Box margin={1}>
                            <Table size="small">
                                <TableHead>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        From
                                    </TableCell>
                                    <TableCell>
                                        Start
                                    </TableCell>
                                    <TableCell>
                                        End
                                    </TableCell>
                                </TableHead>
                                <TableBody>
                                    {project.campaigns.map((c:any, i:any) => (
                                        <TableRow key={`campaign${i}`}>
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
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            )}
        </>
    )
}

const ProjectsPage = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(PROJECT_QUERY);

    console.log(data)

    if(error) return (
        <Paper className={classes.root}>
            <Typography variant="h6">
                Service Unavaliable
            </Typography>
        </Paper>
    )

    return (
        <Paper className={classes.root}>
            {!loading ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableCell />
                            <TableCell>
                                Project Name
                            </TableCell>
                            <TableCell>
                                No. Of Campaigns
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {data.projects.map((p:any, i:any) => (
                                <Row project={p} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="subtitle1">
                    Loading
                </Typography>
            )}
        </Paper>
    )
}

export default ProjectsPage;