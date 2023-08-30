import { Link } from "react-router-dom";
import { Item, Button, Icon, Segment, Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { utcToLocal as formatDate } from "../../../app/utils/util";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <Icon name="clock" /> {formatDate(activity.date)}
            </Grid.Column>
            <Grid.Column width={4}>
              <Icon name="marker" /> {activity.address}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content="View" />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
