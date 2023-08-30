import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Grid, Header, Label } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/slices/userSlice";
import { router } from "../../app/router/Routes";

const Login = () => {
  const dispatch = useAppDispatch();
  const { errorMessage, loading } = useAppSelector((state) => state.user);

  const validationSchema = Yup.object({
    email: Yup.string().required("The email field is required"),
    password: Yup.string().required("The password field is required"),
  });

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={8}>
            <Formik
              initialValues={{ email: "", password: "", error: null }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                dispatch(login(values)).then(() => router.navigate("/activities"));
              }}
            >
              {({ handleSubmit, isValid, dirty }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                  <Header as="h2" content="Login to Reactivities" color="teal" textAlign="center" />
                  <TextInput placeholder="Email" name="email" />
                  <TextInput placeholder="Password" name="password" type="password" />
                  {errorMessage && <Label style={{ marginBottom: 10 }} basic color="red" content={errorMessage} />}
                  <Button
                    disabled={loading || !dirty || !isValid}
                    loading={loading}
                    positive
                    content="Login"
                    type="submit"
                    fluid
                  />
                </Form>
              )}
            </Formik>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Login;
