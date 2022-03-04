import { gql, useQuery } from "@apollo/client";
import { Paper, Table, TableBody, TableContainer, TableHead, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const PROJECT_QUERY = gql`
    query Project($id: ID!) {
        project(id: $id) {
            name
        }
    }
`;

const useStyles = makeStyles({
    root: {
        padding: 12
    }
})

const ProjectsTable = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(PROJECT_QUERY, { variables: {id: '1'} });

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
                <>
                <Typography variant="h6">
                    Current Project
                </Typography>
                <Typography>
                    {data.project.name}
                </Typography>
                </>
            ) : (
                <Typography variant="subtitle1">
                    Loading
                </Typography>
            )}
        </Paper>
    )
}

export default ProjectsTable;