import { gql, useQuery } from "@apollo/client";
import { List, ListItem, Paper, Typography } from "@material-ui/core";

const CAMPAIGNS_QUERY = gql`
    query Campaign {
        campaigns {
            name
            from
            startDate
            endDate
        }
    }
`;

const CampaignsPage = () => {
    const { loading, error, data } = useQuery(CAMPAIGNS_QUERY);

    console.log(data)

    if(loading) return (
        <Paper>
            <Typography variant="h4">
                Loading
            </Typography>
        </Paper>
    )

    if(error) return (
        <Paper>
            <Typography variant="h4">
                Service Unavaliable
            </Typography>
        </Paper>
    )


    return (
        <Paper>
            <List>
                {data.campaigns.map((c:any, i:any) => (
                    <ListItem>
                        <div style={{ margin: '8px 0' }}>
                            <Typography variant="h5">
                                {c.name}
                            </Typography>
                            <div style={{ padding: 8 }}></div>
                            <Typography variant="body2">
                                From: {c.from}
                            </Typography>
                            <div style={{ display: 'flex' }}>
                                <Typography variant="body2">
                                    Start: {c.startDate}
                                </Typography>
                                <div style={{ padding: 8 }}></div>
                                <Typography variant="body2">
                                    End: {c.endDate}
                                </Typography>
                            </div>
                        </div>
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

export default CampaignsPage;