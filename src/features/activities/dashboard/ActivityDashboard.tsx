import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useAppSelector } from "../../../redux/hooks";
import ActivityFilter from "./ActivityFilter";

const ActivityDashboard = () => {
  const { initialLoading } = useAppSelector((state) => state.activity);

  if (initialLoading) return <LoadingComponent content="Loading app..." />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityFilter />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
