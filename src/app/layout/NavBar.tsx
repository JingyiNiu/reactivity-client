import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Menu, Image } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/slices/userSlice";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    console.log("handleLogout");
    dispatch(logout());
  };

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to="/activities" name="Activities" />
        <Menu.Item>
          <Button as={NavLink} to="/createActivity" positive content="Create Activity" />
        </Menu.Item>
        <Menu.Item position="right">
          <Image avatar spaced="right" src={user?.image || "/assets/user.png"} />
          <Dropdown pointing="top left" text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text="My Profile" icon="user" />
              <Dropdown.Item onClick={handleLogout} text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
}
