import { Fragment, useEffect } from "react";
import { Header } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityListItem from "./ActivityListItem";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { listActivities } from "../../../redux/slices/activitySlice";

function ActivityList() {
  const { groupedActivities, activities } = useAppSelector((state) => state.activity);

  console.log(activities);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!activities.length) dispatch(listActivities());
  }, []);

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {activities &&
            activities.map((activity: Activity) => <ActivityListItem key={activity.id} activity={activity} />)}
        </Fragment>
      ))}
    </>
  );
}

export default ActivityList;
