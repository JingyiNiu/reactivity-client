import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { SyntheticEvent } from "react";

interface Props {
  activities: Activity[];
}

export default function ActivityList({ activities }: Props) {
  function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    console.log("DELETE", id);
}
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.address}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button as={Link} to={`/activities/${activity.id}`} floated="right" content="View" color="blue" />
                <Button onClick={(e) => handleDeleteActivity(e, activity.id)} floated="right" content="Delete" color="red"/>
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
