import { Link, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import { Button, Card, Image } from "semantic-ui-react";
import { useEffect, useState } from "react";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function ActivityDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    if (id) {
      agent.Activities.details(id).then((response) => {
        setActivity(response);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !activity) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content="Edit" />
          <Button as={Link} to='/activities' basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
