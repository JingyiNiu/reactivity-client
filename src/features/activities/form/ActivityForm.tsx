import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addActivity, createActivity, editActivity, getActivity, updateActivity } from "../../../redux/slices/activitySlice";
import { Activity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

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
    date: new Date().toISOString(),
    city: "",
    address: "",
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (id) {
      dispatch(getActivity(id)).then((res) => setActivity(res.payload as Activity));
    }
  }, [id]);

  function handleSubmit() {
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

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange} />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange} />
        <Form.Input placeholder="Date" value={activity.date} name="date" onChange={handleInputChange} />
        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange} />
        <Form.Input placeholder="Address" value={activity.address} name="address" onChange={handleInputChange} />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button onClick={() => navigate(-1)} floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
}
