import { Grid } from "@material-ui/core";
import CampaignsTable from "../components/CampaignsTable";
import MessagesTable from "../components/MessagesTable";
import ProjectsTable from "../components/ProjectsTable";

const DashboardPage = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectsTable />
                </Grid>
                <Grid item xs={6}>
                    <CampaignsTable />
                </Grid>
                <Grid item xs={6}>
                    <MessagesTable />
                </Grid>
            </Grid>
        </div>
    )
}

export default DashboardPage;