import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addActivity,
  createActivity,
  editActivity,
  getActivity,
  updateActivity,
} from "../../../redux/slices/activitySlice";
import { Activity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../../app/common/form/TextInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import TextArea from "../../../app/common/form/TextArea";

export default function ActivityForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.activity);

  const initialState = {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    address: "",
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (id) {
      dispatch(getActivity(id)).then((res) => setActivity(res.payload as Activity));
    }
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string().required("The event title is required"),
    category: Yup.string().required("The event category is required"),
    description: Yup.string().required(),
    date: Yup.string().required("Date is required").nullable(),
    address: Yup.string().required(),
    city: Yup.string().required(),
  });

  function handleSubmit(activity: Activity) {
    console.log("submit", activity);
    if (!activity.id) {
      activity.id = uuid();
      dispatch(createActivity(activity))
        .then(() => dispatch(addActivity(activity)))
        .then(() => navigate(`/activities/${activity.id}`));
    } else {
      dispatch(updateActivity(activity))
        .then(() => dispatch(editActivity(activity)))
        .then(() => navigate(`/activities/${activity.id}`));
    }
  }

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={activity}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <>
              <Header content="Activity Details" sub color="teal" />
              <TextInput name="title" placeholder="Title" />
              <TextArea rows={3} name='description' placeholder='Description' />
              <SelectInput options={categoryOptions} name="category" placeholder="Category" />
              <DateInput
                name="date"
                placeholderText="Date"
                showTimeSelect
                timeCaption="Time"
                dateFormat="MMMM d, yyyy, h:mm aa"
              />
            </>
            <>
              <Header content="Location Details" sub color="teal" />
              <TextInput name="address" placeholder="Address" />
              <TextInput name="city" placeholder="city" />
            </>
            <>
              <Button loading={loading} floated="right" positive type="submit" content="Submit" />
              <Button onClick={() => navigate(-1)} floated="right" type="button" content="Cancel" />
            </>
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
