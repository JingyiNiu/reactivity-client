import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { utcToLocal as formatDate } from "../../../app/utils/util";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity;
}

const ActivityDetailsHeader = ({ activity }: Props) => {
  const { loading } = useAppSelector((state) => state.activity);
  const { user } = useAppSelector((state) => state.user);

  const isHost = activity.host?.username === user?.username;
  const isGoing = activity.attendees!.some((a) => a.username === user?.username);

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size="huge" content={activity.title} style={{ color: "white" }} />
                <p>{formatDate(activity.date)}</p>
                <p>
                  Hosted by{" "}
                  <strong>
                    <Link to={`/profiles/${activity.host?.username}`}>{activity.host?.displayName}</Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {isHost ? (
          <>
            <Button
              color={activity.isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={activity.isCancelled ? "Re-activate activity" : "Cancel Activity"}
              loading={loading}
            />
            <Button
              as={Link}
              to={`/manage/${activity.id}`}
              color="orange"
              floated="right"
              disabled={activity.isCancelled}
            >
              Manage Event
            </Button>
          </>
        ) : isGoing ? (
          <Button loading={loading}>Cancel attendance</Button>
        ) : (
          <Button disabled={activity.isCancelled} loading={loading} color="teal">
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default ActivityDetailsHeader;
