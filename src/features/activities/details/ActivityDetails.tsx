import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getActivity } from "../../../redux/slices/activitySlice";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export default function ActivityDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedActivity: activity, initialLoading, errorMessage } = useAppSelector((state) => state.activity);

  useEffect(() => {
    if (id) dispatch(getActivity(id));
  }, [id]);

  if (errorMessage) return <>{errorMessage}</>;
  if (initialLoading || !activity) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityDetailsSidebar activity={activity} />
      </Grid.Column>
    </Grid>
  );
}
