import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { getUser } from "../../redux/slices/userSlice";
import { setAppLoaded } from "../../redux/slices/commonSlice";
import LoadingComponent from "./LoadingComponent";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { token, appLoaded } = useAppSelector((state) => state.common);

  useEffect(() => {
    if (token) {
      dispatch(getUser()).then(() => {
        dispatch(setAppLoaded());
      });
    } else {
      dispatch(setAppLoaded());
    }
  }, []);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;
  return (
    <>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
