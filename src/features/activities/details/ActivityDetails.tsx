import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getActivity } from "../../../redux/slices/activitySlice";

export default function ActivityDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { selectedActivity: activity, initialLoading } = useAppSelector((state) => state.activity);

  useEffect(() => {
    if (id) dispatch(getActivity(id));
  }, [id]);

  if (initialLoading || !activity) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date.toString()}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button as={Link} to={`/manage/${activity.id}`} basic color="blue" content="Edit" />
          <Button as={Link} to="/activities" basic color="grey" content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
