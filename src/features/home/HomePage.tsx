import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { useAppSelector } from "../../redux/hooks";

export default function HomePage() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
          Reactivities
        </Header>
        {user ? (
          <Button as={Link} to="/activities" size="huge" inverted>
            Go to Activities
          </Button>
        ) : (
          <Button as={Link} to="/login" size="huge" inverted>
            Login
          </Button>
        )}
        {/* <Button as={Link} to="/register" size="huge" inverted>
          Register
        </Button> */}
      </Container>
    </Segment>
  );
}
