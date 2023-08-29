import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { deleteActivity, removeActivity } from "../../../redux/slices/activitySlice";

interface Props {
  activities: Activity[];
}

function ActivityList({ activities }: Props) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.activity);

  const [target, setTarget] = useState("");

  function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    dispatch(deleteActivity(id)).then(()=>{
      dispatch(removeActivity(id))
    });
  }
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date.toString()}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.address}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue" />
                <Button
                  loading={loading && target === activity.id}
                  name={activity.id}
                  onClick={(e) => handleDeleteActivity(e, activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}

export default ActivityList;
