import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { listActivities } from "../../../redux/slices/activitySlice";

const ActivityDashboard = () => {
  const dispatch = useAppDispatch();

  const { activities, initialLoading } = useAppSelector((state) => state.activity);

  useEffect(() => {
    if (!activities.length) dispatch(listActivities());
  }, []);

  if (initialLoading) return <LoadingComponent content="Loading app..." />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
