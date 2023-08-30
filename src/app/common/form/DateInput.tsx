import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { utcToLocal } from "../../utils/util";
import moment from "moment";

const DateInput = (props: Partial<ReactDatePickerProps>) => {
  const [field, meta, helpers] = useField(props.name!);

  const getDate = () => {
    const inputDate = field.value;
    if (inputDate) {
      const localDate = utcToLocal(inputDate, "");
      return new Date(localDate);
    }
    return null;
  };

  const handleChange = (date: any) => {
    if (!date) return;
    const formattedTime = moment.utc(date).format();
    helpers.setValue(formattedTime);
  };

  return (
    <Form.Field>
      <DatePicker {...props} selected={getDate()} onChange={(value) => handleChange(value)} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default DateInput;
