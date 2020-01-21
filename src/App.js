import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import InputField from "./components/InputField";
import { createYupSchema } from "./helpers/createYupSchema";
import MapInitialValues from "./helpers/mapInitialValues";
import { getFields } from "./services/GetFields";
import { postForm } from "./services/SubmitForm";

function App() {
  const [inputFields, setInputFields] = useState(null);
  const [status, setStatus] = useState(false);
  const [submited, setSubmited] = useState(false);
  let yupSchema, validationSchema;

  async function getInputFields() {
    const fields = await getFields();
    if (fields) {
      setInputFields(fields);
    }
  }

  const handleSubmit = async data => {
    setSubmited(true);
    try {
      const res = await postForm(data);
      setSubmited(false);
      setStatus(true);
    } catch (e) {
      setStatus(false);
    }
  };

  useEffect(() => {
    getInputFields();
  }, []);

  if (inputFields) {
    yupSchema = inputFields.reduce(createYupSchema, {});
    validationSchema = yup.object().shape(yupSchema);
  }

  return (
    <Container>
      <h1 className="mb-4">Dynamic Form</h1>
      {inputFields ? (
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={MapInitialValues(inputFields)}
        >
          {({ handleSubmit, handleChange, values, isValid, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {inputFields.map(field => (
                <InputField
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  name={field.name}
                  options={field.options}
                  value={values[field.name]}
                  error={errors[field.name]}
                  handleChange={handleChange}
                  defaultValue={field.default_value}
                  readOnly={field.readonly || submited}
                  info={field.info}
                />
              ))}

              <Button type="submit" disabled={submited}>
                Submit form
              </Button>
              {status ? (
                <Alert variant="success" className="mt-5">
                  Successfully Submited
                </Alert>
              ) : null}
            </Form>
          )}
        </Formik>
      ) : null}
    </Container>
  );
}
export default App;
